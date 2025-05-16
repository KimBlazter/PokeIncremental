import { StateCreator } from "zustand";
import { Resource, ResourceSlice } from "./resources";
import { MultiplierSlice } from "./multipliers";
import { produce } from "immer";

export interface Upgrade {
    name: string;
    description?: string;
    cost: { ressource: Resource; amount: number };
    unlocked: boolean;
    effect: () => void;
}

export interface UpgradeSlice {
    upgrades: Record<string, Upgrade>;
    unlockUpgrade: (id: string) => void;
}

export const createUpgradeSlice: StateCreator<
    UpgradeSlice & MultiplierSlice & ResourceSlice,
    [],
    [],
    UpgradeSlice
> = (set, get) => ({
    upgrades: {
        "0": {
            name: "Big Biceps",
            description: "wood +1",
            cost: { ressource: "wood", amount: 10 },
            effect: () => get().updateMultiplier("wood", (prev) => prev + 1),
            unlocked: false,
        },
    },
    unlockUpgrade: (upgradeId) => {
        if (
            get().resources[get().upgrades[upgradeId].cost.ressource].amount <
            get().upgrades[upgradeId].cost.amount
        )
            return;
        get().addResource(
            get().upgrades[upgradeId].cost.ressource,
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
