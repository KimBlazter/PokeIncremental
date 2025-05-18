import { StateCreator } from "zustand";
import { produce } from "immer";
import { Resource } from "./resources";
import { ages } from "@/data/ages";
import { GameStore } from "./game";

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

export const createAgeSlice: StateCreator<GameStore, [], [], AgeSlice> = (
    set
) => ({
    ages: ages,
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
