import { Craft } from "@/stores/crafts";
import { GAME_ITEMS } from "./items";

export const crafts = {
    // WOOD AGE
    wooden_axe: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.wooden_axe },
        },
        cost: {
            resources: [{ material: "wood", amount: 10 }],
        },
    },
    wooden_pickaxe: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.wooden_pickaxe },
        },
        cost: {
            resources: [{ material: "wood", amount: 10 }],
        },
    },
    wooden_sword: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.wooden_sword },
        },
        cost: {
            resources: [{ material: "wood", amount: 12 }],
        },
    },
    campfire: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.campfire },
        },
        cost: {
            resources: [{ material: "wood", amount: 20 }],
        },
    },
    shield: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.shield },
        },
        cost: {
            resources: [{ material: "wood", amount: 15 }],
            items: [],
        },
    },
    log_pile: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.log_pile },
        },
        cost: {
            resources: [{ material: "wood", amount: 30 }],
        },
    },

    // STONE AGE
    stone_axe: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.stone_axe },
        },
        cost: {
            resources: [
                { material: "cobblestone", amount: 15 },
                { material: "wood", amount: 5 },
            ],
            items: [{ key: "wooden_axe" }],
        },
    },
    stone_pickaxe: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.stone_pickaxe },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 15 }],
            items: [{ key: "wooden_pickaxe" }],
        },
    },
    stone_sword: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.stone_sword },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 20 }],
            items: [{ key: "wooden_sword" }],
        },
    },
    leather_boots: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.leather_boots },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 10 }],
            items: [],
        },
    },

    // CONSUMABLES
    watermelon: {
        result: {
            item: { ...GAME_ITEMS.watermelon },
            qty: 2,
        },
        cost: {
            resources: [],
            items: [],
        },
    },
} satisfies Record<string, Craft>;
