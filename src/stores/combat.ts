import { StateCreator } from "zustand";
import { produce } from "immer";
import { GameStore } from "./game";
import type { LootTable, MobBase, MobInstance, Zone } from "@/types/mobs";
import { ZONES } from "@/data/mobs";
import { GAME_ITEMS } from "@/data/items";

type CombatState = {
    playerHp: number;
    maxPlayerHp: number;
    currentOpponent: MobInstance | null;
    opponentHp: number;
    currentZone: Zone | null;
    zones: Zone[];
    isAutoCombat: boolean;
    lastAttackTime: number;
    playerAttackSpeed: number; // attacks per second
    lastOpponentAttackTime: number;
};

export interface CombatSlice {
    combat: CombatState;
    selectZone: (zoneId: string) => void;
    startCombat: () => void;
    attackOpponent: () => { damageDealt: number; killed: boolean };
    tickCombat: () => void;
    toggleAutoCombat: () => void;
}

export const createCombatSlice: StateCreator<GameStore, [], [], CombatSlice> = (
    set,
    get
) => ({
    combat: {
        playerHp: 100,
        maxPlayerHp: 100,
        currentOpponent: null,
        opponentHp: 0,
        currentZone: null,
        zones: ZONES,
        isAutoCombat: false,
        lastAttackTime: 0,
        playerAttackSpeed: 1, // 1 attack per second by default
        lastOpponentAttackTime: 0,
    },

    selectZone: (zoneId) => {
        const zone = get().combat.zones.find((z) => z.id === zoneId) ?? null;
        set(
            produce((state: GameStore) => {
                state.combat.currentZone = zone;
            })
        );
        get().startCombat(); // Automatically start combat when a zone is selected
    },

    startCombat: () => {
        const zone = get().combat.currentZone;
        if (!zone) return;

        // Pick a mob based on spawnChance
        const rand = Math.random() * 100;
        let total = 0;
        let selected: {
            mob: MobBase;
            spawnChance: number;
            lootTable?: LootTable;
        } | null = null;
        for (const entry of zone.mobs) {
            total += entry.spawnChance;
            if (rand <= total) {
                selected = entry;
                break;
            }
        }

        if (selected) {
            const mob = selected.mob;
            set(
                produce((state: GameStore) => {
                    state.combat.currentOpponent = {
                        id: `${mob.id}-${Date.now()}`,
                        base: mob,
                        level: 1, // TODO: Implement level scaling
                        hp: mob.baseHp,
                        attack: mob.baseAttack,
                        defense: mob.baseDefense,
                        attackSpeed: mob.baseAttackSpeed,
                        lootTable: selected.lootTable, // TODO: Populate loot table
                    };
                    state.combat.opponentHp = mob.baseHp;
                    // Initialize opponent attack timer
                    state.combat.lastOpponentAttackTime = Date.now();
                })
            );
        }
    },

    attackOpponent: () => {
        const opponent = get().combat.currentOpponent;
        if (!opponent) return { damageDealt: 0, killed: false };

        // Calculate player damage based on equipped weapon
        const weapon = get().equipments.sword;
        let damage = 1; // Base damage
        if (weapon && weapon.type === "weapon") {
            damage = weapon.damage;
        }

        const newHp = Math.max(0, get().combat.opponentHp - damage);

        set(
            produce((state: GameStore) => {
                state.combat.opponentHp = newHp;
                state.combat.lastAttackTime = Date.now();
            })
        );

        const killed = newHp === 0;
        if (killed) {
            // Handle loot drop, experience gain
            console.log(`${opponent.base.name} defeated!`);

            if (opponent.lootTable) {
                const rand = Math.random() * 100;
                let total = 0;
                let selected: (typeof opponent.lootTable)[number] | null = null;
                for (const entry of opponent.lootTable) {
                    total += entry.chance;
                    if (rand <= total) {
                        selected = entry;
                        break;
                    }
                }

                // Drop loot if selected
                if (selected) {
                    selected.items.forEach((item) => {
                        get().addItem(GAME_ITEMS[item.id], item.quantity);
                    });
                    console.log(
                        `Dropped items: ${selected.items
                            .map((item) => `${item.quantity}x ${item.id}`)
                            .join(", ")}`
                    );
                }
            }
        }

        return { damageDealt: damage, killed };
    },

    tickCombat: () => {
        const state = get().combat;
        const opponent = state.currentOpponent;
        if (!opponent || state.opponentHp <= 0) return;

        const now = Date.now();

        // Auto-attack logic for player (only when auto-combat is enabled)
        if (state.isAutoCombat) {
            const playerAttackInterval = 1000 / state.playerAttackSpeed; // Convert attacks per second to milliseconds
            if (now - state.lastAttackTime >= playerAttackInterval) {
                get().attackOpponent();
            }
        }

        // Opponent attack logic (always active when opponent is alive)
        if (opponent && state.opponentHp > 0) {
            const opponentAttackInterval = 1000 / opponent.attackSpeed; // Convert attacks per second to milliseconds
            if (now - state.lastOpponentAttackTime >= opponentAttackInterval) {
                // Deal opponent damage to player
                const dmg = opponent.attack;
                const newPlayerHp = Math.max(0, state.playerHp - dmg);
                set(
                    produce((state: GameStore) => {
                        state.combat.playerHp = newPlayerHp;
                        state.combat.lastOpponentAttackTime = now;
                    })
                );

                if (newPlayerHp <= 0) {
                    console.log("Player defeated!");
                    // Reset combat, drop loot, penalties, etc.
                    set(
                        produce((state: GameStore) => {
                            state.combat.isAutoCombat = false;
                            state.combat.currentOpponent = null;
                            state.combat.opponentHp = 0;
                            state.combat.playerHp = state.combat.maxPlayerHp; // Restore full health
                        })
                    );
                }
            }
        }
    },

    toggleAutoCombat: () => {
        set(
            produce((state: GameStore) => {
                state.combat.isAutoCombat = !state.combat.isAutoCombat;
                if (state.combat.isAutoCombat) {
                    state.combat.lastAttackTime = Date.now();
                    state.combat.lastOpponentAttackTime = Date.now();
                }
            })
        );
    },
});
