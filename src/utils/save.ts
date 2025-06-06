/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/**
 * Utility functions for saving and loading game state.
 *
 * @module save
 */

import { GameStore, useGameStore } from "@/stores/game";
import { useToastStore } from "@/stores/toast";
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
 * Fields to be ignored when loading a save (must be depth 0 fields)
 */
const IGNORED_FILEDS: string[] = ["ages", "crafts"];

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

export const saveToLocalStorage = (): void => {
    window.localStorage.setItem(
        "ageofsteveSave",
        window.btoa(JSON.stringify(storeToJson()))
    );
    useToastStore.getState().addToast({
        message: "Game saved",
        type: "save",
        duration: 5000,
    });
};

export const loadFromLocalStorage = (): void => {
    const { setState, getState } = useGameStore;
    const cryptedSave = window.localStorage.getItem("ageofsteveSave");

    if (!cryptedSave) {
        // console.warn("Failed to load save from localStorage");
        return;
    }

    const imported = decodeSave(cryptedSave);

    const merged = mergeStates(getState(), imported);

    setState(merged);
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
    // DO NOT TOUCH IT WORKS... FOR NOW
    const merge = (imported: GameStore, base: GameStore, depth: number) => {
        return produce(imported, (draft: Record<string, any>) => {
            Object.entries(base).forEach(([key, value]) => {
                if (
                    typeof value === "function" ||
                    (depth === 0 && IGNORED_FILEDS.includes(key)) // ignore secific fields
                ) {
                    draft[key] = value;
                } else if (typeof value === "object" && value !== null) {
                    if (!draft[key] || typeof draft[key] !== "object") {
                        draft[key] = {};
                    }
                    draft[key] = merge(draft[key], value, depth + 1);
                }
            });
        });
    };

    return merge(importedState as GameStore, baseState, 0);
};
