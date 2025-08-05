import { Achievement } from "@/stores/achivements";
import { AgeKey } from "@/stores/ages";

export const achievements = {
    "wood.how_many_more": {
        name: "How many more ???",
        texture: "item:wooden_axe",
        hint: "Craft way to much items",
        description: "Have 4 Wooden Axe in your inventory",
        condition: (gamestore) =>
            gamestore.items.filter((item) => item.id === "wooden_axe").length >=
            4,
        unlocked: false,
    },
    "wood.wooden_pickaxe": {
        name: "Wooden Pickaxe",
        parentId: "wood.how_many_more",
        texture: "item:wooden_pickaxe",
        hint: "We need stone for the furnace",
        description: "Have 1 Wooden Pickaxe in your inventory",
        condition: (gamestore) =>
            gamestore.items.filter((item) => item.id === "wooden_pickaxe")
                .length >= 1,
        unlocked: false,
    },
    "wood.second_wooden_pickaxe": {
        name: "Second Wooden Pickaxe",
        parentId: "wood.how_many_more",
        texture: "item:wooden_pickaxe",
        hint: "We need stone for the furnace",
        description: "Have 2 Wooden Pickaxe in your inventory",
        condition: (gamestore) =>
            gamestore.items.filter((item) => item.id === "wooden_pickaxe")
                .length >= 2,
        unlocked: false,
    },
    "wood.first_sword": {
        parentId: "wood.wooden_pickaxe",
        name: "First Sword",
        texture: "item:wooden_sword",
        hint: "We need a sword to fight",
        description: "Have 1 Wooden Sword in your inventory",
        condition: (gamestore) =>
            gamestore.items.filter((item) => item.id === "wooden_sword")
                .length >= 1,
        unlocked: false,
    },
    "wood.second_sword": {
        parentId: "wood.wooden_pickaxe",
        name: "Second Sword",
        texture: "item:wooden_sword",
        hint: "We need a sword to fight",
        description: "Have 2 Wooden Sword in your inventory",
        condition: (gamestore) =>
            gamestore.items.filter((item) => item.id === "wooden_sword")
                .length >= 2,
        unlocked: false,
    },
    "wood.third_sword": {
        parentId: "wood.wooden_pickaxe",
        name: "Third Sword",
        texture: "item:wooden_sword",
        hint: "We need a sword to fight",
        description: "Have 3 Wooden Sword in your inventory",
        condition: (gamestore) =>
            gamestore.items.filter((item) => item.id === "wooden_sword")
                .length >= 3,
        unlocked: false,
    },
    "stone.stoner": {
        name: "Stoner",
        texture: "block:stone",
        hint: "Keep mining...",
        description: "Have 42 cobblestone or more",
        condition: (gamestore) => gamestore.resources.cobblestone.amount >= 42,
        unlocked: false,
    },
    "iron.man_of_steel": {
        name: "Man of Steel",
        parentId: "stone.stoner",
        hint: "We need iron for the golem",
        description: "Have 100 iron or more",
        texture: "item:iron_nugget",
        condition: (gamestore) => gamestore.resources.iron.amount >= 100,
        unlocked: false,
    },
    "iron.iron_golem": {
        name: "Iron Golem",
        parentId: "iron.man_of_steel",
        hint: "We need a pumpkin for the golem",
        description: "Have 1 iron golem in your world",
        texture: "block:iron_block",
        condition: (gamestore) => gamestore.resources.iron.amount >= 10000,
        unlocked: false,
    },
    "iron.iron_pickaxe": {
        name: "Iron Pickaxe",
        parentId: "iron.man_of_steel",
        hint: "We need iron for the pickaxe",
        description: "Have 1 iron pickaxe in your world",
        texture: "item:iron_pickaxe",
        condition: (gamestore) => gamestore.resources.iron.amount >= 500,
        unlocked: false,
    },
} satisfies Record<AchievementKeyType, Achievement>;

type AchievementKeyType = `${AgeKey}.${string}`;
