import { create } from "zustand";
import { createItemSlice, ItemSlice } from "./items";
import { createResourceSlice, ResourceSlice } from "./resources";

export const useGameStore = create<ItemSlice & ResourceSlice>((...a) => ({
    ...createItemSlice(...a),
    ...createResourceSlice(...a),
}));
