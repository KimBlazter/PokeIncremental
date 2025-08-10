import { Age } from "@/stores/ages";

export const ages = {
    wood: {
        name: "Wood",
        unlocked: true,
        collectible: "wood",
        texture: "block:oak_log",
        splashScreenUrl: "/textures/splash-screens/wood-age-screen.png",
    },
    stone: {
        name: "Stone",
        unlocked: false,
        collectible: "cobblestone",
        texture: "block:stone",
        splashScreenUrl: "/textures/splash-screens/stone-age-screen.png",
    },
    iron: {
        name: "Iron",
        unlocked: false,
        collectible: "iron",
        texture: "block:iron_block",
    },
} satisfies Record<string, Age>;
