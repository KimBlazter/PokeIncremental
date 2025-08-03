import { StateCreator } from "zustand";
import { Resource } from "./resources";
import { Item } from "./items";
import { crafts } from "@/data/crafts";
import { GameStore } from "./game";
import { GAME_ITEMS, GameItemKey } from "@/data/items";

export interface Craft {
    result: { item: Item; qty: number };
    cost: {
        resources?: { material: Resource; amount: number }[];
        items?: { key: GameItemKey; amount?: number }[];
    };
}

export type CraftKey = keyof typeof crafts;

export interface CraftSlice {
    crafts: Record<keyof typeof crafts, Craft>;
    craft: (id: CraftKey) => void;
}

export const createCraftSlice: StateCreator<GameStore, [], [], CraftSlice> = (
    _set,
    get
) => ({
    crafts: crafts,
    craft: (id) => {
        const craft = get().crafts[id];

        const enoughResources =
            craft.cost.resources?.reduce((acc, { material, amount }) => {
                const currentResourceAmount = get().resources[material].amount;
                return acc && currentResourceAmount >= amount;
            }, true) ?? true;

        const enoughItems =
            craft.cost.items?.reduce((acc, item) => {
                return acc && get().hasItem(item.key, item.amount);
            }, true) ?? true;

        if (!enoughItems || !enoughResources) return;

        // If can craft then remove all materials and items
        craft.cost.resources?.forEach(({ material, amount }) =>
            get().updateResource(material, -amount)
        );

        craft.cost.items?.forEach(
            (itemName) => get().removeItem({ ...GAME_ITEMS[itemName.key] }) // create fake item to remove it from inventory
        );

        // add item
        get().addItem(get().crafts[id].result.item);
    },
});
