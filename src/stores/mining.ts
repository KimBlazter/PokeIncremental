import { StateCreator } from "zustand";
import { Resource } from "./resources";
import { GameStore } from "./game";
import { resources } from "@/data/resources";
import { produce } from "immer";

type MiningData = {
    current_hp: number; // Current health of the mining resource
};

const BARE_HANDS_DAMAGE = 10; // Base damage dealt by bare hands

export interface MiningSlice {
    miningResources: Record<Resource, MiningData>;
    mineResource: (resource: Resource) => {
        damageDealt: number;
        critical: boolean;
        broken: boolean;
    };
}

export const createMiningSlice: StateCreator<GameStore, [], [], MiningSlice> = (
    set,
    get
) => ({
    miningResources: Object.keys(resources).reduce(
        (acc, resource) => {
            acc[resource as Resource] = {
                current_hp: resources[resource as Resource].hp, // Initialize with the resource's initial hp
            };
            return acc;
        },
        {} as Record<Resource, MiningData>
    ),
    mineResource: (resource) => {
        let damageDealt = 0;
        let critical = false;
        let broken = false;

        set(
            produce((state: GameStore) => {
                const current = state.miningResources[resource];
                let damage = 0;

                const currentTool =
                    state.equipments[
                        state.resources[resource].effective_tool
                    ] ?? null;

                if (currentTool?.type === "tool") {
                    damage += currentTool.damage; // Add tool damage if applicable
                } else {
                    damage += BARE_HANDS_DAMAGE;
                }

                const isCritical = Math.random() < 0.05; // 5% chance for a critical hit
                if (isCritical) {
                    critical = true;
                    damage *= 2; // Double the damage for a critical hit
                }

                damageDealt = damage;

                const new_hp = current.current_hp - damage;
                state.miningResources[resource].current_hp = Math.max(
                    new_hp,
                    0
                );
            })
        );

        // If the resource's hp reaches 0, add it to the player's resources and reset its hp
        if (get().miningResources[resource].current_hp <= 0) {
            broken = true;
            const gain = get().computeResourcesYield(resource);
            get().addResource(resource, gain);
            set(
                produce((state: GameStore) => {
                    state.miningResources[resource].current_hp =
                        resources[resource].hp; // Reset hp to initial value
                })
            );
        }

        return {
            damageDealt,
            critical,
            broken,
        };
    },
});
