import { ResourceData } from "@/stores/resources";

export const resources = {
    wood: {
        name: "Wood",
        amount: 0,
        texture: "block:oak_log",
        effective_tool: "axe",
    },
    cobblestone: {
        name: "Cobblestone",
        amount: 0,
        texture: "block:cobblestone",
        effective_tool: "pickaxe",
    },
    iron: {
        name: "Iron",
        amount: 0,
        texture: "item:iron_ingot",
        effective_tool: "pickaxe",
    },
    gold: {
        name: "Gold",
        amount: 0,
        texture: "item:gold_ingot",
        effective_tool: "pickaxe",
    },
} satisfies Record<string, ResourceData>;
