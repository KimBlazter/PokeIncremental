import { StateCreator } from "zustand";
import { Resource, ResourceSlice } from "./resources";
import { produce } from "immer";
import { Item, ItemSlice } from "./items";

export interface Craft {
    result: { item: Item; qty: number };
    cost: { resource: Resource; amount: number };
}

export interface CraftSlice {
    crafts: Record<string, Craft>;
    craft: (id: string) => void;
}

export const createCraftSlice: StateCreator<
    CraftSlice & ItemSlice & ResourceSlice,
    [],
    [],
    CraftSlice
> = (set, get) => ({
    crafts: {
        wooden_axe: {
            result: {
                qty: 1,
                item: {
                    name: "Wooden Axe",
                    textureIdentifier: "wooden_axe",
                    type: "axe",
                },
            },
            cost: {
                resource: "wood",
                amount: 10,
            },
        },
    },
    craft: (id: string) => {
        const craft = get().crafts[id];
        const currentResourceAmount =
            get().resources[craft.cost.resource].amount;

        // Remove cost + add item
        if (currentResourceAmount >= craft.cost.amount) {
            set(
                produce((state: ResourceSlice) => {
                    state.resources[craft.cost.resource].amount -=
                        craft.cost.amount;
                })
            );
            get().addItem(get().crafts[id].result.item);
        }
    },
});
