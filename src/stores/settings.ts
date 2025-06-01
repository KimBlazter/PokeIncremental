import { StateCreator } from "zustand";
import { produce } from "immer";
import { GameStore } from "./game";
import { hotkeys } from "@/data/settings";

export type HotkeySettings = Record<HotkeySettingsKeys, HotkeySettingsData>; // id to key ('mineCurrentResource' -> 'M')
export type HotkeySettingsKeys = keyof typeof hotkeys;
export type HotkeySettingsData = { hotkey: string; action: () => void };

export interface SettingsSlice {
    hotkeys: HotkeySettings;
    updateHotkey: (id: HotkeySettingsKeys, key: string) => void;
}

export const createSettingsSlice: StateCreator<
    GameStore,
    [],
    [],
    SettingsSlice
> = (set) => ({
    hotkeys: hotkeys,
    updateHotkey: (id: HotkeySettingsKeys, key: string) =>
        set(
            produce((state: GameStore) => {
                state.hotkeys[id].hotkey = key;
            })
        ),
});
