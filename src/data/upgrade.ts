import { GameStore } from "@/stores/game";
import { Upgrade } from "@/stores/upgrades";

export const upgrades = (get: () => GameStore): Record<string, Upgrade> => {
    return {
        /*
    WOOD AGE
    */
        "upgrade.wood.0": {
            name: "Big Biceps",
            description: "wood +1",
            cost: { resource: "wood", amount: 10 },
            effect: () => get().updateMultiplier("wood", (prev) => prev + 1),
            unlocked: false,
        },
        "unlock.stone": {
            name: "Ready to get high",
            description: "Unlock the Stone Age",
            cost: { resource: "wood", amount: 10 },
            effect: () => get().unlockAge("stone"),
            unlocked: false,
        },

        /*
    STONE AGE
    */
        "unlock.iron": {
            name: "Harder than ever",
            description: "Unlock the Iron Age",
            cost: { resource: "cobblestone", amount: 20 },
            effect: () => get().unlockAge("iron"),
            unlocked: false,
            ageRequirement: "stone",
        },
    };
};
