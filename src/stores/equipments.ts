import { StateCreator } from "zustand";
import { produce } from "immer";
import { GameStore } from "./game";
import { Item } from "./items";

export type SlotType =
    | "sword"
    | "axe"
    | "pickaxe"
    | "shovel"
    | "hoe"
    | "shield"
    | "helmet"
    | "chestplate"
    | "leggings"
    | "boots";

export type EquipmentData = Item | null;

export type Equiments = Record<SlotType, EquipmentData>;

export interface EquipmentSlice {
    equipments: Equiments;
    equipItem: (item: Item) => void;
}

export const createEquipmentsSlice: StateCreator<
    GameStore,
    [],
    [],
    EquipmentSlice
> = (set) => ({
    equipments: {
        sword: null,
        axe: null,
        pickaxe: null,
        shovel: null,
        hoe: null,
        shield: null,
        helmet: null,
        chestplate: null,
        leggings: null,
        boots: null,
    },

    equipItem: (item) =>
        set(
            produce((state: GameStore) => {
                const itemSlot = item.equipmentSlot;
                if (!itemSlot) return;
                if (state.equipments[itemSlot]) {
                    // If there's already an item in this slot, unequip it
                    state.addItem(state.equipments[itemSlot]);
                    state.equipments[itemSlot] = null; // Remove the item from the slot
                }
                // Equip the new item
                state.removeItem(item.id); // Remove the item from the inventory
                state.equipments[itemSlot] = item; // Place the item in the equipment slot
            })
        ),
});
