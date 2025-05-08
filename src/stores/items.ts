import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";
import { ResourceSlice } from "./resources";

export interface Item {
    name: string;
    texturePath?: string;
    stackable: boolean;
}

interface Tool extends Item {
    type: "axe" | "pickaxe" | "shovel" | "sword" | "hoe";
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
    items: {},
    addItem: (item) =>
        set((state) => ({
            items: {
                ...state.items,
                [uuidv4()]: item,
            },
        })),
    removeItem: () => {},
    useItem: () => {},
});
