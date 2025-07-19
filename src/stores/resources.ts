import { produce } from "immer";
import { StateCreator } from "zustand";
import { Item, ToolType } from "./items";
import { resources } from "@/data/resources";
import { GameStore } from "./game";
import { Texture } from "@/utils/spriteLoader";

export type Resource = keyof typeof resources;

export interface ResourceData {
    name: string;
    amount: number;
    texture: Texture; // image identifier
    obtainedFrom: Item;
    effective_tool: ToolType;
    hp: number; // Base health points for the resource
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
> = (set, get) => ({
    resources: resources,
    addResource: (resource, amount) => {
        set(
            produce((state: ResourceSlice) => {
                state.resources[resource].amount += amount;
            })
        );
        get().checkAchievements();
    },
});
