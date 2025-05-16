import { StateCreator } from "zustand";
import { Resource } from "./resources";
import { produce } from "immer";

type Multiplier = Record<Resource, number>;

export interface MultiplierSlice {
    multiplier: Multiplier;
    updateMultiplier: (
        multiplier: Resource,
        amount: number | ((prev: number) => number)
    ) => void;
}

export const createMultiplierSlice: StateCreator<
    MultiplierSlice,
    [],
    [],
    MultiplierSlice
> = (set) => ({
    multiplier: {
        wood: 1,
        cobblestone: 1,
        iron: 1,
        gold: 1,
    },
    updateMultiplier: (resource, amount) =>
        set(
            produce((state: MultiplierSlice) => {
                state.multiplier[resource] =
                    typeof amount == "number" ? amount : (
                        amount(state.multiplier[resource])
                    );
            })
        ),
});
