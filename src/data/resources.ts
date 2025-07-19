import { ResourceData } from "@/stores/resources";
import { GAME_ITEMS } from "./items";

export const resources = {
    wood: {
        name: "Wood",
        amount: 0,
        texture: "block:oak_log",
        obtainedFrom: { ...GAME_ITEMS.oak_log },
        hp: 100,
        effective_tool: "axe",
    },
    cobblestone: {
        name: "Cobblestone",
        amount: 0,
        texture: "block:cobblestone",
        obtainedFrom: { ...GAME_ITEMS.stone },
        hp: 250,
        effective_tool: "pickaxe",
    },
    iron: {
        name: "Iron",
        amount: 0,
        texture: "item:raw_iron",
        obtainedFrom: {
            ...GAME_ITEMS.iron_ore,
        },
        hp: 600,
        effective_tool: "pickaxe",
    },
    gold: {
        name: "Gold",
        amount: 0,
        texture: "item:raw_gold",
        obtainedFrom: {
            ...GAME_ITEMS.gold_ore,
        },
        hp: 800,
        effective_tool: "pickaxe",
    },
} satisfies Record<string, ResourceData>;
