import { StateCreator } from "zustand";
import { produce } from "immer";
import { Resource } from "./resources";

export type AgeKey = "wood" | "stone" | "iron" | "gold";

export type Age = {
    name: string;
    unlocked: boolean;
    collectible: Resource;
};

export type Ages = Record<AgeKey, Age>;

export interface AgeSlice {
    ages: Ages;
    currentAge: AgeKey;
    setCurrentAge: (age: AgeKey) => void;
    unlockAge: (age: AgeKey) => void;
}

export const createAgeSlice: StateCreator<AgeSlice, [], [], AgeSlice> = (
    set
) => ({
    ages: {
        wood: {
            name: "Wood",
            unlocked: true,
            collectible: "wood",
        },
        stone: {
            name: "Stone",
            unlocked: false,
            collectible: "cobblestone",
        },
        iron: {
            name: "Iron",
            unlocked: false,
            collectible: "iron",
        },
        gold: {
            name: "Gold",
            unlocked: false,
            collectible: "gold",
        },
    },
    currentAge: "wood",
    unlockAge: (age) =>
        set(
            produce((state: AgeSlice) => {
                state.ages[age].unlocked = true;
            })
        ),
    setCurrentAge: (age) =>
        set(
            produce((state: AgeSlice) => {
                state.currentAge = age;
            })
        ),
});
