import { produce } from "immer";
import { StateCreator } from "zustand";
import { GameStore } from "./game";
import { SlotType } from "./equipments";

export type Item = {
    id: string;
    name: string;
    textureIdentifier?: string;
    equipmentSlot?: SlotType;
};

export type ToolType = "axe" | "pickaxe" | "shovel" | "sword" | "hoe";

export interface ItemSlice {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (item: Item) => void;
    useItem: (id: string) => void;
    hasItem: (id: string) => boolean;
}

export const createItemSlice: StateCreator<GameStore, [], [], ItemSlice> = (
    set,
    get
) => ({
    items: [],
    addItem: (item) =>
        set(
            produce((state: ItemSlice) => {
                state.items.push(item);
            })
        ),
    removeItem: (item: Item) =>
        set(
            produce((state: ItemSlice) => {
                const index = state.items.findIndex(
                    (curr) => curr.id === item.id
                );

                if (index !== -1) {
                    state.items.splice(index, 1);
                }
            })
        ),
    useItem: () => {},
    hasItem: (id) => get().items.some((item: Item) => item.id === id),
});
