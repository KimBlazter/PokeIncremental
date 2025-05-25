import { create } from "zustand";
import { createItemSlice, ItemSlice } from "./items";
import { createResourceSlice, ResourceSlice } from "./resources";
import { createMultiplierSlice, MultiplierSlice } from "./multipliers";
import { createUpgradeSlice, UpgradeSlice } from "./upgrades";
import { AgeSlice, createAgeSlice } from "./ages";
import { CraftSlice, createCraftSlice } from "./crafts";
import { AchievementSlice, createAchievementSlice } from "./achivements";

type GameStoreUtils = {
    init: () => void;
};

export type GameStore = GameStoreUtils &
    ItemSlice &
    ResourceSlice &
    MultiplierSlice &
    UpgradeSlice &
    AgeSlice &
    CraftSlice &
    AchievementSlice;

export const useGameStore = create<GameStore>((...a) => ({
    ...createItemSlice(...a),
    ...createResourceSlice(...a),
    ...createMultiplierSlice(...a),
    ...createUpgradeSlice(...a),
    ...createAgeSlice(...a),
    ...createCraftSlice(...a),
    ...createAchievementSlice(...a),
    init: () => {
        a["1"]().updateUnlockables(); // a["1"] => useGameStore.get
    },
}));
