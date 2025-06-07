import { produce } from "immer";
import { StateCreator } from "zustand";
import { GameStore } from "./game";
import { SlotType } from "./equipments";

export type ToolType = "axe" | "pickaxe" | "shovel" | "hoe";

// Base Item Interface
// This interface defines the common properties for all items in the game.
export interface BaseItem {
    id: string;
    name: string;
    textureIdentifier?: string;
}

// Tool
export interface ToolItem extends BaseItem {
    type: "tool";
    toolType: ToolType;
    equipmentSlot?: SlotType;
    miningSpeed?: number; // optional mining speed, if applicable
}

// Weapon
export interface WeaponItem extends BaseItem {
    type: "weapon";
    damage: number; // damage dealt by the weapon
    attackSpeed?: number; // optional attack speed, if applicable
    equipmentSlot: SlotType;
}

// Armor
export interface ArmorItem extends BaseItem {
    type: "armor";
    defense: number;
    equipmentSlot: SlotType;
}

// Consumable
export interface ConsumableItem extends BaseItem {
    type: "consumable";
    effect: () => void; // function to apply the effect of the consumable
}

// Generic Item
export interface GenericItem extends BaseItem {
    type: "generic";
}

export type Item =
    | ToolItem
    | WeaponItem
    | ArmorItem
    | ConsumableItem
    | GenericItem;

export interface ItemSlice {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (item: Item) => void;
    useItem: (id: string) => void;
    hasItem: (id: string, amount?: number) => boolean;
}

export const createItemSlice: StateCreator<GameStore, [], [], ItemSlice> = (
    set,
    get
) => ({
    items: [],
    addItem: (item) => {
        set(
            produce((state: ItemSlice) => {
                state.items.push(item);
            })
        );
        get().checkAchievements();
    },
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
    hasItem: (id, amount?) => {
        const count = get().items.filter((item: Item) => item.id === id).length;
        return count >= (amount ?? 1);
    },
});
