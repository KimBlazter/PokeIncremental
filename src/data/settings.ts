import { useGameStore } from "@/stores/game";
import { HotkeySettingsData } from "@/stores/settings";
import { exportSave, saveToLocalStorage } from "@/utils/save";

export const hotkeys = {
    mineCurrent: {
        hotkey: "M",
        action: () => {
            const gameStore = useGameStore.getState();
            const resource = gameStore.ages[gameStore.currentAge].collectible;
            const multiplier = gameStore.multiplier[resource];
            gameStore.addResource(resource, multiplier);
        },
    },
    openAchievements: {
        hotkey: "A",
        action: () =>
            document.getElementById("open-achievements-button")?.click(),
    },
    saveGame: {
        hotkey: "S",
        action: () => {
            saveToLocalStorage();
        },
    },
    openSettings: {
        hotkey: "P",
        action: () => document.getElementById("open-settings-button")?.click(),
    },
} satisfies Record<string, HotkeySettingsData>;
