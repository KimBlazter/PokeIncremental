import { useEffect, useRef, useState, useCallback } from "react";
import {
    Block,
    IsometricViewProps,
    BlockEvent,
    IsometricConfig,
} from "@/types/isometric";
import {
    createIsometricConfig,
    toIsometric,
    fromIsometric,
    sortBlocksByDepth,
    drawBlock,
    drawBlockHighlight,
} from "@/utils/isometric";

export const IsometricView: React.FC<IsometricViewProps> = ({
    grid,
    config: configOverride,
    onBlockClick,
    onBlockHover,
    onGridClick,
    showCoordinates = false,
    showGrid = false,
    className = "",
    style,
    highlightColor = "#FFD700",
    backgroundColor = "transparent",
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredBlock, setHoveredBlock] = useState<{
        x: number;
        y: number;
        z: number;
    } | null>(null);
    const [config] = useState<IsometricConfig>(() =>
        createIsometricConfig(configOverride)
    );

    const getBlocksAt = useCallback(
        (x: number, y: number): Block[] => {
            return grid.blocks.filter(
                (block) => block.x === x && block.y === y
            );
        },
        [grid.blocks]
    );

    const getBlockUnderMouse = useCallback(
        (
            mouseX: number,
            mouseY: number,
            offsetX: number,
            offsetY: number
        ): Block | null => {
            let bestBlock: Block | null = null;
            let minDistance = Infinity;

            for (const block of grid.blocks) {
                const iso = toIsometric(block.x, block.y, block.z, config);
                const blockScreenX = iso.x + offsetX;
                const blockScreenY = iso.y + offsetY;

                const blockWidth = config.tileWidth;
                const blockHeight = config.tileHeight + config.blockHeight;

                if (
                    mouseX >= blockScreenX - blockWidth / 2 &&
                    mouseX <= blockScreenX + blockWidth / 2 &&
                    mouseY >= blockScreenY - blockHeight / 2 &&
                    mouseY <= blockScreenY + blockHeight / 2
                ) {
                    const distance = Math.sqrt(
                        Math.pow(mouseX - blockScreenX, 2) +
                            Math.pow(mouseY - blockScreenY, 2)
                    );

                    if (distance < minDistance) {
                        minDistance = distance;
                        bestBlock = block;
                    }
                }
            }

            return bestBlock;
        },
        [grid.blocks, config]
    );

    const renderGrid = useCallback(
        async (
            ctx: CanvasRenderingContext2D,
            canvasWidth: number,
            canvasHeight: number
        ) => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            if (backgroundColor !== "transparent") {
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            }

            const offsetX = canvasWidth / 2;
            const offsetY = canvasHeight / 4;

            // Draw grid lines if enabled
            if (showGrid) {
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 0.5;
                for (let x = 0; x <= grid.width; x++) {
                    for (let y = 0; y <= grid.height; y++) {
                        const iso1 = toIsometric(x, y, -1, config);
                        const iso2 = toIsometric(x, y + 1, -1, config);
                        const iso3 = toIsometric(x + 1, y, -1, config);

                        ctx.beginPath();
                        ctx.moveTo(iso1.x + offsetX, iso1.y + offsetY);
                        ctx.lineTo(iso2.x + offsetX, iso2.y + offsetY);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(iso1.x + offsetX, iso1.y + offsetY);
                        ctx.lineTo(iso3.x + offsetX, iso3.y + offsetY);
                        ctx.stroke();
                    }
                }
            }

            const sortedBlocks = sortBlocksByDepth(grid.blocks);

            // Draw blocks and highlights
            for (const block of sortedBlocks) {
                await drawBlock(ctx, block, offsetX, offsetY, config);

                if (
                    hoveredBlock &&
                    block.x === hoveredBlock.x &&
                    block.y === hoveredBlock.y &&
                    block.z === hoveredBlock.z
                ) {
                    drawBlockHighlight(
                        ctx,
                        hoveredBlock,
                        offsetX,
                        offsetY,
                        config,
                        highlightColor
                    );
                }
            }

            // Draw highlight for empty space if needed
            if (hoveredBlock) {
                const hasActualBlock = grid.blocks.some(
                    (block) =>
                        block.x === hoveredBlock.x &&
                        block.y === hoveredBlock.y &&
                        block.z === hoveredBlock.z
                );

                if (!hasActualBlock) {
                    drawBlockHighlight(
                        ctx,
                        hoveredBlock,
                        offsetX,
                        offsetY,
                        config,
                        highlightColor
                    );
                }
            }
        },
        [grid, hoveredBlock, config, showGrid, backgroundColor, highlightColor]
    );

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const offsetX = canvas.width / 2;
            const offsetY = canvas.height / 4;

            const blockUnderMouse = getBlockUnderMouse(
                mouseX,
                mouseY,
                offsetX,
                offsetY
            );

            if (blockUnderMouse) {
                const newHovered = {
                    x: blockUnderMouse.x,
                    y: blockUnderMouse.y,
                    z: blockUnderMouse.z,
                };
                setHoveredBlock(newHovered);

                if (onBlockHover) {
                    onBlockHover({
                        block: blockUnderMouse,
                        gridPosition: newHovered,
                        mouseEvent: event,
                    });
                }
            } else {
                const gridPos = fromIsometric(
                    mouseX,
                    mouseY,
                    offsetX,
                    offsetY,
                    0,
                    config
                );

                if (
                    gridPos.x >= 0 &&
                    gridPos.x < grid.width &&
                    gridPos.y >= 0 &&
                    gridPos.y < grid.height
                ) {
                    const blocksAtPosition = getBlocksAt(gridPos.x, gridPos.y);
                    const topBlock =
                        blocksAtPosition.length > 0 ?
                            blocksAtPosition.sort((a, b) => b.z - a.z)[0]
                        :   null;

                    const z = topBlock ? topBlock.z : -1;
                    const newHovered = { x: gridPos.x, y: gridPos.y, z };
                    setHoveredBlock(newHovered);

                    if (onBlockHover) {
                        onBlockHover({
                            block: topBlock || undefined,
                            gridPosition: newHovered,
                            mouseEvent: event,
                        });
                    }
                } else {
                    setHoveredBlock(null);
                    if (onBlockHover) {
                        onBlockHover(null);
                    }
                }
            }
        },
        [
            getBlockUnderMouse,
            getBlocksAt,
            grid.width,
            grid.height,
            config,
            onBlockHover,
        ]
    );

    const handleMouseLeave = useCallback(() => {
        setHoveredBlock(null);
        if (onBlockHover) {
            onBlockHover(null);
        }
    }, [onBlockHover]);

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!hoveredBlock) return;

            const block = grid.blocks.find(
                (b) =>
                    b.x === hoveredBlock.x &&
                    b.y === hoveredBlock.y &&
                    b.z === hoveredBlock.z
            );

            const blockEvent: BlockEvent = {
                block,
                gridPosition: hoveredBlock,
                mouseEvent: event,
            };

            if (block && onBlockClick) {
                onBlockClick(blockEvent);
            } else if (!block && onGridClick) {
                onGridClick(blockEvent);
            }
        },
        [hoveredBlock, grid.blocks, onBlockClick, onGridClick]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.imageSmoothingEnabled = false;
        renderGrid(ctx, canvas.width, canvas.height);
    }, [renderGrid]);

    return (
        <div className={`relative h-full w-full ${className}`} style={style}>
            {showCoordinates && (
                <div className="absolute top-0 right-0 z-10 m-6 flex w-25 items-center justify-center rounded bg-black/50 px-2 py-1 text-sm text-white">
                    <span>
                        {hoveredBlock?.x ?? "-"}, {hoveredBlock?.y ?? "-"},{" "}
                        {hoveredBlock?.z ?? "-"}
                    </span>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="h-full w-full cursor-crosshair rounded"
                style={{ imageRendering: "pixelated" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                draggable={false}
            />
        </div>
    );
};
