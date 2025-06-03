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
    wooden_shield: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.shield },
        },
        cost: {
            resources: [{ material: "wood", amount: 15 }],
            items: ["rope"],
        },
    },
    rope: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.rope },
        },
        cost: {
            resources: [{ material: "wood", amount: 5 }],
        },
    },
    backpack: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.backpack },
        },
        cost: {
            resources: [{ material: "wood", amount: 25 }],
            items: ["rope", "rope"],
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
            items: ["wooden_axe"],
        },
    },
    stone_pickaxe: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.stone_pickaxe },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 15 }],
            items: ["wooden_pickaxe"],
        },
    },
    stone_sword: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.stone_sword },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 20 }],
            items: ["wooden_sword"],
        },
    },
    stone_furnace: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.stone_furnace },
        },
        cost: {
            resources: [
                { material: "cobblestone", amount: 30 },
                { material: "wood", amount: 10 },
            ],
        },
    },
    grindstone: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.grindstone },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 25 }],
        },
    },
    stone_chest: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.stone_chest },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 40 }],
        },
    },
    binding: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.binding },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 5 }],
            items: ["rope", "rope"],
        },
    },
    leather_boots: {
        result: {
            qty: 1,
            item: { ...GAME_ITEMS.leather_boots },
        },
        cost: {
            resources: [{ material: "cobblestone", amount: 10 }],
            items: ["binding"],
        },
    },
} satisfies Record<string, Craft>;
