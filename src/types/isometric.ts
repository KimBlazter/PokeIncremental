import { Texture } from "@/utils/spriteLoader";

export type Block = {
    id: string;
    x: number;
    y: number;
    z: number;
    texture?: Texture;
    data?: any;
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

export type BlockEvent = {
    block?: Block;
    gridPosition: { x: number; y: number; z: number };
    mouseEvent: React.MouseEvent<HTMLCanvasElement>;
};

export type IsometricViewProps = {
    grid: Grid;
    config?: Partial<IsometricConfig>;
    onBlockClick?: (event: BlockEvent) => void;
    onBlockHover?: (event: BlockEvent | null) => void;
    onGridClick?: (event: BlockEvent) => void;
    showCoordinates?: boolean;
    showGrid?: boolean;
    className?: string;
    style?: React.CSSProperties;
    highlightColor?: string;
    backgroundColor?: string;
};
