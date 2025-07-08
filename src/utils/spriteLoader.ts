import { hexToRGB, isGrayscale } from "./color";

import SpriteMap from "/textures/combined_spritemap.png";
import SpriteMapData from "@/assets/data/combined_spritemap.json";

export type TextureId = keyof (typeof SpriteMapData)["sprites"];

export type Texture =
    | TextureId
    | {
          base: Texture; // Base texture
          overlay?: Texture; // overlay texture
          tint?: string; // hex color
          opacity?: number; // opacity between 0 and 1
      };

let spriteSheetImage: HTMLImageElement | null = null;

/**
 * Loads the sprite sheet image asynchronously. If the image is already loaded,
 * it returns the cached image. Otherwise, it creates a new `HTMLImageElement`,
 * sets its source to the sprite map, and resolves the promise once the image is loaded.
 *
 * @returns {Promise<HTMLImageElement>} A promise that resolves to the loaded sprite sheet image.
 */
async function loadSpriteSheet(): Promise<HTMLImageElement> {
    if (spriteSheetImage) return spriteSheetImage;

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = SpriteMap;
        img.onload = () => {
            spriteSheetImage = img;
            resolve(img);
        };
        img.onerror = reject;
    });
}

/**
 * Retrieves a specific sprite from the sprite sheet and draws it onto a new canvas element.
 *
 * @param {TextureId} texture - The identifier of the sprite to retrieve, corresponding to a key in the sprite map JSON.
 * @returns {Promise<HTMLCanvasElement>} A promise that resolves to a canvas element containing the requested sprite.
 * @throws {Error} If the sprite name is not found in the JSON or if the 2D context of the canvas cannot be obtained.
 */
export async function getTextureCanvas(
    texture: Texture
): Promise<HTMLCanvasElement> {
    const image = await loadSpriteSheet();

    // Texture simple (string)
    if (typeof texture === "string") {
        const sprite = SpriteMapData.sprites[texture];
        if (!sprite) throw new Error(`Sprite "${texture}" not found`);

        const canvas = document.createElement("canvas");
        canvas.width = sprite.width;
        canvas.height = sprite.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Unable to get 2D context of the canvas");

        ctx.drawImage(
            image,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            0,
            0,
            sprite.width,
            sprite.height
        );

        return canvas;
    }

    // Composite texture (object)
    const baseCanvas = await getTextureCanvas(texture.base);
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
            if (!isGrayscale(r, g, b)) continue; // pas un pixel gris

            const brightness = r / 255; // ou moyenne RGB pour une meilleure précision

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
        const overlayCanvas = await getTextureCanvas(texture.overlay);
        ctx.drawImage(overlayCanvas, 0, 0);
    }

    return canvas;
}

/**
 * Retrieves a specific sprite from the sprite sheet and returns its data URL representation.
 *
 * @param {TextureId} texture - The identifier of the sprite to retrieve, corresponding to a key in the sprite map JSON.
 * @returns {Promise<string>} A promise that resolves to a base64-encoded data URL of the requested sprite.
 * @throws {Error} If the sprite name is not found in the JSON or if the 2D context of the canvas cannot be obtained.
 */
export default async function getTexture(texture: Texture): Promise<string> {
    const canvas = await getTextureCanvas(texture);
    return canvas.toDataURL();
}
