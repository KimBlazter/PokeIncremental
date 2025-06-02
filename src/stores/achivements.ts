import { produce } from "immer";
import { StateCreator } from "zustand";
import { GameStore } from "./game";
import { achievements } from "@/data/achievements";
import { useToastStore } from "./toast";

export type AchievementKey = keyof typeof achievements;

export type Achievement = {
    name: string;
    parentId?: string;
    texture_identifier: string; // image identifier
    condition: (gamestore: GameStore) => boolean;
    unlocked: boolean;
};

export interface AchievementSlice {
    achievements: Record<AchievementKey, Achievement>;
    unlockAchievement: (id: AchievementKey) => void;
    checkAchievements: () => void;
    unlockableAchievements: AchievementKey[];
    updateUnlockableAchievements: () => void;
}

export const createAchievementSlice: StateCreator<
    GameStore,
    [],
    [],
    AchievementSlice
> = (set, get) => ({
    achievements: achievements,
    unlockAchievement: (achievementId) =>
        set(
            produce((state: AchievementSlice) => {
                const ach = state.achievements[achievementId];

                // check achievement isn't already unlocked
                if (ach.unlocked) return;

                // Do nothing if parent is not unlocked
                if (
                    ach.parentId &&
                    !state.achievements[ach.parentId as AchievementKey].unlocked
                )
                    return;

                // Unlock achievement
                useToastStore.getState().addToast({
                    title: "Achivement Unlocked",
                    message: ach.name,
                    type: "achievement",
                    duration: 5000,
                });
                state.achievements[achievementId].unlocked = true;
            })
        ),
    checkAchievements: () => {
        get().unlockableAchievements.forEach((achievementKey) => {
            const achievement =
                get().achievements[achievementKey as AchievementKey];
            if (achievement.condition(get())) {
                get().unlockAchievement(achievementKey as AchievementKey);
                get().updateUnlockableAchievements();
                get().checkAchievements();
            }
        });
    },
    unlockableAchievements: [],
    updateUnlockableAchievements: () =>
        set(
            produce((state: AchievementSlice) => {
                state.unlockableAchievements = Object.keys(
                    state.achievements
                ).filter((key) => {
                    const ach = state.achievements[key as AchievementKey];
                    // Only consider achievements that aren't already unlocked
                    if (ach.unlocked) return false;

                    // If it has a parent, the parent must be unlocked
                    return (
                        !ach.parentId ||
                        state.achievements[ach.parentId as AchievementKey]
                            .unlocked
                    );
                }) as AchievementKey[];
            })
        ),
});
