import { Age } from "@/stores/ages";

export const ages = {
    wood: {
        name: "Wood",
        unlocked: true,
        collectible: "wood",
        iconIdentifier: "oak_log",
    },
    stone: {
        name: "Stone",
        unlocked: false,
        collectible: "cobblestone",
        iconIdentifier: "stone",
    },
    iron: {
        name: "Iron",
        unlocked: false,
        collectible: "iron",
        iconIdentifier: "iron_block",
    },
    gold: {
        name: "Gold",
        unlocked: false,
        collectible: "gold",
        iconIdentifier: "gold_block",
    },
} satisfies Record<string, Age>;
