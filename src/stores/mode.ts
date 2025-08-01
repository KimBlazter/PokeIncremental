import { StateCreator } from "zustand";
import { GameStore } from "./game";
import { Texture } from "@/utils/spriteLoader";

export type Mode = {
    name: string;
    unlocked: boolean;
    icon?: Texture;
};

export type ModeKey = keyof typeof modes;

const modes: Record<string, Mode> = {
    mining: {
        name: "Mining",
        unlocked: true,
        icon: "item:stone_pickaxe", // Example icon, replace with actual texture
    },
    battles: {
        name: "Battles",
        unlocked: true,
        icon: "item:iron_sword", // Example icon, replace with actual texture
    },
    farming: {
        name: "Farming",
        unlocked: true,
        icon: "item:wooden_hoe", // Example icon, replace with actual texture
    },
};

export interface ModeSlice {
    currentMode: ModeKey;
    setCurrentMode: (mode: ModeKey) => void;
}

export const createModeSlice: StateCreator<GameStore, [], [], ModeSlice> = (
    set
) => ({
    currentMode: "mining", // Default mode
    setCurrentMode: (mode) =>
        set((state) => {
            if (modes[mode] && modes[mode].unlocked) {
                return { currentMode: mode };
            }
            console.warn(`Mode ${mode} is not unlocked.`);
            return state; // No change if mode is not unlocked
        }),
});
