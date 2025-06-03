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
    unequipItem: (slot: SlotType) => void;
}

export const createEquipmentsSlice: StateCreator<
    GameStore,
    [],
    [],
    EquipmentSlice
> = (set, get) => ({
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

    equipItem: (item) => {
        const itemSlot = item.equipmentSlot;
        if (!itemSlot) return;

        get().unequipItem(itemSlot); // unequip item if present
        get().removeItem(item); // Remove the item from the inventory

        // Equip the new item
        set(
            produce((state: GameStore) => {
                state.equipments[itemSlot] = item; // Place the item in the equipment slot
            })
        );
    },
    unequipItem: (slot: SlotType) => {
        if (get().equipments[slot]) {
            // unequip and add back to items
            get().addItem(get().equipments[slot]!);

            set(produce((state: GameStore) => (state.equipments[slot] = null))); // Remove the item from the slot
        }
    },
});
