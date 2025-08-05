import { getTextureCanvas, Texture } from "@/utils/spriteLoader";
import { useEffect, useRef, useState } from "react";

type Block = {
    id: string;
    x: number;
    y: number;
    z: number;
    texture?: Texture;
};

type Grid = {
    width: number;
    height: number;
    blocks: Block[];
};

const ISO_CONFIG = {
    tileWidth: 56,
    tileHeight: 28,
    blockHeight: 35,
    scale: 1,
};

const getBlocksAt = (grid: Grid, x: number, y: number): Block[] => {
    return grid.blocks.filter((block) => block.x === x && block.y === y);
};

const toIsometric = (x: number, y: number, z: number = 0) => {
    const isoX = (x - y) * (ISO_CONFIG.tileWidth / 2);
    const isoY =
        (x + y) * (ISO_CONFIG.tileHeight / 2) - z * ISO_CONFIG.blockHeight;
    return { x: isoX, y: isoY };
};

// Fonction inverse pour convertir les coordonnées écran en coordonnées de grille
const fromIsometric = (
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

const drawBlock = async (
    ctx: CanvasRenderingContext2D,
    block: Block,
    offsetX: number,
    offsetY: number
) => {
    const iso = toIsometric(block.x, block.y, block.z);
    const x = iso.x + offsetX;
    const y = iso.y + offsetY;

    if (block.texture) {
        const { canvas } = await getTextureCanvas(block.texture);
        ctx.drawImage(
            canvas,
            x - canvas.width / 2,
            y - canvas.height / 2,
            canvas.width * ISO_CONFIG.scale,
            canvas.height * ISO_CONFIG.scale
        );
    } else {
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(x - 16, y - 16, 32, 32);
    }

    // Afficher les coordonnées pour debug
    // ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    // ctx.font = "10px Arial";
    // ctx.textAlign = "center";
    // ctx.fillText(`${block.x},${block.y},${block.z}`, x, y + 25);
};

// Separate function to draw block highlight
const drawBlockHighlight = (
    ctx: CanvasRenderingContext2D,
    hoveredBlock: { x: number; y: number; z: number },
    offsetX: number,
    offsetY: number
) => {
    const blockZ = hoveredBlock.z - 0.1;

    const bottom1 = toIsometric(hoveredBlock.x, hoveredBlock.y, blockZ);
    const bottom2 = toIsometric(hoveredBlock.x + 1, hoveredBlock.y, blockZ);
    const bottom3 = toIsometric(hoveredBlock.x + 1, hoveredBlock.y + 1, blockZ);
    const bottom4 = toIsometric(hoveredBlock.x, hoveredBlock.y + 1, blockZ);

    const top1 = toIsometric(hoveredBlock.x, hoveredBlock.y, blockZ + 1);
    const top2 = toIsometric(hoveredBlock.x + 1, hoveredBlock.y, blockZ + 1);
    const top3 = toIsometric(
        hoveredBlock.x + 1,
        hoveredBlock.y + 1,
        blockZ + 1
    );
    const top4 = toIsometric(hoveredBlock.x, hoveredBlock.y + 1, blockZ + 1);

    ctx.strokeStyle = "#FFD700";
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
    ctx.fillStyle = "rgba(255, 215, 0, 0.2)";
    ctx.beginPath();
    ctx.moveTo(top1.x + offsetX, top1.y + offsetY);
    ctx.lineTo(top2.x + offsetX, top2.y + offsetY);
    ctx.lineTo(top3.x + offsetX, top3.y + offsetY);
    ctx.lineTo(top4.x + offsetX, top4.y + offsetY);
    ctx.closePath();
    ctx.fill();
};

const sortBlocksByDepth = (blocks: Block[]): Block[] => {
    return blocks.sort((a, b) => {
        const depthA = a.x + a.y + (a.z || 0);
        const depthB = b.x + b.y + (b.z || 0);
        return depthA - depthB;
    });
};

const renderIsometricGrid = async (
    ctx: CanvasRenderingContext2D,
    grid: Grid,
    canvasWidth: number,
    canvasHeight: number,
    gridZ: number = 0,
    hoveredBlock: { x: number; y: number; z: number } | null = null
) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const offsetX = canvasWidth / 2;
    const offsetY = canvasHeight / 4;

    const sortedBlocks = sortBlocksByDepth(grid.blocks);

    // Draw blocks and highlight in correct depth order
    for (const block of sortedBlocks) {
        await drawBlock(ctx, block, offsetX, offsetY);

        // Check if this block should be highlighted and draw highlight right after the block
        if (
            hoveredBlock &&
            block.x === hoveredBlock.x &&
            block.y === hoveredBlock.y &&
            block.z === hoveredBlock.z
        ) {
            drawBlockHighlight(ctx, hoveredBlock, offsetX, offsetY);
        }
    }

    // If hoveredBlock is on empty space (no actual block), draw highlight on top
    const hasActualBlock =
        hoveredBlock &&
        grid.blocks.some(
            (block) =>
                block.x === hoveredBlock.x &&
                block.y === hoveredBlock.y &&
                block.z === hoveredBlock.z
        );

    if (hoveredBlock && !hasActualBlock) {
        drawBlockHighlight(ctx, hoveredBlock, offsetX, offsetY);
    }

    // Grid lines
    // ctx.strokeStyle = "#333";
    // ctx.lineWidth = 0.5;
    // for (let x = 0; x <= grid.width; x++) {
    //     for (let y = 0; y <= grid.height; y++) {
    //         const iso1 = toIsometric(x, y, gridZ);
    //         const iso2 = toIsometric(x, y + 1, gridZ);
    //         const iso3 = toIsometric(x + 1, y, gridZ);

    //         ctx.beginPath();
    //         ctx.moveTo(iso1.x + offsetX, iso1.y + offsetY);
    //         ctx.lineTo(iso2.x + offsetX, iso2.y + offsetY);
    //         ctx.stroke();

    //         ctx.beginPath();
    //         ctx.moveTo(iso1.x + offsetX, iso1.y + offsetY);
    //         ctx.lineTo(iso3.x + offsetX, iso3.y + offsetY);
    //         ctx.stroke();
    //     }
    // }
};

export default function Isometric() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredBlock, setHoveredBlock] = useState<{
        x: number;
        y: number;
        z: number;
    } | null>(null);

    const [grid] = useState<Grid>({
        width: 20,
        height: 20,
        blocks: [
            { texture: "block:stone", x: 0, y: 0, z: -1, id: "0" },
            { texture: "block:crafting_table", x: 0, y: 0, z: 0, id: "1" },
            { texture: "block:stone", x: 1, y: 0, z: -1, id: "2" },
            { texture: "block:stone", x: 2, y: 0, z: -1, id: "3" },
            { texture: "block:stone", x: 3, y: 0, z: -1, id: "4" },
            { texture: "block:diamond_ore", x: 4, y: 0, z: -1, id: "5" },
            { texture: "block:stone", x: 5, y: 0, z: -1, id: "6" },
            { texture: "block:dirt", x: 6, y: 0, z: 0, id: "7" },
            { texture: "block:stone", x: 7, y: 0, z: 0, id: "8" },
            { texture: "block:farmland_moist", x: 4, y: 1, z: -1, id: "9" },
            { texture: "block:dirt", x: 4, y: 2, z: -1, id: "10" },
            { texture: "block:dirt", x: 3, y: 1, z: -1, id: "11" },
            { texture: "block:stone", x: 5, y: 1, z: -1, id: "12" },
            { texture: "block:coal_ore", x: 6, y: 1, z: -1, id: "13" },
            { texture: "block:stone", x: 7, y: 0, z: -1, id: "14" },
            { texture: "block:stone", x: 7, y: 1, z: -1, id: "15" },
        ],
    });

    const getBlockUnderMouse = (
        mouseX: number,
        mouseY: number,
        offsetX: number,
        offsetY: number
    ): Block | null => {
        let bestBlock: Block | null = null;
        let minDistance = Infinity;

        // Tester tous les blocs pour voir lequel est le plus proche de la souris
        for (const block of grid.blocks) {
            const iso = toIsometric(block.x, block.y, block.z);
            const blockScreenX = iso.x + offsetX;
            const blockScreenY = iso.y + offsetY;

            // Définir une zone de détection autour du bloc (approximativement la taille d'un bloc isométrique)
            const blockWidth = ISO_CONFIG.tileWidth;
            const blockHeight = ISO_CONFIG.tileHeight + ISO_CONFIG.blockHeight;

            // Vérifier si la souris est dans la zone du bloc
            if (
                mouseX >= blockScreenX - blockWidth / 2 &&
                mouseX <= blockScreenX + blockWidth / 2 &&
                mouseY >= blockScreenY - blockHeight / 2 &&
                mouseY <= blockScreenY + blockHeight / 2
            ) {
                // Calculer la distance pour prendre le bloc le plus proche en cas de chevauchement
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

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const offsetX = canvas.width / 2;
        const offsetY = canvas.height / 4;

        // D'abord, chercher un bloc spécifique sous la souris
        const blockUnderMouse = getBlockUnderMouse(
            mouseX,
            mouseY,
            offsetX,
            offsetY
        );

        if (blockUnderMouse) {
            // Si on a trouvé un bloc spécifique, le surligner
            setHoveredBlock({
                x: blockUnderMouse.x,
                y: blockUnderMouse.y,
                z: blockUnderMouse.z,
            });
        } else {
            // Sinon, utiliser la méthode de conversion inverse pour la grille de base
            const gridPos = fromIsometric(mouseX, mouseY, offsetX, offsetY, 0);

            // Vérifier si la position est dans les limites de la grille
            if (
                gridPos.x >= 0 &&
                gridPos.x < grid.width &&
                gridPos.y >= 0 &&
                gridPos.y < grid.height
            ) {
                // Trouver le bloc le plus haut à cette position ou utiliser le niveau de la grille
                const blocksAtPosition = getBlocksAt(
                    grid,
                    gridPos.x,
                    gridPos.y
                );
                const topBlock =
                    blocksAtPosition.length > 0 ?
                        blocksAtPosition.sort((a, b) => b.z - a.z)[0]
                    :   null;

                const z = topBlock ? topBlock.z : -1; // Niveau par défaut de la grille

                setHoveredBlock({ x: gridPos.x, y: gridPos.y, z });
            } else {
                setHoveredBlock(null);
            }
        }
    };

    const handleMouseLeave = () => {
        setHoveredBlock(null);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.imageSmoothingEnabled = false;

        renderIsometricGrid(
            ctx,
            grid,
            canvas.width,
            canvas.height,
            -0.1,
            hoveredBlock
        );
    }, [grid, hoveredBlock]);

    return (
        <div className="relative h-full w-full p-4">
            <div className="absolute top-0 right-0 z-10 m-6 flex w-25 items-center justify-center bg-black/50 text-sm">
                <span className="px-1">
                    {hoveredBlock?.x ?? "-"}, {hoveredBlock?.y ?? "-"},{" "}
                    {hoveredBlock?.z ?? "-"}
                </span>
            </div>
            <canvas
                ref={canvasRef}
                className="h-full w-full cursor-crosshair rounded"
                style={{ imageRendering: "pixelated" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                draggable={false}
            />
        </div>
    );
}
