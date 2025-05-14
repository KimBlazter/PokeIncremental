import { StateCreator } from "zustand";

export type Resource = "wood" | "stone" | "iron" | "gold";

export type Resources = Record<Resource, number>;

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
        wood: 0,
        stone: 0,
        iron: 0,
        gold: 0,
    },
    addResource: (ressource, amount) =>
        set((state) => ({
            resources: {
                ...state.resources,
                [ressource]: state.resources[ressource] + amount,
            },
        })),
});
