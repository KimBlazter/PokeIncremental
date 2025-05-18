import { StateCreator } from "zustand";
import { Resource, ResourceSlice } from "./resources";
import { MultiplierSlice } from "./multipliers";
import { produce } from "immer";
import { AgeKey, AgeSlice } from "./ages";

export interface Upgrade {
    name: string;
    description?: string;
    cost: { resource: Resource; amount: number };
    unlocked: boolean;
    effect: () => void;
    ageRequirement?: AgeKey;
}

export interface UpgradeSlice {
    upgrades: Record<string, Upgrade>;
    unlockUpgrade: (id: string) => void;
}

export const createUpgradeSlice: StateCreator<
    UpgradeSlice & MultiplierSlice & ResourceSlice & AgeSlice,
    [],
    [],
    UpgradeSlice
> = (set, get) => ({
    upgrades: {
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
        "unlock.iron": {
            name: "Harder than ever",
            description: "Unlock the Iron Age",
            cost: { resource: "cobblestone", amount: 20 },
            effect: () => get().unlockAge("iron"),
            unlocked: false,
            ageRequirement: "stone",
        },
    },
    unlockUpgrade: (upgradeId) => {
        if (
            get().resources[get().upgrades[upgradeId].cost.resource].amount <
            get().upgrades[upgradeId].cost.amount
        )
            return;
        get().addResource(
            get().upgrades[upgradeId].cost.resource,
            -get().upgrades[upgradeId].cost.amount
        );
        get().upgrades[upgradeId].effect();
        // set the upgrade to unlocked
        set(
            produce((state: UpgradeSlice) => {
                state.upgrades[upgradeId].unlocked = true;
            })
        );
    },
});
