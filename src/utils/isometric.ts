import { ISO_CONFIG } from "@/components/isometric/IsometricRenderer";
import { Block, BlockType, Grid } from "@/types/isometric";

export const configureNoAntialias = (ctx: CanvasRenderingContext2D) => {
    ctx.imageSmoothingEnabled = false;
    // @ts-ignore - Propriétés spécifiques aux navigateurs
    ctx.webkitImageSmoothingEnabled = false;
    // @ts-ignore
    ctx.mozImageSmoothingEnabled = false;
    // @ts-ignore
    ctx.msImageSmoothingEnabled = false;
    // @ts-ignore
    ctx.oImageSmoothingEnabled = false;
};

export const getBlocksAt = (grid: Grid, x: number, y: number): Block[] => {
    return grid.blocks.filter((block) => block.x === x && block.y === y);
};

export const toIsometric = (x: number, y: number, z: number = 0) => {
    const isoX = (x - y) * (ISO_CONFIG.tileWidth / 2);
    const isoY =
        (x + y) * (ISO_CONFIG.tileHeight / 2) - z * ISO_CONFIG.blockHeight;
    return { x: isoX, y: isoY };
};

export const fromIsometric = (
    screenX: number,
    screenY: number,
    offsetX: number,
    offsetY: number,
    z: number = 0
) => {
    const adjustedX = screenX - offsetX;
    const adjustedY = screenY - offsetY + z * ISO_CONFIG.blockHeight;

    const gridX =
        (adjustedX / (ISO_CONFIG.tileWidth / 2) +
            adjustedY / (ISO_CONFIG.tileHeight / 2)) /
        2;
    const gridY =
        (adjustedY / (ISO_CONFIG.tileHeight / 2) -
            adjustedX / (ISO_CONFIG.tileWidth / 2)) /
        2;

    return { x: Math.floor(gridX), y: Math.floor(gridY) };
};

export const drawBlockHighlight = (
    ctx: CanvasRenderingContext2D,
    hoveredBlock: { x: number; y: number; z: number },
    offsetX: number,
    offsetY: number
) => {
    // Surface du dessus du bloc (z + 1 pour être au-dessus)
    const topZ = hoveredBlock.z + 1;

    const top1 = toIsometric(hoveredBlock.x, hoveredBlock.y, topZ);
    const top2 = toIsometric(hoveredBlock.x + 1, hoveredBlock.y, topZ);
    const top3 = toIsometric(hoveredBlock.x + 1, hoveredBlock.y + 1, topZ);
    const top4 = toIsometric(hoveredBlock.x, hoveredBlock.y + 1, topZ);

    // Contour de la surface du dessus
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(top1.x + offsetX, top1.y + offsetY);
    ctx.lineTo(top2.x + offsetX, top2.y + offsetY);
    ctx.lineTo(top3.x + offsetX, top3.y + offsetY);
    ctx.lineTo(top4.x + offsetX, top4.y + offsetY);
    ctx.closePath();
    ctx.stroke();

    // Remplissage de la surface du dessus
    ctx.fillStyle = "rgba(255, 215, 0, 0.2)";
    ctx.beginPath();
    ctx.moveTo(top1.x + offsetX, top1.y + offsetY);
    ctx.lineTo(top2.x + offsetX, top2.y + offsetY);
    ctx.lineTo(top3.x + offsetX, top3.y + offsetY);
    ctx.lineTo(top4.x + offsetX, top4.y + offsetY);
    ctx.closePath();
    ctx.fill();
};

export const sortBlocksByDepth = (blocks: Block[]): Block[] => {
    return blocks.sort((a, b) => {
        const depthA = a.x + a.y + (a.z || 0);
        const depthB = b.x + b.y + (b.z || 0);
        return depthA - depthB;
    });
};

/**
 * Creates a new block with the specified properties.
 * @param type - The ID of the block type.
 * @param x - The x-coordinate of the block in the grid.
 * @param y - The y-coordinate of the block in the grid.
 * @param z - The z-coordinate (height) of the block.
 * @param id - The unique identifier for the block.
 * @param blockTypes - The collection of available block types.
 * @param initialState - Optional initial state for the block.
 * @returns - A new block object with the specified properties.
 */
export const createBlock = <
    T extends Record<string, BlockType>, // Type of block types
    K extends keyof T, // keyof T is the type of block
>(
    type: K,
    x: number,
    y: number,
    z: number,
    id: string,
    blockTypes: T,
    initialState?: Partial<ReturnType<T[K]["getDefaultState"]>> // Infer the default state type from the block type
): Block => {
    const blockType = blockTypes[type];
    if (!blockType) {
        throw new Error(`Unknown block type: ${String(type)}`);
    }

    return {
        id,
        x,
        y,
        z,
        type: blockType,
        state: { ...blockType.getDefaultState(), ...initialState }, // Merge default state with initial state
    };
};
