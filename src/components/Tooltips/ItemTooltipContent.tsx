import { Item } from "@/stores/items";
import ItemIcon from "../ItemIcon";
import { useGameStore } from "@/stores/game";
import clsx from "clsx";

export default function ItemTooltipContent({
    item,
    equiped = false,
}: {
    item: Item;
    equiped?: boolean;
}) {
    const currentEffectiveTool = useGameStore(
        (state) =>
            state.resources[state.ages[state.currentAge].collectible]
                .effective_tool
    );
    return (
        <div className="mc-text-shadow letter-sp flex flex-col text-base tracking-normal">
            <div className="flex flex-col">
                <span className="mb-0.5 text-base text-amber-400">
                    {item.name}
                </span>
                <span className="flex flex-row items-center gap-1 text-sm text-white/30">
                    <span className="capitalize">{item.type}</span>
                    {item.type === "tool" && (
                        <>
                            (
                            <ItemIcon
                                className="icon-minecraft-sm text-white opacity-30 brightness-0 invert-100"
                                textureIdentifier={"iron_" + item.toolType}
                            />
                            )
                        </>
                    )}
                </span>
                {/* Mining speed */}
                {item.type === "tool" && item.miningSpeed && (
                    <span className="mt-1 text-xs text-white/70">
                        ⛏ Mining speed:{" "}
                        <span
                            className={clsx(
                                (
                                    item.toolType === currentEffectiveTool &&
                                        equiped
                                ) ?
                                    "text-green-400"
                                :   "text-white/60"
                            )}
                        >
                            x{item.miningSpeed}
                        </span>
                    </span>
                )}

                {/* Equip/Unequip message */}
                {(item.type === "tool" ||
                    item.type === "weapon" ||
                    item.type === "armor") && (
                    <span className="mt-4 text-xs tracking-tighter text-white/60">
                        Left click to{" "}
                        <span className="text-gray-300/100">
                            {equiped ? "unequip" : "equip"}
                        </span>{" "}
                        {item.type}
                    </span>
                )}
            </div>
        </div>
    );
}
