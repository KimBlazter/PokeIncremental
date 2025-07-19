import { useGameStore } from "@/stores/game";
import { ItemEffect } from "@/stores/items";

type Effect = (
    value?: number,
    duration?: number,
    effectMetadata?: ItemEffect
) => void;

export type EffectKey = keyof typeof EFFECTS;

export const EFFECTS = {
    increaseWoodGain: (
        value = 1,
        duration = 5000,
        effectMetadata = undefined
    ) =>
        useGameStore.getState().addTimedBonus("wood", {
            baseGain: value,
            source: "item",
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + duration).toISOString(),
            effectMetadata: effectMetadata,
        }),
} satisfies Record<string, Effect>;
