import { StateCreator } from "zustand";
import { Resource } from "./resources";
import { Item } from "./items";
import { crafts } from "@/data/crafts";
import { GameStore } from "./game";

export interface Craft {
    result: { item: Item; qty: number };
    cost: {
        resources?: { material: Resource; amount: number }[];
        items?: string[];
    };
}

export interface CraftSlice {
    crafts: Record<string, Craft>;
    craft: (id: string) => void;
}

export const createCraftSlice: StateCreator<GameStore, [], [], CraftSlice> = (
    set,
    get
) => ({
    crafts: {
        // wooden_axe: {
        //     cost: {
        //         resources: [
        //             {
        //                 material: "wood",
        //                 amount: 10,
        //             },
        //         ],
        //         // items: ["wooden_axe"],
        //     },
        //     result: {
        //         item: {
        //             id: "wooden_axe",
        //             name: "Wooden axe",
        //             textureIdentifier: "wooden_axe",
        //         },
        //         qty: 1,
        //     },
        // },
    },
    craft: (id: string) => {
        const craft = get().crafts[id];

        console.log("Crafting...");

        const enoughResources =
            craft.cost.resources?.reduce((acc, { material, amount }) => {
                const currentResourceAmount = get().resources[material].amount;
                return acc && currentResourceAmount >= amount;
            }, true) ?? true;

        const enoughItems =
            craft.cost.items?.reduce((acc, itemName) => {
                return acc && get().hasItem(itemName);
            }, true) ?? true;

        if (!enoughItems || !enoughResources) return;

        // If can craft then remove all materials and items
        craft.cost.resources?.forEach(({ material, amount }) =>
            get().addResource(material, -amount)
        );

        craft.cost.items?.forEach((itemName) => get().removeItem(itemName));

        // add item
        get().addItem(get().crafts[id].result.item);
    },
});
