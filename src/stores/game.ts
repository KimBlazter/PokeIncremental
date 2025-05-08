import { create } from "zustand";
import { createItemSlice, ItemSlice } from "./items";
import { createResourceSlice, ResourceSlice } from "./resources";
import { createMultiplierSlice, MultiplierSlice } from "./multipliers";

export const useGameStore = create<ItemSlice & ResourceSlice & MultiplierSlice>(
    (...a) => ({
        ...createItemSlice(...a),
        ...createResourceSlice(...a),
        ...createMultiplierSlice(...a),
    })
);
