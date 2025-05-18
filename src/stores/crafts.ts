import { StateCreator } from "zustand";
import { Resource, ResourceSlice } from "./resources";
import { produce } from "immer";
import { Item } from "./items";
import { crafts } from "@/data/crafts";
import { GameStore } from "./game";

export interface Craft {
    result: { item: Item; qty: number };
    cost: [{ material: Resource; amount: number }];
}

export interface CraftSlice {
    crafts: Record<string, Craft>;
    craft: (id: string) => void;
}

export const createCraftSlice: StateCreator<GameStore, [], [], CraftSlice> = (
    set,
    get
) => ({
    crafts: crafts,
    craft: (id: string) => {
        const craft = get().crafts[id];

        craft.cost.forEach(({ material, amount }) => {
            const currentResourceAmount = get().resources[material].amount;

            // Remove cost
            if (currentResourceAmount < amount) return;

            set(
                produce((state: ResourceSlice) => {
                    state.resources[material].amount -= amount;
                })
            );
        });

        // add item
        get().addItem(get().crafts[id].result.item);
    },
});
