import { StateCreator } from "zustand";
import { produce } from "immer";
import { Resource } from "./resources";
import { ages } from "@/data/ages";
import { GameStore } from "./game";
import { Texture } from "@/utils/spriteLoader";

export type AgeKey = keyof typeof ages;

export type Age = {
    name: string;
    unlocked: boolean;
    collectible: Resource;
    texture?: Texture;
    splashScreenUrl?: string;
};

export interface AgeSlice {
    ages: Record<AgeKey, Age>;
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
