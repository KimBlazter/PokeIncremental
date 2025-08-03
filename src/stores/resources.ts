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
    discoveredResources: Resource[]; // List of resources that have been discovered
    updateResource: (resource: Resource, amount: number) => void;
}

export const createResourceSlice: StateCreator<
    GameStore,
    [],
    [],
    ResourceSlice
> = (set, get) => ({
    resources: resources,
    discoveredResources: [],
    updateResource: (resource, amount) => {
        set(
            produce((state: ResourceSlice) => {
                const oldAmount = state.resources[resource].amount;
                const newAmount = oldAmount + amount;

                state.resources[resource].amount = Math.max(newAmount, 0);

                // Newly discovered resource
                if (oldAmount === 0 && newAmount > 0) {
                    state.discoveredResources.push(resource);
                }

                if (oldAmount > 0 && newAmount <= 0) {
                    state.discoveredResources =
                        state.discoveredResources.filter((r) => r !== resource);
                }
            })
        );
        get().checkAchievements();
    },
});
