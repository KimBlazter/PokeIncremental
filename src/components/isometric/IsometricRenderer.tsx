import { Block, Grid } from "@/types/isometric";
import {
    configureNoAntialias,
    drawBlockHighlight,
    fromIsometric,
    getBlocksAt,
    sortBlocksByDepth,
    toIsometric,
} from "@/utils/isometric";
import { getTextureCanvas } from "@/utils/spriteLoader";
import { useEffect, useRef, useState } from "react";

export const ISO_CONFIG = {
    tileWidth: 56,
    tileHeight: 28,
    blockHeight: 35,
    scale: 1,
};

function getTextureKey(texture: any): string {
    return typeof texture === "string" ? texture : JSON.stringify(texture);
}

interface IsometricRendererProps {
    grid: Grid;
    onGridChange: (grid: Grid) => void;
    tickInterval?: number;
    className?: string;
}

export default function IsometricRenderer({
    grid,
    onGridChange,
    tickInterval = 1000,
    className = "",
}: IsometricRendererProps) {
    const backgroundRef = useRef<HTMLCanvasElement>(null);
    const highlightRef = useRef<HTMLCanvasElement>(null);
    const [hoveredBlock, setHoveredBlock] = useState<{
        x: number;
        y: number;
        z: number;
    } | null>(null);

    const textureCache = new Map<string, HTMLCanvasElement>();

    // const drawBlockHighlight = (
    //     ctx: CanvasRenderingContext2D,
    //     hoveredBlock: { x: number; y: number; z: number },
    //     offsetX: number,
    //     offsetY: number
    // ) => {
    //     const topZ = hoveredBlock.z + 1;

    //     const top1 = toIsometric(hoveredBlock.x, hoveredBlock.y, topZ);
    //     const top2 = toIsometric(hoveredBlock.x + 1, hoveredBlock.y, topZ);
    //     const top3 = toIsometric(hoveredBlock.x + 1, hoveredBlock.y + 1, topZ);
    //     const top4 = toIsometric(hoveredBlock.x, hoveredBlock.y + 1, topZ);

    //     const isPointOccluded = (screenX: number, screenY: number) => {
    //         for (const block of grid.blocks) {
    //             const blockDepth = block.x + block.y + block.z;
    //             const highlightDepth = hoveredBlock.x + hoveredBlock.y + topZ;

    //             if (blockDepth > highlightDepth) {
    //                 const blockCenterX =
    //                     toIsometric(block.x + 0.5, block.y + 0.5, block.z).x +
    //                     offsetX;
    //                 const blockCenterY =
    //                     toIsometric(block.x + 0.5, block.y + 0.5, block.z).y +
    //                     offsetY;

    //                 const dx = Math.abs(screenX - blockCenterX);
    //                 const dy = Math.abs(screenY - blockCenterY);

    //                 const blockWidth = ISO_CONFIG.tileWidth / 2;
    //                 const blockHeight = ISO_CONFIG.tileHeight / 2;

    //                 if (dx < blockWidth && dy < blockHeight) {
    //                     return true;
    //                 }
    //             }
    //         }
    //         return false;
    //     };

    //     const segments = 8;

    //     ctx.strokeStyle = "#FFD700";
    //     ctx.lineWidth = 2;
    //     ctx.fillStyle = "rgba(255, 215, 0, 0.2)";

    //     const drawSegmentedPath = (
    //         startPoint: { x: number; y: number },
    //         endPoint: { x: number; y: number }
    //     ) => {
    //         for (let i = 0; i <= segments; i++) {
    //             const t = i / segments;
    //             const x =
    //                 startPoint.x + (endPoint.x - startPoint.x) * t + offsetX;
    //             const y =
    //                 startPoint.y + (endPoint.y - startPoint.y) * t + offsetY;

    //             if (!isPointOccluded(x, y)) {
    //                 if (i === 0) {
    //                     ctx.beginPath();
    //                     ctx.moveTo(x, y);
    //                 } else {
    //                     ctx.lineTo(x, y);
    //                 }
    //             } else {
    //                 if (i > 0) {
    //                     ctx.stroke();
    //                 }
    //             }
    //         }
    //         ctx.stroke();
    //     };

    //     drawSegmentedPath(top1, top2);
    //     drawSegmentedPath(top2, top3);
    //     drawSegmentedPath(top3, top4);
    //     drawSegmentedPath(top4, top1);

    //     ctx.beginPath();
    //     let pathStarted = false;

    //     for (let i = 0; i <= segments; i++) {
    //         for (let j = 0; j <= segments; j++) {
    //             const u = i / segments;
    //             const v = j / segments;

    //             if (u + v <= 1) {
    //                 const x1 =
    //                     top1.x + (top2.x - top1.x) * u + (top4.x - top1.x) * v;
    //                 const y1 =
    //                     top1.y + (top2.y - top1.y) * u + (top4.y - top1.y) * v;

    //                 const screenX = x1 + offsetX;
    //                 const screenY = y1 + offsetY;

    //                 if (!isPointOccluded(screenX, screenY)) {
    //                     if (!pathStarted) {
    //                         ctx.moveTo(screenX, screenY);
    //                         pathStarted = true;
    //                     } else {
    //                         ctx.lineTo(screenX, screenY);
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     if (pathStarted) {
    //         ctx.closePath();
    //         ctx.fill();
    //     }
    // };

    const getBlockUnderMouse = (
        mouseX: number,
        mouseY: number,
        offsetX: number,
        offsetY: number
    ): Block | null => {
        let bestBlock: Block | null = null;
        let minDistance = Infinity;

        for (const block of grid.blocks) {
            const iso = toIsometric(block.x, block.y, block.z);
            const blockScreenX = iso.x + offsetX;
            const blockScreenY = iso.y + offsetY;

            const blockWidth = ISO_CONFIG.tileWidth;
            const blockHeight = ISO_CONFIG.tileHeight + ISO_CONFIG.blockHeight;

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
    };

    const handleBlockClick = (block: Block) => {
        if (block.type.onInteract) {
            const newBlock = block.type.onInteract(block, grid);

            onGridChange({
                ...grid,
                blocks:
                    newBlock ?
                        grid.blocks.map((b) =>
                            b.id === block.id ? newBlock : b
                        )
                    :   grid.blocks.filter((b) => b.id !== block.id),
            });
        }
    };

    // Système de tick
    useEffect(() => {
        const tickIntervalId = setInterval(() => {
            let hasChanges = false;
            const newBlocks = grid.blocks
                .map((block) => {
                    if (block.type.onTick) {
                        const tickResult = block.type.onTick(block, grid);
                        switch (tickResult.kind) {
                            case "same":
                                return block;
                            case "remove":
                                hasChanges = true;
                                return null;
                            case "update":
                                hasChanges = true;
                                return tickResult.block;
                        }
                    }
                    return block;
                })
                .filter(Boolean);

            if (hasChanges) {
                onGridChange({
                    ...grid,
                    blocks: newBlocks.filter((block) => block !== null),
                });
            }
        }, tickInterval);

        return () => clearInterval(tickIntervalId);
    }, [grid, onGridChange, tickInterval]);

    useEffect(() => {
        (async () => {
            for (const block of grid.blocks) {
                const texture = block.type.getTexture(block.state);
                if (!textureCache.has(getTextureKey(texture))) {
                    const { canvas } = await getTextureCanvas(texture);
                    textureCache.set(getTextureKey(texture), canvas);
                }
            }
            drawBackground();
        })();
    }, [grid]);

    const drawBackground = () => {
        const canvas = backgroundRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        configureNoAntialias(ctx);

        const sortedBlocks = sortBlocksByDepth(grid.blocks);
        const offsetX = canvas.width / 2;
        const offsetY = canvas.height / 4;

        for (const block of sortedBlocks) {
            const iso = toIsometric(block.x, block.y, block.z);
            const x = iso.x + offsetX;
            const y = iso.y + offsetY;

            const texture = block.type.getTexture(block.state);
            if (textureCache.has(getTextureKey(texture))) {
                const textureCanvas = textureCache.get(getTextureKey(texture));
                ctx.drawImage(
                    textureCanvas!,
                    x - textureCanvas!.width / 2,
                    y - textureCanvas!.height / 2
                );
            }
        }
    };

    useEffect(() => {
        const canvas = highlightRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        configureNoAntialias(ctx);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (hoveredBlock) {
            drawBlockHighlight(
                ctx,
                hoveredBlock,
                canvas.width / 2,
                canvas.height / 4
            );
        }
    }, [hoveredBlock, grid]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const bg = backgroundRef.current;
        if (!bg) return;
        const rect = bg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const offsetX = bg.width / 2,
            offsetY = bg.height / 4;

        const blockUnderMouse = getBlockUnderMouse(
            mouseX,
            mouseY,
            offsetX,
            offsetY
        );
        if (blockUnderMouse) {
            setHoveredBlock({
                x: blockUnderMouse.x,
                y: blockUnderMouse.y,
                z: blockUnderMouse.z,
            });
        } else {
            const gridPos = fromIsometric(mouseX, mouseY, offsetX, offsetY, 0);
            if (
                gridPos.x >= 0 &&
                gridPos.x < grid.width &&
                gridPos.y >= 0 &&
                gridPos.y < grid.height
            ) {
                const blocksAt = getBlocksAt(grid, gridPos.x, gridPos.y);
                const top =
                    blocksAt.length ?
                        blocksAt.sort((a, b) => b.z - a.z)[0]
                    :   null;
                const z = top ? top.z : -1;
                setHoveredBlock({ x: gridPos.x, y: gridPos.y, z });
            } else {
                setHoveredBlock(null);
            }
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const bg = backgroundRef.current;
        if (!bg) return;
        const rect = bg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const offsetX = bg.width / 2,
            offsetY = bg.height / 4;

        const blockUnderMouse = getBlockUnderMouse(
            mouseX,
            mouseY,
            offsetX,
            offsetY
        );

        if (blockUnderMouse) {
            handleBlockClick(blockUnderMouse);
        }
    };

    return (
        <div className={`relative h-full w-full ${className}`}>
            <div className="absolute top-0 right-0 z-10 m-6 flex w-25 items-center justify-center bg-black/50 text-sm">
                <span className="px-1">
                    {hoveredBlock?.x ?? "-"}, {hoveredBlock?.y ?? "-"},{" "}
                    {hoveredBlock?.z ?? "-"}
                </span>
            </div>
            <canvas
                ref={backgroundRef}
                className="absolute inset-0 h-full w-full"
                style={{
                    imageRendering: "pixelated",
                }}
            />
            <canvas
                ref={highlightRef}
                className="absolute inset-0 h-full w-full cursor-crosshair"
                style={{
                    imageRendering: "pixelated",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredBlock(null)}
                onClick={handleClick}
            />
        </div>
    );
}
