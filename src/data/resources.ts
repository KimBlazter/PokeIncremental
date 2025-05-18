import { Resource, ResourceData } from "@/stores/resources";

export const resources: Record<Resource, ResourceData> = {
    wood: {
        name: "Wood",
        amount: 0,
        texture_identifier: "oak_log",
        effective_tool: "axe",
    },
    cobblestone: {
        name: "Cobblestone",
        amount: 0,
        texture_identifier: "cobblestone",
        effective_tool: "pickaxe",
    },
    iron: {
        name: "Iron",
        amount: 0,
        texture_identifier: "raw_iron",
        effective_tool: "pickaxe",
    },
    gold: {
        name: "Gold",
        amount: 0,
        texture_identifier: "raw_gold",
        effective_tool: "pickaxe",
    },
};
