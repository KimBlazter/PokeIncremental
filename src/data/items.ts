import { Item } from "@/stores/items";

export const GAME_ITEMS = {
    // WOOD AGE
    oak_log: {
        type: "generic",
        id: "oak_log",
        name: "Oak Log",
        description: "A sturdy log from an oak tree, used for crafting.",
        texture: "block:oak_log",
        stackable: true,
    },
    wooden_axe: {
        type: "tool",
        id: "wooden_axe",
        name: "Wooden Axe",
        texture: "item:wooden_axe",
        stackable: false,
        equipmentSlot: "axe",
        toolType: "axe",
        damage: 20,
    },
    wooden_pickaxe: {
        type: "tool",
        id: "wooden_pickaxe",
        name: "Wooden Pickaxe",
        texture: "item:wooden_pickaxe",
        stackable: false,
        equipmentSlot: "pickaxe",
        toolType: "pickaxe",
        damage: 35,
    },
    wooden_sword: {
        type: "weapon",
        id: "wooden_sword",
        name: "Wooden Sword",
        texture: "item:wooden_sword",
        stackable: false,
        equipmentSlot: "sword",
        damage: 3,
        attackSpeed: 1,
    },
    campfire: {
        type: "generic",
        id: "campfire",
        name: "Campfire",
        texture: "item:campfire",
        stackable: true,
    },
    shield: {
        type: "armor",
        id: "shield",
        name: "Shield",
        texture: "item:shield",
        stackable: false,
        equipmentSlot: "shield",
        defense: 4,
    },
    backpack: {
        type: "generic",
        id: "backpack",
        name: "Backpack",
        texture: "item:bundle",
        stackable: false,
    },
    log_pile: {
        type: "generic",
        id: "log_pile",
        name: "Log Pile",
        texture: "block:log_pile",
        stackable: true,
    },
    rope: {
        type: "generic",
        id: "rope",
        name: "Rope",
        texture: "item:string",
        stackable: true,
    },

    // STONE AGE
    stone: {
        type: "generic",
        id: "stone",
        name: "Stone",
        texture: "block:stone",
        stackable: true,
    },
    stone_axe: {
        type: "tool",
        id: "stone_axe",
        name: "Stone Axe",
        texture: "item:stone_axe",
        stackable: false,
        equipmentSlot: "axe",
        toolType: "axe",
        damage: 50,
    },
    stone_pickaxe: {
        type: "tool",
        id: "stone_pickaxe",
        name: "Stone Pickaxe",
        texture: "item:stone_pickaxe",
        stackable: false,
        equipmentSlot: "pickaxe",
        toolType: "pickaxe",
        damage: 50,
    },
    stone_sword: {
        type: "weapon",
        id: "stone_sword",
        name: "Stone Sword",
        texture: "item:stone_sword",
        stackable: false,
        equipmentSlot: "sword",
        damage: 5,
    },
    stone_furnace: {
        type: "generic",
        id: "stone_furnace",
        name: "Stone Furnace",
        texture: "block:furnace",
        stackable: true,
    },
    grindstone: {
        type: "generic",
        id: "grindstone",
        name: "Grindstone",
        texture: "block:grindstone",
        stackable: true,
    },
    stone_chest: {
        type: "generic",
        id: "stone_chest",
        name: "Stone Chest",
        texture: "block:chest_block",
        stackable: true,
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
        stackable: false,
        equipmentSlot: "boots",
        defense: 1,
    },
    binding: {
        type: "generic",
        id: "binding",
        name: "Binding",
        texture: "item:lead",
        stackable: true,
    },

    // IRON AGE
    iron_ore: {
        type: "generic",
        id: "iron_ore",
        name: "Iron Ore",
        texture: "block:iron_ore",
        stackable: true,
    },

    // GOLD AGE
    gold_ore: {
        type: "generic",
        id: "gold_ore",
        name: "Gold Ore",
        texture: "block:gold_ore",
        stackable: true,
    },

    // Consumables
    watermelon: {
        type: "consumable",
        id: "watermelon",
        name: "Watermelon",
        texture: "item:melon_slice",
        stackable: true,
        consumeOnUse: true,
        effect: {
            id: "increaseWoodGain",
            name: "Lumber Frenzy",
            description: "Increases wood gain for a short time.",
            icon: "item:melon_slice",
            duration: 5000, // 5 seconds
            value: 1, // Increase wood gain by 1
        },
    },
} satisfies Record<string, Item>;

export type GameItemKey = keyof typeof GAME_ITEMS;
