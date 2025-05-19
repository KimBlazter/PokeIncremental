import { Craft } from "@/stores/crafts";
import { GAME_ITEMS } from "./items";

export const crafts: Record<string, Craft> = {
    wooden_axe: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.wooden_axe }, // create new instance
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
                ...GAME_ITEMS.stone_axe,
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
