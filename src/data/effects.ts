import { useGameStore } from "@/stores/game";

export type ItemEffect = {
    id: ItemEffectKeys;
    name: string;
    description: string;
    icon: string;
    duration?: number; // Duration in ms, if applicable
    value?: number;
};

type Effect = (value?: number, duration?: number) => void;

export type ItemEffectKeys = keyof typeof ITEM_EFFECTS;

export const ITEM_EFFECTS = {
    increaseWoodGain: (value = 1, duration = 5000) =>
        useGameStore.getState().addTimedBonus("wood", {
            baseGain: value,
            source: "item",
            expiresAt: new Date(Date.now() + duration).toISOString(),
        }),
} satisfies Record<string, Effect>;
