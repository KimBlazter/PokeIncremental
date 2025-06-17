import { useGameStore } from "@/stores/game";
import { Item } from "@/stores/items";

export const GAME_ITEMS = {
    // WOOD AGE
    wooden_axe: {
        type: "tool",
        id: "wooden_axe",
        name: "Wooden Axe",
        textureIdentifier: "wooden_axe",
        equipmentSlot: "axe",
        toolType: "axe",
        miningSpeed: 1.3,
    },
    wooden_pickaxe: {
        type: "tool",
        id: "wooden_pickaxe",
        name: "Wooden Pickaxe",
        textureIdentifier: "wooden_pickaxe",
        equipmentSlot: "pickaxe",
        toolType: "pickaxe",
        miningSpeed: 1.3,
    },
    wooden_sword: {
        type: "weapon",
        id: "wooden_sword",
        name: "Wooden Sword",
        textureIdentifier: "wooden_sword",
        equipmentSlot: "sword",
        damage: 3,
    },
    campfire: {
        type: "generic",
        id: "campfire",
        name: "Campfire",
        textureIdentifier: "campfire",
    },
    shield: {
        type: "armor",
        id: "shield",
        name: "Shield",
        textureIdentifier: "shield",
        equipmentSlot: "shield",
        defense: 4,
    },
    backpack: {
        type: "generic",
        id: "backpack",
        name: "Backpack",
        textureIdentifier: "backpack",
    },
    log_pile: {
        type: "generic",
        id: "log_pile",
        name: "Log Pile",
        textureIdentifier: "log_pile",
    },
    rope: {
        type: "generic",
        id: "rope",
        name: "Rope",
        textureIdentifier: "string",
    },

    // STONE AGE
    stone_axe: {
        type: "tool",
        id: "stone_axe",
        name: "Stone Axe",
        textureIdentifier: "stone_axe",
        equipmentSlot: "axe",
        toolType: "axe",
        miningSpeed: 1.5,
    },
    stone_pickaxe: {
        type: "tool",
        id: "stone_pickaxe",
        name: "Stone Pickaxe",
        textureIdentifier: "stone_pickaxe",
        equipmentSlot: "pickaxe",
        toolType: "pickaxe",
        miningSpeed: 1.5,
    },
    stone_sword: {
        type: "weapon",
        id: "stone_sword",
        name: "Stone Sword",
        textureIdentifier: "stone_sword",
        equipmentSlot: "sword",
        damage: 5,
    },
    stone_furnace: {
        type: "generic",
        id: "stone_furnace",
        name: "Stone Furnace",
        textureIdentifier: "furnace",
    },
    grindstone: {
        type: "generic",
        id: "grindstone",
        name: "Grindstone",
        textureIdentifier: "grindstone",
    },
    stone_chest: {
        type: "generic",
        id: "stone_chest",
        name: "Stone Chest",
        textureIdentifier: "chest",
    },
    leather_boots: {
        type: "armor",
        id: "leather_boots",
        name: "Leather Boots",
        textureIdentifier: "leather_boots",
        equipmentSlot: "boots",
        defense: 1,
    },
    binding: {
        type: "generic",
        id: "binding",
        name: "Binding",
        textureIdentifier: "lead",
    },

    // Consumables
    watermelon: {
        type: "consumable",
        id: "watermelon",
        name: "Watermelon",
        textureIdentifier: "melon_slice",
        consumeOnUse: true,
        effect: () => {
            const durationMs = 10 * 1000; // 10s
            useGameStore.getState().addTimedBonus("wood", {
                baseGain: 10,
                source: "watermelon",
                expiresAt: new Date(Date.now() + durationMs).toISOString(),
            });
        },
    },
} satisfies Record<string, Item>;

export type GameItemKey = keyof typeof GAME_ITEMS;
