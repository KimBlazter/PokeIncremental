import { StateCreator } from "zustand";
import { Resource } from "./resources";

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
        stone: 1,
        iron: 1,
        gold: 1,
    },
    updateMultiplier: (ressource, amount) =>
        set((state) => ({
            multiplier: {
                ...state.multiplier,
                [ressource]:
                    typeof amount == "number" ? amount : (
                        amount(state.multiplier[ressource])
                    ),
            },
        })),
});
