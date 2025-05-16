import { produce } from "immer";
import { StateCreator } from "zustand";

export type Resource = "wood" | "cobblestone" | "iron" | "gold";

export interface ResourceData {
    name: string;
    amount: number;
    texture_identifier: string; // image identifier
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
        },
        cobblestone: {
            name: "Cobblestone",
            amount: 0,
            texture_identifier: "cobblestone",
        },
        iron: {
            name: "Iron",
            amount: 0,
            texture_identifier: "raw_iron",
        },
        gold: {
            name: "Gold",
            amount: 0,
            texture_identifier: "raw_gold",
        },
    },
    addResource: (resource, amount) =>
        set(
            produce((state: ResourceSlice) => {
                state.resources[resource].amount += amount;
            })
        ),
});
