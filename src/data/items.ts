import { Item } from "@/stores/items";

export const GAME_ITEMS = {
    // WOOD AGE
    wooden_axe: {
        id: "wooden_axe",
        name: "Wooden Axe",
        textureIdentifier: "wooden_axe",
        equipmentSlot: "axe",
    },
    wooden_pickaxe: {
        id: "wooden_pickaxe",
        name: "Wooden Pickaxe",
        textureIdentifier: "wooden_pickaxe",
        equipmentSlot: "pickaxe",
    },
    wooden_sword: {
        id: "wooden_sword",
        name: "Wooden Sword",
        textureIdentifier: "wooden_sword",
        equipmentSlot: "sword",
    },
    campfire: {
        id: "campfire",
        name: "Campfire",
        textureIdentifier: "campfire",
    },
    shield: {
        id: "shield",
        name: "Shield",
        textureIdentifier: "shield",
        equipmentSlot: "shield",
    },
    backpack: {
        id: "backpack",
        name: "Backpack",
        textureIdentifier: "backpack",
    },
    log_pile: {
        id: "log_pile",
        name: "Log Pile",
        textureIdentifier: "log_pile",
    },
    rope: {
        id: "rope",
        name: "Rope",
        textureIdentifier: "string",
    },

    // STONE AGE
    stone_axe: {
        id: "stone_axe",
        name: "Stone Axe",
        textureIdentifier: "stone_axe",
        equipmentSlot: "axe",
    },
    stone_pickaxe: {
        id: "stone_pickaxe",
        name: "Stone Pickaxe",
        textureIdentifier: "stone_pickaxe",
        equipmentSlot: "pickaxe",
    },
    stone_sword: {
        id: "stone_sword",
        name: "Stone Sword",
        textureIdentifier: "stone_sword",
        equipmentSlot: "sword",
    },
    stone_furnace: {
        id: "stone_furnace",
        name: "Stone Furnace",
        textureIdentifier: "furnace",
    },
    grindstone: {
        id: "grindstone",
        name: "Grindstone",
        textureIdentifier: "grindstone",
    },
    stone_chest: {
        id: "stone_chest",
        name: "Stone Chest",
        textureIdentifier: "chest",
    },
    leather_boots: {
        id: "leather_boots",
        name: "Leather Boots",
        textureIdentifier: "leather_boots",
        equipmentSlot: "boots",
    },
    binding: {
        id: "binding",
        name: "Binding",
        textureIdentifier: "lead",
    },
} satisfies Record<string, Item>;

export type GameItemKey = keyof typeof GAME_ITEMS;
