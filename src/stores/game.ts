import { create } from "zustand";
import { createItemSlice, ItemSlice } from "./items";
import { createResourceSlice, ResourceSlice } from "./resources";
import { createMultiplierSlice, MultiplierSlice } from "./multipliers";
import { createUpgradeSlice, UpgradeSlice } from "./upgrades";
import { AgeSlice, createAgeSlice } from "./ages";
import { CraftSlice, createCraftSlice } from "./crafts";

export type GameStore = ItemSlice &
    ResourceSlice &
    MultiplierSlice &
    UpgradeSlice &
    AgeSlice &
    CraftSlice;

export const useGameStore = create<GameStore>((...a) => ({
    ...createItemSlice(...a),
    ...createResourceSlice(...a),
    ...createMultiplierSlice(...a),
    ...createUpgradeSlice(...a),
    ...createAgeSlice(...a),
    ...createCraftSlice(...a),
}));
