import { create } from "zustand";
import { createItemSlice, ItemSlice } from "./items";
import { createResourceSlice, ResourceSlice } from "./resources";
import { createMultiplierSlice, MultiplierSlice } from "./multipliers";
import { createUpgradeSlice, UpgradeSlice } from "./upgrades";

type GameStore = ItemSlice & ResourceSlice & MultiplierSlice & UpgradeSlice;

export const useGameStore = create<GameStore>((...a) => ({
    ...createItemSlice(...a),
    ...createResourceSlice(...a),
    ...createMultiplierSlice(...a),
    ...createUpgradeSlice(...a),
}));
