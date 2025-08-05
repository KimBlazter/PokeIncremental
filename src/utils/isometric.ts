import { Block, IsometricConfig } from "@/types/isometric";
import { getTextureCanvas, Texture } from "@/utils/spriteLoader";

const DEFAULT_CONFIG: IsometricConfig = {
    tileWidth: 56,
    tileHeight: 28,
    blockHeight: 35,
    scale: 1,
};

export const createIsometricConfig = (
    config?: Partial<IsometricConfig>
): IsometricConfig => {
    return { ...DEFAULT_CONFIG, ...config };
};

export const toIsometric = (
    x: number,
    y: number,
    z: number = 0,
    config: IsometricConfig
) => {
    const isoX = (x - y) * (config.tileWidth / 2);
    const isoY = (x + y) * (config.tileHeight / 2) - z * config.blockHeight;
    return { x: isoX, y: isoY };
};

export const fromIsometric = (
    screenX: number,
    screenY: number,
    offsetX: number,
    offsetY: number,
    z: number = 0,
    config: IsometricConfig
) => {
    const adjustedX = screenX - offsetX;
    const adjustedY = screenY - offsetY + z * config.blockHeight;

    const gridX =
        (adjustedX / (config.tileWidth / 2) +
            adjustedY / (config.tileHeight / 2)) /
        2;
    const gridY =
        (adjustedY / (config.tileHeight / 2) -
            adjustedX / (config.tileWidth / 2)) /
        2;

    return { x: Math.floor(gridX), y: Math.floor(gridY) };
};

export const sortBlocksByDepth = (blocks: Block[]): Block[] => {
    return blocks.sort((a, b) => {
        const depthA = a.x + a.y + (a.z || 0);
        const depthB = b.x + b.y + (b.z || 0);
        return depthA - depthB;
    });
};

export const drawBlock = async (
    ctx: CanvasRenderingContext2D,
    block: Block,
    offsetX: number,
    offsetY: number,
    config: IsometricConfig
) => {
    const iso = toIsometric(block.x, block.y, block.z, config);
    const x = iso.x + offsetX;
    const y = iso.y + offsetY;

    if (block.texture) {
        try {
            const { canvas } = await getTextureCanvas(block.texture as Texture);
            ctx.drawImage(
                canvas,
                x - canvas.width / 2,
                y - canvas.height / 2,
                canvas.width * config.scale,
                canvas.height * config.scale
            );
        } catch (error) {
            // Fallback si la texture n'est pas trouvée
            drawDefaultBlock(ctx, x, y);
        }
    } else {
        drawDefaultBlock(ctx, x, y);
    }
};

const drawDefaultBlock = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
) => {
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x - 16, y - 16, 32, 32);
};

export const drawBlockHighlight = (
    ctx: CanvasRenderingContext2D,
    hoveredBlock: { x: number; y: number; z: number },
    offsetX: number,
    offsetY: number,
    config: IsometricConfig,
    color: string = "#FFD700"
) => {
    const blockZ = hoveredBlock.z - 0.1;

    const bottom1 = toIsometric(hoveredBlock.x, hoveredBlock.y, blockZ, config);
    const bottom2 = toIsometric(
        hoveredBlock.x + 1,
        hoveredBlock.y,
        blockZ,
        config
    );
    const bottom3 = toIsometric(
        hoveredBlock.x + 1,
        hoveredBlock.y + 1,
        blockZ,
        config
    );
    const bottom4 = toIsometric(
        hoveredBlock.x,
        hoveredBlock.y + 1,
        blockZ,
        config
    );

    const top1 = toIsometric(
        hoveredBlock.x,
        hoveredBlock.y,
        blockZ + 1,
        config
    );
    const top2 = toIsometric(
        hoveredBlock.x + 1,
        hoveredBlock.y,
        blockZ + 1,
        config
    );
    const top3 = toIsometric(
        hoveredBlock.x + 1,
        hoveredBlock.y + 1,
        blockZ + 1,
        config
    );
    const top4 = toIsometric(
        hoveredBlock.x,
        hoveredBlock.y + 1,
        blockZ + 1,
        config
    );

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Bottom face
    ctx.beginPath();
    ctx.moveTo(bottom1.x + offsetX, bottom1.y + offsetY);
    ctx.lineTo(bottom2.x + offsetX, bottom2.y + offsetY);
    ctx.lineTo(bottom3.x + offsetX, bottom3.y + offsetY);
    ctx.lineTo(bottom4.x + offsetX, bottom4.y + offsetY);
    ctx.closePath();
    ctx.stroke();

    // Top face
    ctx.beginPath();
    ctx.moveTo(top1.x + offsetX, top1.y + offsetY);
    ctx.lineTo(top2.x + offsetX, top2.y + offsetY);
    ctx.lineTo(top3.x + offsetX, top3.y + offsetY);
    ctx.lineTo(top4.x + offsetX, top4.y + offsetY);
    ctx.closePath();
    ctx.stroke();

    // Vertical edges
    [
        [bottom1, top1],
        [bottom2, top2],
        [bottom3, top3],
        [bottom4, top4],
    ].forEach(([bottom, top]) => {
        ctx.beginPath();
        ctx.moveTo(bottom.x + offsetX, bottom.y + offsetY);
        ctx.lineTo(top.x + offsetX, top.y + offsetY);
        ctx.stroke();
    });

    // Top face fill
    const [r, g, b] = hexToRgb(color) || [255, 215, 0];
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
    ctx.beginPath();
    ctx.moveTo(top1.x + offsetX, top1.y + offsetY);
    ctx.lineTo(top2.x + offsetX, top2.y + offsetY);
    ctx.lineTo(top3.x + offsetX, top3.y + offsetY);
    ctx.lineTo(top4.x + offsetX, top4.y + offsetY);
    ctx.closePath();
    ctx.fill();
};

const hexToRgb = (hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
            [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
            ]
        :   null;
};
