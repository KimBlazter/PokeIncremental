import { produce } from "immer";
import { StateCreator } from "zustand";
import { GameStore } from "./game";
import { SlotType } from "./equipments";
import { type EffectKey, EFFECTS } from "@/data/effects";
import { Texture } from "@/utils/spriteLoader";

export type ToolType = "axe" | "pickaxe" | "shovel" | "hoe";

export type ItemEffect = {
    id: EffectKey;
    name: string;
    description: string;
    icon: Texture;
    duration?: number; // Duration in ms, if applicable
    value?: number;
};

// Base Item Interface
// This interface defines the common properties for all items in the game.
export interface BaseItem {
    id: string;
    name: string;
    description?: string;
    texture: Texture;
    stackable: boolean;
    quantity?: number; // Optional quantity for stackable items
}

// Tool
export interface ToolItem extends BaseItem {
    type: "tool";
    toolType: ToolType;
    equipmentSlot?: SlotType;
    damage: number; // Damage dealt by the tool
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
    consumeOnUse?: boolean; // whether the item is consumed on use
    effect: ItemEffect;
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
    addItem: (item: Item, quantity?: number) => void;
    removeItem: (item: Item) => void;
    useItem: (item: Item) => void;
    hasItem: (id: string, amount?: number) => boolean;
}

export const createItemSlice: StateCreator<GameStore, [], [], ItemSlice> = (
    set,
    get
) => ({
    items: [],
    addItem: (item, qty = 1) => {
        set(
            produce((state: ItemSlice) => {
                // Check if the item is stackable
                if (!item.stackable) {
                    state.items.push(item);
                } else {
                    // If not stackable, add a new item instance
                    const existing = state.items.find((i) => i.id === item.id);
                    if (existing) {
                        existing.quantity = (existing.quantity || 0) + qty;
                        return; // Exit early if item already exists
                    }
                    // Otherwise, add a new item instance
                    item = { ...item, quantity: qty }; // Ensure quantity is set
                    state.items.push(item);
                }
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
    useItem: (item) => {
        switch (item.type) {
            case "armor":
            case "tool":
            case "weapon":
                get().equipItem(item);
                break;
            case "consumable":
                // Call the effect function
                EFFECTS[item.effect.id](
                    item.effect.value,
                    item.effect.duration,
                    item.effect
                );
                if (item.consumeOnUse) {
                    get().removeItem(item);
                }
                break;
            default:
                console.log("[INFO] Unusable item");
        }
    },
    hasItem: (id, amount?) => {
        const count = get().items.filter((item: Item) => item.id === id).length;
        return count >= (amount ?? 1);
    },
});
