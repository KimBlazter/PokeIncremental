import { Age, AgeKey } from "@/stores/ages";

export const ages: Record<AgeKey, Age> = {
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
};
