import { Achievement } from "@/stores/achivements";
import { AgeKey } from "@/stores/ages";

export const achievements = {
    "stone.stoner": {
        name: "Stoner",
        texture_identifier: "stone",
        condition: (gamestore) => gamestore.resources.cobblestone.amount >= 42,
        unlocked: false,
    },
    "iron.man_of_steel": {
        name: "Man of Steel",
        parentId: "stone.stoner",
        texture_identifier: "iron_nugget",
        condition: (gamestore) => gamestore.resources.iron.amount >= 100,
        unlocked: false,
    },
} satisfies Record<AchievementKeyType, Achievement>;

type AchievementKeyType = `${AgeKey}.${string}`;
