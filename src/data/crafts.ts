import { Craft } from "@/stores/crafts";

export const crafts: Record<string, Craft> = {
    wooden_axe: {
        result: {
            qty: 1,
            item: {
                name: "Wooden Axe",
                textureIdentifier: "wooden_axe",
            },
        },
        cost: [
            {
                material: "wood",
                amount: 10,
            },
        ],
    },
    stone_axe: {
        result: {
            qty: 1,
            item: {
                name: "Stone Axe",
                textureIdentifier: "stone_axe",
            },
        },
        cost: [
            {
                material: "cobblestone",
                amount: 100,
            },
        ],
    },
};
