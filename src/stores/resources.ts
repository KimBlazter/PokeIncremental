import { produce } from "immer";
import { StateCreator } from "zustand";
import { ToolType } from "./items";

export type Resource = "wood" | "cobblestone" | "iron" | "gold";

export interface ResourceData {
    name: string;
    amount: number;
    texture_identifier: string; // image identifier
    effective_tool: ToolType;
}

export type Resources = Record<Resource, ResourceData>;

export interface ResourceSlice {
    resources: Resources;
    addResource: (resource: Resource, amount: number) => void;
}

export const createResourceSlice: StateCreator<
    ResourceSlice,
    [],
    [],
    ResourceSlice
> = (set) => ({
    resources: {
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
    },
    addResource: (resource, amount) =>
        set(
            produce((state: ResourceSlice) => {
                state.resources[resource].amount += amount;
            })
        ),
});
