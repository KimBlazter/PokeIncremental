import { useGameStore } from "@/stores/game";
import ItemIcon from "../ItemIcon";
import {
    Achievement,
    AchievementKey,
    type Achivements,
} from "@/stores/achivements";
import { JSX, useCallback, useRef, useState } from "react";
import { Tooltip } from "../ui/Tooltip";
import AchievementTooltipContent from "../Tooltips/AchievementTooltipContent";
import clsx from "clsx";

type AchievementNode = {
    id: string;
    data: Achievement;
    children: AchievementNode[];
    parentId?: string;
    depth: number;
    x: number;
    y: number;
};

function buildAchievementTree(achievements: Achivements): AchievementNode[] {
    const nodes: Record<string, AchievementNode> = {};

    // Create nodes for each achievement
    Object.entries(achievements).forEach(([key, ach]) => {
        nodes[key] = {
            id: key,
            data: ach,
            children: [],
            parentId: ach.parentId,
            depth: 0,
            x: 0,
            y: 0,
        };
    });

    // Build the tree structure
    const tree: AchievementNode[] = [];
    Object.values(nodes).forEach((node) => {
        if (node.parentId) {
            const parentNode = nodes[node.parentId];
            if (parentNode) {
                parentNode.children.push(node);
                node.depth = parentNode.depth + 1;
            }
        } else {
            tree.push(node);
        }
    });

    // Calculate positions
    let yOffset = 0;
    const positionNodes = (nodeList: AchievementNode[], depth: number = 0) => {
        nodeList.forEach((node) => {
            node.x = depth * 120; // 120px between columns
            node.y = yOffset;
            yOffset += 80; // 80px between rows

            if (node.children.length > 0) {
                positionNodes(node.children, depth + 1);
            }
        });
    };

    positionNodes(tree);

    return tree;
}

function getAllNodes(tree: AchievementNode[]): AchievementNode[] {
    const allNodes: AchievementNode[] = [];

    const traverse = (nodes: AchievementNode[]) => {
        nodes.forEach((node) => {
            allNodes.push(node);
            traverse(node.children);
        });
    };

    traverse(tree);
    return allNodes;
}

export default function Achivements() {
    const achievements = useGameStore((state) => state.achievements);

    const unlockedAchievements = Object.values(achievements).filter(
        (a) => a.unlocked
    ).length;

    const tree = buildAchievementTree(achievements);
    const allNodes = getAllNodes(tree);

    // Compute the maximum dimensions for the container
    const maxX = Math.max(...allNodes.map((n) => n.x)) + 80;
    const maxY = Math.max(...allNodes.map((n) => n.y)) + 80;

    // State for the zoom level and pan
    const defaultZoom = 1;
    const maxZoom = 1;
    const minZoom = 0.4;
    const defaultPosition = { x: maxX / 2, y: 0 };
    const [zoom, setZoom] = useState(defaultZoom);
    const [position, setPosition] = useState(defaultPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle zooming with mouse wheel
    const handleWheel = useCallback(
        (e: React.WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const zoomFactor = 0.1;
            const newScale = Math.max(
                minZoom,
                Math.min(
                    maxZoom,
                    zoom + (e.deltaY > 0 ? -zoomFactor : zoomFactor)
                )
            );

            // Compute the new position based on the mouse position
            const pointX = (mouseX - position.x) / zoom;
            const pointY = (mouseY - position.y) / zoom;

            const newX = mouseX - pointX * newScale;
            const newY = mouseY - pointY * newScale;

            setZoom(newScale);
            setPosition({ x: newX, y: newY });
        },
        [zoom, position]
    );

    // Handle dragging
    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!containerRef.current) return;

            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });
        },
        [position]
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging || !containerRef.current) return;

            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        },
        [isDragging, dragStart]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const resetView = () => {
        setZoom(defaultZoom);
        setPosition(defaultPosition);
    };

    return (
        <div className="h-full w-3xl">
            <h2 className="mb-4 text-xl font-bold">
                Achievements ({unlockedAchievements}/
                {Object.keys(achievements).length})
            </h2>
            <div
                ref={containerRef}
                className="relative max-h-150 w-full cursor-grab overflow-hidden border-3 border-black p-4"
                style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    backgroundImage: "url('/textures/blocks/stone.png')",
                    backgroundSize: `48px`,
                    imageRendering: "pixelated",
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setIsDragging(false)}
            >
                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                        transformOrigin: "0 0",
                        width: maxX,
                        height: maxY,
                        position: "relative",
                    }}
                >
                    {/* Edges en step */}
                    <StepEdges nodes={tree} />

                    {/* Achievement cards */}
                    <div style={{ zIndex: 2, position: "relative" }}>
                        {allNodes.map((node) => (
                            <AchievementCard
                                key={node.id}
                                achievement={node.data}
                                x={node.x}
                                y={node.y}
                            />
                        ))}
                    </div>
                </div>

                {/* Reset button */}
                <button
                    onClick={resetView}
                    className="absolute right-4 bottom-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                    Reset view
                </button>
            </div>
        </div>
    );
}

function AchievementCard({
    achievement,
    x,
    y,
}: {
    achievement: Achievement;
    x: number;
    y: number;
}) {
    const achievements = useGameStore((state) => state.achievements);
    const isVisible =
        achievements[achievement.parentId as AchievementKey]?.unlocked ||
        !achievement.parentId;
    return (
        <div style={{ left: x, top: y }} className="absolute">
            <Tooltip
                content={
                    <AchievementTooltipContent
                        achievement={achievement}
                        visible={isVisible}
                    />
                }
                position="right"
                align="center"
                className="overflow-hidden"
            >
                <div
                    className={`dialog-border-transparent flex h-14 w-14 flex-col items-center justify-center hover:cursor-default ${
                        achievement.unlocked ?
                            "bg-gradient-to-b from-green-400 to-green-600 to-90%"
                        : isVisible ?
                            "bg-gradient-to-b from-gray-300 to-gray-400"
                        :   "bg-gradient-to-b from-gray-500 to-gray-600"
                    } `}
                >
                    <div className="absolute inset-0 mx-auto my-auto size-8 rounded-md bg-gray-600/30 blur-sm"></div>
                    <ItemIcon
                        texture={
                            isVisible ?
                                achievement.texture
                            :   "item:questionmark"
                        }
                        className={clsx(
                            "size-8 !p-0",
                            !isVisible && "opacity-60"
                        )}
                    />

                    {/* Item shadow */}
                </div>
            </Tooltip>
        </div>
    );
}

function StepEdges({ nodes }: { nodes: AchievementNode[] }) {
    const edges: JSX.Element[] = [];

    const traverse = (nodeList: AchievementNode[]) => {
        nodeList.forEach((parent) => {
            parent.children.forEach((child) => {
                // Connection points (center of the cards)
                const parentCenterX = parent.x + 32; // 32 = half of card width
                const parentCenterY = parent.y + 32;
                const childCenterX = child.x + 32;
                const childCenterY = child.y + 32;

                // Points to create a "step" line (right angle)
                const midX = parentCenterX + (childCenterX - parentCenterX) / 2;

                const isUnlocked = child.data.unlocked;

                // Create the path in steps: horizontal then vertical
                const pathData = `
                    M ${parentCenterX} ${parentCenterY}
                    L ${midX} ${parentCenterY}
                    L ${midX} ${childCenterY}
                    L ${childCenterX} ${childCenterY}
                `;

                // White line with black contour
                edges.push(
                    <g key={`${parent.id}-${child.id}`}>
                        {/* Black outline (thicker line) */}
                        <path
                            d={pathData}
                            stroke="#000000"
                            strokeWidth="5"
                            fill="none"
                            strokeDasharray={isUnlocked ? "0" : "8,4"}
                            strokeLinecap="square"
                        />
                        {/* White center (thinner line) */}
                        <path
                            d={pathData}
                            stroke="#ffffff"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={isUnlocked ? "0" : "6,3"}
                            strokeLinecap="square"
                        />
                    </g>
                );
            });

            traverse(parent.children);
        });
    };

    traverse(nodes);

    // Compute svg dimensions based on the maximum x and y values
    const allNodes = getAllNodes(nodes);
    const maxX = Math.max(...allNodes.map((n) => n.x)) + 64;
    const maxY = Math.max(...allNodes.map((n) => n.y)) + 64;

    return (
        <svg
            className="pointer-events-none absolute inset-0"
            width={maxX}
            height={maxY}
            style={{ zIndex: 1 }}
        >
            {edges}
        </svg>
    );
}
