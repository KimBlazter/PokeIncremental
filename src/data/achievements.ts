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
} satisfies Record<AchievementKeyType, Achievement>;

type AchievementKeyType = `${AgeKey}.${string}`;
