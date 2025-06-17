import { useGameStore } from "@/stores/game";
import { useState } from "react";
import ItemIcon from "../ItemIcon";
import clsx from "clsx";
import { ResourceData } from "@/stores/resources";
import { Equiments } from "@/stores/equipments";
import { isEffectiveTool } from "@/utils/items";

export default function MineResourceButton() {
    const resource = useGameStore(
        (state) => state.ages[state.currentAge].collectible
    );
    const resourceData = useGameStore((state) => state.resources[resource]);
    const addResource = useGameStore((state) => state.addResource);
    const multiplier = useGameStore((state) =>
        state.computeResourcesYield(resource)
    );
    const equipments = useGameStore((state) => state.equipments);

    const [isMining, setIsMining] = useState(false);

    const MINING_DURATION = computeMiningTime(resourceData, equipments);

    const handleMine = async () => {
        if (isMining) return;
        setIsMining(true);
        await new Promise((resolve) => setTimeout(resolve, MINING_DURATION));
        addResource(resource, multiplier);
        setIsMining(false);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="dialog-border-transparent !bg-mcInventoryBackground/50 relative flex size-20 items-center justify-center">
                <ItemIcon
                    textureIdentifier={resourceData.texture_identifier}
                    className={clsx(
                        "z-3 scale-150",
                        isMining && "animate-bounce"
                    )}
                    style={{ animationDuration: "0.5s" }}
                />
            </div>

            <div className="relative w-64">
                <button
                    onClick={handleMine}
                    disabled={isMining}
                    className="relative w-full rounded-md border-2 !bg-gradient-to-b from-gray-400 to-gray-500 px-4 py-3 text-lg font-bold text-black uppercase shadow-md transition-all duration-200 hover:brightness-105 active:scale-95 disabled:cursor-not-allowed"
                >
                    {isMining ?
                        <span className="flex items-center justify-center gap-1">
                            ⛏ Mining
                            <span className="dot-ellipsis" />
                        </span>
                    :   `⛏ Mine ${resource}`}
                    {/* Progress overlay */}
                    {isMining && (
                        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-md">
                            <div
                                className="animate-progress h-full w-full bg-black/30"
                                style={{
                                    animationDuration: `${MINING_DURATION}ms`,
                                }}
                            />
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}

function computeMiningTime(
    resourceData: ResourceData,
    equipments: Equiments
): number {
    const DEFAULT_MINING_TIME = 2000; // Default mining time in milliseconds

    const correspondingEquipedItem = equipments[resourceData.effective_tool];
    if (
        correspondingEquipedItem &&
        correspondingEquipedItem.type === "tool" &&
        isEffectiveTool(correspondingEquipedItem, resourceData)
    )
        return (
            DEFAULT_MINING_TIME / (correspondingEquipedItem.miningSpeed ?? 1) // Adjust mining time based on tool speed
        );

    return DEFAULT_MINING_TIME;
}
