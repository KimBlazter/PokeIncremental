import { produce } from "immer";
import { StateCreator } from "zustand";
import { ToolType } from "./items";
import { resources } from "@/data/resources";
import { GameStore } from "./game";

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
    GameStore,
    [],
    [],
    ResourceSlice
> = (set) => ({
    resources: resources,
    addResource: (resource, amount) =>
        set(
            produce((state: ResourceSlice) => {
                state.resources[resource].amount += amount;
            })
        ),
});
