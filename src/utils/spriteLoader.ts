import { hexToRGB, isGrayscale } from "./color";

import BlocksAndItemsSpritemap from "/textures/combined_spritemap.png";
import BlocksAndItemsSpritemapData from "@/assets/data/combined_spritemap.json";

import MobSpritemap from "/textures/mobs_spritemap.png";
import MobSpritemapData from "@/assets/data/mobs_spritemap.json";

type Sprite = {
    x: number;
    y: number;
    width: number;
    height: number;
};

interface SpritemapConfig {
    image: string; // Path to the sprite sheet image
    data: {
        width: number;
        height: number;
        tileSize: number; // Size of each tile in pixels
        rows: number;
        cols: number;
        sprites: {
            [key: string]: Sprite;
        };
    };
}

const SPRITEMAPS = {
    blocks_and_items: {
        image: BlocksAndItemsSpritemap,
        data: BlocksAndItemsSpritemapData,
    },
    mobs: {
        image: MobSpritemap,
        data: MobSpritemapData,
    },
} as const satisfies Record<string, SpritemapConfig>;

type SpritemapName = keyof typeof SPRITEMAPS;

export type TextureId = {
    [K in SpritemapName]: keyof (typeof SPRITEMAPS)[K]["data"]["sprites"];
}[SpritemapName];

export type QualifiedTextureId = {
    spritemap: SpritemapName;
    texture: TextureId;
};

export type Texture =
    | TextureId
    | QualifiedTextureId
    | {
          base: Texture; // Base texture
          overlay?: Texture; // overlay texture
          tint?: string; // hex color
          opacity?: number; // opacity between 0 and 1
      };

// Cache for loaded sprite sheet images
// This helps avoid reloading the same image multiple times, improving performance.
const spriteSheetImages = new Map<SpritemapName, HTMLImageElement>();

/**
 * Loads the sprite sheet image asynchronously. If the image is already loaded,
 * it returns the cached image. Otherwise, it creates a new `HTMLImageElement`,
 * sets its source to the sprite map, and resolves the promise once the image is loaded.
 *
 * @param {SpritemapName} spritemapName - The name of the sprite map to load.
 * @returns {Promise<HTMLImageElement>} A promise that resolves to the loaded sprite sheet image.
 */
async function loadSpriteSheet(
    spritemapName: SpritemapName
): Promise<HTMLImageElement> {
    const cached = spriteSheetImages.get(spritemapName);
    if (cached) return cached;

    const config = SPRITEMAPS[spritemapName];

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = config.image;
        img.onload = () => {
            spriteSheetImages.set(spritemapName, img);
            resolve(img);
        };
        img.onerror = () =>
            reject(new Error(`Failed to load spritemap: ${spritemapName}`));
    });
}

/**
 * Finds the sprite data associated with a given texture ID.
 *
 * This function iterates through the entries of the `SPRITEMAPS` object to locate
 * the sprite data corresponding to the provided texture ID. If found, it returns
 * the name of the spritemap and the sprite's dimensions and position. If no match
 * is found, it returns `null`.
 *
 * @param texture - The ID of the texture to search for in the spritemaps.
 * @returns An object containing the spritemap name and sprite data
 *          (position and dimensions) if the texture is found, or `null` if not.
 */
function findSpriteData(texture: TextureId): {
    spritemapName: SpritemapName;
    sprite: { x: number; y: number; width: number; height: number };
} | null {
    for (const [spritemapName, config] of Object.entries(SPRITEMAPS) as [
        SpritemapName,
        SpritemapConfig,
    ][]) {
        const sprite = config.data.sprites[texture];
        if (sprite) {
            return { spritemapName, sprite };
        }
    }
    return null;
}

async function resolveTexture(texture: Texture): Promise<{
    spritemapName: SpritemapName;
    sprite: Sprite;
    image: HTMLImageElement;
}> {
    // Case 1: Qualified texture
    if (
        typeof texture === "object" &&
        "spritemap" in texture &&
        "texture" in texture
    ) {
        const config = SPRITEMAPS[texture.spritemap];
        const sprite =
            config.data.sprites[
                texture.texture as keyof typeof config.data.sprites
            ];

        if (!sprite) {
            throw new Error(
                `Sprite "${texture.texture}" not found in spritemap "${texture.spritemap}"`
            );
        }

        const image = await loadSpriteSheet(texture.spritemap);
        return { spritemapName: texture.spritemap, sprite, image };
    }

    // Case 2: Simple texture (string) - search in all spritemaps
    if (typeof texture === "string") {
        const spriteData = findSpriteData(texture);
        if (!spriteData) {
            throw new Error(`Sprite "${texture}" not found in any spritemap`);
        }

        const image = await loadSpriteSheet(spriteData.spritemapName);
        return { ...spriteData, image };
    }

    // Case 3: Composite texture (object) - resolve base texture
    return resolveTexture(texture.base);
}

/**
 * Retrieves a specific sprite from the sprite sheet and draws it onto a new canvas element.
 *
 * @param {Texture} texture - The texture to retrieve, which can be a string (texture ID), a qualified texture object, or a composite texture object.
 * @returns {Promise<HTMLCanvasElement>} A promise that resolves to a canvas element containing the requested sprite.
 * @throws {Error} If the sprite name is not found in the JSON or if the 2D context of the canvas cannot be obtained.
 */
export async function getTextureCanvas(
    texture: Texture
): Promise<{ canvas: HTMLCanvasElement }> {
    // Simple texture or qualified
    if (
        typeof texture === "string" ||
        (typeof texture === "object" && "spritemap" in texture)
    ) {
        const { sprite, image } = await resolveTexture(texture);
        if (!sprite) throw new Error(`Sprite "${texture}" not found`);

        const canvas = document.createElement("canvas");
        canvas.width = sprite.width;
        canvas.height = sprite.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Unable to get 2D context of the canvas");

        ctx.imageSmoothingEnabled = false; // Disable antialiasing for pixel-perfect rendering

        const scale = 1;
        const drawWidth = sprite.width * scale;
        const drawHeight = sprite.height * scale;
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(
            image,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            offsetX,
            offsetY,
            drawWidth,
            drawHeight
        );

        return { canvas };
    }

    // Composite texture (object)
    const { canvas: baseCanvas } = await getTextureCanvas(texture.base);
    const canvas = document.createElement("canvas");
    canvas.width = baseCanvas.width;
    canvas.height = baseCanvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to get 2D context of composite canvas");

    // 1. Draw the base texture
    ctx.drawImage(baseCanvas, 0, 0);

    // 2. Apply tint to non-transparent pixels
    if (texture.tint) {
        const [tr, tg, tb] = hexToRGB(texture.tint);
        const opacity = texture.opacity ?? 1;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a === 0) continue; // transparent
            if (!isGrayscale(r, g, b)) continue; // not greyscale

            const brightness = r / 255; // or average RGB for better accuracy

            data[i + 0] = Math.round(
                tr * brightness * opacity + r * (1 - opacity)
            );
            data[i + 1] = Math.round(
                tg * brightness * opacity + g * (1 - opacity)
            );
            data[i + 2] = Math.round(
                tb * brightness * opacity + b * (1 - opacity)
            );
        }

        ctx.putImageData(imageData, 0, 0);
    }

    // 3. Draw overlay if it exists
    if (texture.overlay) {
        const { canvas: overlayCanvas } = await getTextureCanvas(
            texture.overlay
        );
        ctx.drawImage(overlayCanvas, 0, 0);
    }

    return { canvas };
}

/**
 * Retrieves a specific sprite from the sprite sheet and returns its data URL representation.
 *
 * @param {TextureId} texture - The identifier of the sprite to retrieve, corresponding to a key in the sprite map JSON.
 * @returns {Promise<string>} A promise that resolves to a base64-encoded data URL of the requested sprite.
 * @throws {Error} If the sprite name is not found in the JSON or if the 2D context of the canvas cannot be obtained.
 */
export default async function getTexture(
    texture: Texture
): Promise<{ texture: string; width: number; height: number }> {
    const { canvas } = await getTextureCanvas(texture);
    return {
        texture: canvas.toDataURL(),
        width: canvas.width,
        height: canvas.height,
    };
}
