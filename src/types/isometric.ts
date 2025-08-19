import { Texture } from "@/utils/spriteLoader";

export type BlockState = Record<string, any>;

export type BlockType = {
    id: string;
    name: string;
    getTexture(state: BlockState): Texture;
    getDefaultState(): BlockState;
    onInteract?(block: Block, grid: Grid): Block | null;
    onTick?(block: Block, grid: Grid): TickResult;
    canPlaceOn?(belowBlock: Block | null): boolean;
};

export type TickResult =
    | { kind: "same" }
    | { kind: "update"; block: Block }
    | { kind: "remove" };

export type Block = {
    id: string;
    x: number;
    y: number;
    z: number;
    type: BlockType;
    state: BlockState;
};

export type Grid = {
    width: number;
    height: number;
    blocks: Block[];
};

export type IsometricConfig = {
    tileWidth: number;
    tileHeight: number;
    blockHeight: number;
    scale: number;
};
