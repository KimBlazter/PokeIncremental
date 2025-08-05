import { GameItemKey } from "@/data/items";
import type { Texture } from "@/utils/spriteLoader";

export type LootTable = {
    items: { id: GameItemKey; quantity: number }[];
    chance: number; // Percentage chance to drop this/those item/items
}[];

export type MobBase = {
    id: string;
    name: string;
    description: string;
    texture: Texture;
    displaySize: number;
    type:
        | "undead"
        | "beast"
        | "animal"
        | "arthropod"
        | "elemental"
        | "mythical"; // Type of mob for classification // TODO: To complete
    baseHp: number;
    baseAttack: number;
    baseDefense: number;
    baseAttackSpeed: number;
};

export type MobInstance = {
    id: string; // Unique identifier for the mob instance
    base: MobBase; // Reference to the base mob data
    level: number;
    hp: number; // Current health points of the mob
    attack: number; // Current attack power of the mob
    defense: number; // Current defense power of the mob
    attackSpeed: number; // Current attack speed of the mob
    lootTable?: LootTable; // List of items that can be dropped by this mob (percentage based loot table)
};

export type Zone = {
    id: string;
    name: string;
    mobs: {
        mob: MobBase;
        spawnChance: number; // Percentage chance to spawn this mob
        lootTable?: LootTable;
    }[];
};
