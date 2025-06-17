import { useGameStore } from "@/stores/game";
import { useModalStore } from "@/stores/modals";
import { HotkeySettingsData } from "@/stores/settings";
import { saveToLocalStorage } from "@/utils/save";

export const hotkeys = {
    mineCurrent: {
        hotkey: "M",
        action: () => {
            const gameStore = useGameStore.getState();
            const resource = gameStore.ages[gameStore.currentAge].collectible;
            const multiplier = gameStore.computeResourcesYield(resource);
            gameStore.addResource(resource, multiplier);
        },
    },
    openAchievements: {
        hotkey: "A",
        action: () => useModalStore.getState().toggle("achievements-modal"),
    },
    saveGame: {
        hotkey: "S",
        action: () => {
            saveToLocalStorage();
        },
    },
    openSettings: {
        hotkey: "P",
        action: () => useModalStore.getState().toggle("settings-modal"),
    },
} satisfies Record<string, HotkeySettingsData>;
