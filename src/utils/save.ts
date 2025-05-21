/**
 * Utility functions for saving and loading game state.
 *
 * @module save
 */

import { GameStore, useGameStore } from "@/stores/game";
import { UpgradeKey } from "@/stores/upgrades";
import { produce } from "immer";

type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

/**
 * Represents a version of the GameStore type with all function properties
 * removed, making it suitable for JSON serialization.
 */
type GameStoreWithoutFunctions = NonFunctionProperties<GameStore>;

/**
 * Converts the game store to a JSON-compatible object.
 * Filters out functions from the store.
 *
 * @returns {GameStoreWithoutFunctions} A copy of the store with functions removed
 */
const storeToJson = (): GameStoreWithoutFunctions => {
    const fullStore = useGameStore.getState();

    const sortedStore = Object.entries(fullStore).reduce(
        (acc, [key, value]) => {
            if (typeof value === "function") return acc; // skip functions
            acc[key as keyof GameStoreWithoutFunctions] = value;
            return acc;
        },
        {} as GameStoreWithoutFunctions
    );
    return sortedStore;
};

/**
 * Exports the current game state as a base64-encoded string.
 *
 * @returns {string} Base64-encoded JSON string of the game state
 */
export const exportSave = (): string =>
    window.btoa(JSON.stringify(storeToJson()));

/**
 * Decodes a base64-encoded save string back into an object.
 *
 * @param {string} input - Base64-encoded save string
 * @returns {any} Decoded game state object
 */
export const decodeSave = (input: string): any =>
    JSON.parse(window.atob(input));

/**
 * Imports a save string and updates the game state.
 *
 * @param {string} input - Base64-encoded save string
 */
export const importSave = (input: string) => {
    const { setState } = useGameStore;
    const decoded: Partial<GameStore> = decodeSave(input);
    const merged = mergeStates(useGameStore.getState(), decoded);
    // console.log(merged);
    setState(merged);
};

/**
 * Merge baseGameState with the imported save without breaking things
 * @param {GameStore} baseState - initial game state
 * @param {Partial<GameSTore>} importedState - decoded imported save
 * @returns {GameStore} Merged game state with functions and correct fields
 */
const mergeStates = (
    baseState: GameStore,
    importedState: Partial<GameStore>
): GameStore => {
    // Merge upgrade.effect with the imported state because functions are not exported with JSON
    const merged = produce(importedState, (draft) => {
        Object.keys(draft.upgrades!).map(
            (upgradeKey) =>
                (draft.upgrades![upgradeKey as UpgradeKey].effect =
                    baseState.upgrades[upgradeKey as UpgradeKey].effect)
        );
    });
    return { ...baseState, ...merged };
};
