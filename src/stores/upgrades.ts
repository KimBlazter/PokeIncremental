import { StateCreator } from "zustand";
import { Resource } from "./resources";
import { produce } from "immer";
import { upgrades } from "@/data/upgrade";
import { GameStore } from "./game";
import { AgeKey } from "./ages";

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
    GameStore,
    [],
    [],
    UpgradeSlice
> = (set, get) => ({
    upgrades: upgrades(get),
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
