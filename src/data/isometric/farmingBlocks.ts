import { useGameStore } from "@/stores/game";
import { BlockType } from "@/types/isometric";
import { getBlocksAt } from "@/utils/isometric";
import { Texture } from "@/utils/spriteLoader";
import { produce } from "immer";
import { GAME_ITEMS } from "../items";
import { commonBlockTypes } from "./commonBlock";

export const farmingBlockTypes = {
    ...commonBlockTypes,
    farmland: {
        id: "farmland",
        name: "Farmland",
        getTexture: (state) =>
            state.moist ? "block:farmland_moist" : "block:farmland",
        getDefaultState: () => ({ moist: false, moistureLevel: 0 }),
        onInteract: (block) =>
            produce(block, (draft) => {
                draft.state.moist = true;
                draft.state.moistureLevel = 7; // Reset moisture level on interaction
            }),
        onTick: (block) => {
            if (block.state.moist && block.state.moistureLevel > 0) {
                const newMoistureLevel = block.state.moistureLevel - 1;
                console.log(
                    `Moisture level for ${block.id} at (${block.x}, ${block.y}, ${block.z}) is now ${newMoistureLevel}`
                );
                return {
                    kind: "update",
                    block: {
                        ...block,
                        state: {
                            ...block.state,
                            moistureLevel: newMoistureLevel,
                            moist: newMoistureLevel > 0,
                        },
                    },
                };
            }
            return {
                kind: "same",
            };
        },
    },
    carrot: {
        id: "carrot",
        name: "Carrot Plant",
        getTexture: (state) => {
            const stage = Math.min(state.growth || 0, 3);
            return `block:carrots_stage${stage}` as Texture;
        },
        getDefaultState: () => ({ growth: 0, ticksToGrow: 5 }),
        canPlaceOn: (belowBlock) => belowBlock?.type.id === "farmland",
        onTick: (block, grid) => {
            const belowBlock = getBlocksAt(grid, block.x, block.y).find(
                (b) => b.z === block.z - 1
            );

            const isOnMoistFarmland =
                belowBlock?.type.id === "farmland" && belowBlock.state.moist;
            const growthSpeed = isOnMoistFarmland ? 2 : 1;

            if (!isOnMoistFarmland) {
                console.log("Carrot plant needs moist farmland to grow.");
                return { kind: "remove" };
            }

            if (block.state.growth < 3) {
                const newTicksToGrow =
                    (block.state.ticksToGrow || 5) - growthSpeed;

                if (newTicksToGrow <= 0) {
                    return {
                        kind: "update",
                        block: {
                            ...block,
                            state: {
                                growth: block.state.growth + 1,
                                ticksToGrow: 5,
                            },
                        },
                    };
                }

                return {
                    kind: "update",
                    block: {
                        ...block,
                        state: { ...block.state, ticksToGrow: newTicksToGrow },
                    },
                };
            }
            return { kind: "same" };
        },
        onInteract: (block) => {
            if (block.state.growth >= 3) {
                console.log("Carrot harvested!");
                return null;
            }
            return block;
        },
    },
    wheat: {
        id: "wheat",
        name: "Wheat",
        getTexture: (state) => {
            const stage = Math.min(state.growth || 0, 7);
            return `block:wheat_stage${stage}` as Texture;
        },
        getDefaultState: () => ({ growth: 0, ticksToGrow: 8 }),
        canPlaceOn: (belowBlock) => belowBlock?.type.id === "farmland",
        onTick: (block, grid) => {
            const belowBlock = getBlocksAt(grid, block.x, block.y).find(
                (b) => b.z === block.z - 1
            );
            const isOnMoistFarmland =
                belowBlock?.type.id === "farmland" && belowBlock.state.moist;
            const growthSpeed = isOnMoistFarmland ? 2 : 1;

            if (block.state.growth < 7) {
                const newTicksToGrow =
                    (block.state.ticksToGrow || 8) - growthSpeed;

                if (newTicksToGrow <= 0) {
                    return {
                        kind: "update",
                        block: {
                            ...block,
                            state: {
                                growth: block.state.growth + 1,
                                ticksToGrow: 8,
                            },
                        },
                    };
                }

                return {
                    kind: "update",
                    block: {
                        ...block,
                        state: { ...block.state, ticksToGrow: newTicksToGrow },
                    },
                };
            }
            return { kind: "same" };
        },
        onInteract: (block) => {
            if (block.state.growth >= 7) {
                console.log("Wheat harvested!");
                useGameStore.getState().addItem({ ...GAME_ITEMS.watermelon });
                return null;
            }
            return block;
        },
    },
    haybale: {
        id: "haybale",
        name: "Hay Bale",
        getTexture: () => "block:hay_block" as Texture,
        getDefaultState: () => ({}),
        onInteract: (block) => {
            console.log("Hay bale interacted with!");
            return block;
        },
    },
} as const satisfies Record<string, BlockType>;
