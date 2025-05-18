import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";

export interface Item {
    name: string;
    textureIdentifier?: string;
}

export type ToolType = "axe" | "pickaxe" | "shovel" | "sword" | "hoe";

interface Tool extends Item {
    type: ToolType;
}

export type Items = Record<string, Item>;

export interface ItemSlice {
    items: Items;
    addItem: (item: Item) => void;
    removeItem: (id: string) => void;
    useItem: (id: string) => void;
}

export const createItemSlice: StateCreator<ItemSlice, [], [], ItemSlice> = (
    set
) => ({
    items: {
        first: {
            name: "Wooden Axe",
            textureIdentifier: "wooden_axe",
        },
    },
    addItem: (item) =>
        set(
            produce((state: ItemSlice) => {
                state.items[uuidv4()] = item;
            })
        ),
    removeItem: () => {},
    useItem: () => {},
});
