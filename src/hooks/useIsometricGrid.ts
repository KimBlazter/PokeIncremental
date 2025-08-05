import { Block, Grid } from "@/types/isometric";
import { useState, useCallback } from "react";

export const useIsometricGrid = (initialGrid: Grid) => {
    const [grid, setGrid] = useState<Grid>(initialGrid);

    const addBlock = useCallback((block: Omit<Block, "id">) => {
        const newBlock: Block = {
            ...block,
            id: `${block.x}-${block.y}-${block.z}-${Date.now()}`,
        };
        setGrid((prev) => ({
            ...prev,
            blocks: [...prev.blocks, newBlock],
        }));
        return newBlock;
    }, []);

    const removeBlock = useCallback((blockId: string) => {
        setGrid((prev) => ({
            ...prev,
            blocks: prev.blocks.filter((b) => b.id !== blockId),
        }));
    }, []);

    const removeBlockAt = useCallback((x: number, y: number, z?: number) => {
        setGrid((prev) => ({
            ...prev,
            blocks: prev.blocks.filter((b) => {
                if (z !== undefined) {
                    return !(b.x === x && b.y === y && b.z === z);
                }
                return !(b.x === x && b.y === y);
            }),
        }));
    }, []);

    const updateBlock = useCallback(
        (blockId: string, updates: Partial<Block>) => {
            setGrid((prev) => ({
                ...prev,
                blocks: prev.blocks.map((b) =>
                    b.id === blockId ? { ...b, ...updates } : b
                ),
            }));
        },
        []
    );

    const getBlocksAt = useCallback(
        (x: number, y: number) => {
            return grid.blocks.filter(
                (block) => block.x === x && block.y === y
            );
        },
        [grid.blocks]
    );

    const getBlockAt = useCallback(
        (x: number, y: number, z: number) => {
            return grid.blocks.find(
                (block) => block.x === x && block.y === y && block.z === z
            );
        },
        [grid.blocks]
    );

    const getTopBlockAt = useCallback(
        (x: number, y: number) => {
            const blocks = getBlocksAt(x, y);
            return blocks.length > 0 ?
                    blocks.sort((a, b) => b.z - a.z)[0]
                :   null;
        },
        [getBlocksAt]
    );

    const clearGrid = useCallback(() => {
        setGrid((prev) => ({ ...prev, blocks: [] }));
    }, []);

    const setGridSize = useCallback((width: number, height: number) => {
        setGrid((prev) => ({ ...prev, width, height }));
    }, []);

    return {
        grid,
        setGrid,
        addBlock,
        removeBlock,
        removeBlockAt,
        updateBlock,
        getBlocksAt,
        getBlockAt,
        getTopBlockAt,
        clearGrid,
        setGridSize,
    };
};
