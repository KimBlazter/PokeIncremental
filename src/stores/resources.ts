import { create } from "zustand";

export type Resource = "wood" | "stone" | "iron" | "gold";

export type Resources = Record<Resource, number>;

type ResourceState = {
    resources: Resources;
    addResource: (resource: Resource, amount: number) => void;
    resetGame: () => void;
};

export const useResourceStore = create<ResourceState>((set) => ({
    resources: {
        wood: 0,
        stone: 0,
        iron: 0,
        gold: 0,
    },
    addResource: (resource, amount) =>
        set((state) => ({
            resources: {
                ...state.resources,
                [resource]: state.resources[resource] + amount,
            },
        })),
    resetGame: () =>
        set(() => ({
            resources: {
                wood: 0,
                stone: 0,
                iron: 0,
                gold: 0,
            },
        })),
}));
