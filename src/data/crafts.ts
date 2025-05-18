import { Craft } from "@/stores/crafts";

export const crafts: Record<string, Craft> = {
    wooden_axe: {
        result: {
            qty: 1,
            item: {
                id: "woodent_axe",
                name: "Wooden Axe",
                textureIdentifier: "wooden_axe",
            },
        },
        cost: {
            resources: [
                {
                    material: "wood",
                    amount: 10,
                },
            ],
        },
    },
    stone_axe: {
        result: {
            qty: 1,
            item: {
                id: "stone_axe",
                name: "Stone Axe",
                textureIdentifier: "stone_axe",
            },
        },
        cost: {
            resources: [
                {
                    material: "cobblestone",
                    amount: 100,
                },
                {
                    material: "wood",
                    amount: 20,
                },
            ],
            items: ["wooden_axe"],
        },
    },
};
