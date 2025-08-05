import { create } from "zustand";
import { createItemSlice, ItemSlice } from "./items";
import { createResourceSlice, ResourceSlice } from "./resources";
import { BonusSlice, createBonusSlice } from "./bonuses";
import { createUpgradeSlice, UpgradeSlice } from "./upgrades";
import { AgeSlice, createAgeSlice } from "./ages";
import { CraftSlice, createCraftSlice } from "./crafts";
import { AchievementSlice, createAchievementSlice } from "./achivements";
import { createSettingsSlice, SettingsSlice } from "./settings";
import { loadFromLocalStorage } from "@/utils/save";
import { createEquipmentsSlice, EquipmentSlice } from "./equipments";
import { createMiningSlice, MiningSlice } from "./mining";
import { createModeSlice, ModeSlice } from "./mode";
import { CombatSlice, createCombatSlice } from "./combat";

type GameStoreUtils = {
    init: () => void;
};

export type GameStore = GameStoreUtils &
    ItemSlice &
    ResourceSlice &
    BonusSlice &
    UpgradeSlice &
    AgeSlice &
    CraftSlice &
    AchievementSlice &
    EquipmentSlice &
    SettingsSlice &
    MiningSlice &
    ModeSlice &
    CombatSlice;

export const useGameStore = create<GameStore>((...a) => ({
    ...createItemSlice(...a),
    ...createResourceSlice(...a),
    ...createBonusSlice(...a),
    ...createUpgradeSlice(...a),
    ...createAgeSlice(...a),
    ...createCraftSlice(...a),
    ...createAchievementSlice(...a),
    ...createSettingsSlice(...a),
    ...createEquipmentsSlice(...a),
    ...createMiningSlice(...a),
    ...createModeSlice(...a),
    ...createCombatSlice(...a),
    init: () => {
        loadFromLocalStorage();
        a["1"]().updateUnlockableAchievements(); // a["1"] => useGameStore.get
    },
}));
