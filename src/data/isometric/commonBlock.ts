import { BlockType } from "@/types/isometric";

export const commonBlockTypes = {
    dirt: {
        id: "dirt",
        name: "Dirt",
        getTexture: () => "block:dirt",
        getDefaultState: () => ({}),
    },
    stone: {
        id: "stone",
        name: "Stone",
        getTexture: () => "block:stone",
        getDefaultState: () => ({}),
    },
    grass: {
        id: "grass",
        name: "Grass",
        getTexture: () => ({
            base: "block:grass_block",
            tint: "#73C470",
        }),
        getDefaultState: () => ({}),
    },
    cobblestone: {
        id: "cobblestone",
        name: "Cobblestone",
        getTexture: () => "block:cobblestone",
        getDefaultState: () => ({}),
    },
} as const satisfies Record<string, BlockType>;
