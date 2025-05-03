import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export interface Item {
    name: string;
    texturePath?: string;
    stackable: boolean;
}

interface Tool extends Item {
    type: "axe" | "pickaxe" | "shovel" | "sword" | "hoe";
}

export type Items = Record<string, Item>;

type ItemState = {
    items: Items;
    add: (item: Item) => void;
    remove: (id: string) => void;
    use: (id: string) => void;
};

export const useItemStore = create<ItemState>((set) => ({
    items: {
        "0": {
            name: "Wooden Axe",
            stackable: false,
            type: "axe",
        },
        "1": {
            name: "Wooden Sword",
            stackable: false,
            type: "sword",
        },
    },
    add: (item) =>
        set((state) => ({
            items: {
                ...state.items,
                [uuidv4()]: item,
            },
        })),
    remove: () => {},
    use: () => {},
}));
