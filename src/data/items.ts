import { Item } from "@/stores/items";

export const GAME_ITEMS = {
    // WOOD AGE
    wooden_axe: {
        type: "tool",
        id: "wooden_axe",
        name: "Wooden Axe",
        texture: "item:wooden_axe",
        equipmentSlot: "axe",
        toolType: "axe",
        miningSpeed: 1.3,
    },
    wooden_pickaxe: {
        type: "tool",
        id: "wooden_pickaxe",
        name: "Wooden Pickaxe",
        texture: "item:wooden_pickaxe",
        equipmentSlot: "pickaxe",
        toolType: "pickaxe",
        miningSpeed: 1.3,
    },
    wooden_sword: {
        type: "weapon",
        id: "wooden_sword",
        name: "Wooden Sword",
        texture: "item:wooden_sword",
        equipmentSlot: "sword",
        damage: 3,
    },
    campfire: {
        type: "generic",
        id: "campfire",
        name: "Campfire",
        texture: "item:campfire",
    },
    shield: {
        type: "armor",
        id: "shield",
        name: "Shield",
        texture: {
            base: "block:grass_block",
            tint: "#7cbd6b", // minecraft grass color
        },
        equipmentSlot: "shield",
        defense: 4,
    },
    backpack: {
        type: "generic",
        id: "backpack",
        name: "Backpack",
        texture: "item:bundle",
    },
    log_pile: {
        type: "generic",
        id: "log_pile",
        name: "Log Pile",
        texture: "block:stripped_oak_log",
    },
    rope: {
        type: "generic",
        id: "rope",
        name: "Rope",
        texture: "item:string",
    },

    // STONE AGE
    stone_axe: {
        type: "tool",
        id: "stone_axe",
        name: "Stone Axe",
        texture: "item:stone_axe",
        equipmentSlot: "axe",
        toolType: "axe",
        miningSpeed: 1.5,
    },
    stone_pickaxe: {
        type: "tool",
        id: "stone_pickaxe",
        name: "Stone Pickaxe",
        texture: "item:stone_pickaxe",
        equipmentSlot: "pickaxe",
        toolType: "pickaxe",
        miningSpeed: 1.5,
    },
    stone_sword: {
        type: "weapon",
        id: "stone_sword",
        name: "Stone Sword",
        texture: "item:stone_sword",
        equipmentSlot: "sword",
        damage: 5,
    },
    stone_furnace: {
        type: "generic",
        id: "stone_furnace",
        name: "Stone Furnace",
        texture: "block:furnace",
    },
    grindstone: {
        type: "generic",
        id: "grindstone",
        name: "Grindstone",
        texture: "block:grindstone",
    },
    stone_chest: {
        type: "generic",
        id: "stone_chest",
        name: "Stone Chest",
        texture: "item:barrier",
    },
    leather_boots: {
        type: "armor",
        id: "leather_boots",
        name: "Leather Boots",
        texture: {
            base: "item:leather_boots",
            tint: "#955e3b",
            overlay: {
                base: "item:leather_boots_overlay",
            },
        },
        equipmentSlot: "boots",
        defense: 1,
    },
    binding: {
        type: "generic",
        id: "binding",
        name: "Binding",
        texture: "item:lead",
    },

    // Consumables
    watermelon: {
        type: "consumable",
        id: "watermelon",
        name: "Watermelon",
        texture: "item:melon_slice",
        consumeOnUse: true,
        effect: {
            id: "increaseWoodGain",
            name: "???",
            description: "Increases wood gain for a short time.",
            icon: "melon_slice",
            duration: 5000, // 5 seconds
            value: 1, // Increase wood gain by 1
        },
    },
} satisfies Record<string, Item>;

export type GameItemKey = keyof typeof GAME_ITEMS;
