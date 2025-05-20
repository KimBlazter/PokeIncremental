import { Item } from "@/stores/items";

export type GameItemKey = keyof typeof GAME_ITEMS;

export const GAME_ITEMS = {
    wooden_axe: {
        id: "wooden_axe",
        name: "Wooden Axe",
        textureIdentifier: "wooden_axe",
    },
    stone_axe: {
        id: "stone_axe",
        name: "Stone Axe",
        textureIdentifier: "stone_axe",
    },
} satisfies Record<string, Item>;
