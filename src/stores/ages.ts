import { StateCreator } from "zustand";
import { produce } from "immer";

export type AgeKey = "wood" | "stone" | "iron" | "gold";

export type Age = {
    name: string;
    unlocked: boolean;
};

export type Ages = Record<AgeKey, Age>;

export interface AgeSlice {
    ages: Ages;
    unlockAge: (age: AgeKey) => void;
}

export const createAgeSlice: StateCreator<AgeSlice, [], [], AgeSlice> = (
    set
) => ({
    ages: {
        wood: {
            name: "Wood",
            unlocked: true,
        },
        stone: {
            name: "Stone",
            unlocked: false,
        },
        iron: {
            name: "Iron",
            unlocked: false,
        },
        gold: {
            name: "Gold",
            unlocked: false,
        },
    },
    unlockAge: (age) =>
        set(
            produce((state: AgeSlice) => {
                state.ages[age].unlocked = true;
            })
        ),
});
