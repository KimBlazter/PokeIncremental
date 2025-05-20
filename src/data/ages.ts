import { Age } from "@/stores/ages";

export const ages = {
    wood: {
        name: "Wood",
        unlocked: true,
        collectible: "wood",
    },
    stone: {
        name: "Stone",
        unlocked: false,
        collectible: "cobblestone",
    },
    iron: {
        name: "Iron",
        unlocked: false,
        collectible: "iron",
    },
    gold: {
        name: "Gold",
        unlocked: false,
        collectible: "gold",
    },
} satisfies Record<string, Age>;
