import { Item } from "@/stores/items";
import ItemIcon from "../../ItemIcon";
import { useGameStore } from "@/stores/game";
import clsx from "clsx";
import { TextureId } from "@/utils/spriteLoader";
import ToolDescription from "./ToolDescription";

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
                    <span className="flex items-center justify-center rounded-sm bg-white/60 px-2 pb-0.5 leading-4 text-black capitalize text-shadow-none">
                        {item.type}
                    </span>
                    {item.type === "tool" && (
                        <span className="flex items-center justify-center gap-1 rounded-sm bg-white/60 px-0.5 py-0.5 text-black text-shadow-none">
                            <ItemIcon
                                className="size-4 !p-0 brightness-0"
                                texture={
                                    ("item:iron_" + item.toolType) as TextureId
                                }
                            />
                        </span>
                    )}
                </span>
                {/* Tool stats */}
                {item.type === "tool" && (
                    <ToolDescription item={item} equiped={equiped} />
                )}

                {/* Weapon stats */}
                {item.type === "weapon" && item.damage && (
                    <div className="flex flex-col">
                        <span className="mt-1 -mb-1.5 text-xs text-white/70">
                            Damage:{" "}
                            <span className="text-green-400">
                                +{item.damage}
                            </span>
                        </span>
                        <span className="mt-1 text-xs text-white/70">
                            Attack speed:{" "}
                            <span className="text-green-400">
                                {item.attackSpeed}
                            </span>
                        </span>
                    </div>
                )}

                {/* Armor stats */}
                {item.type === "armor" && (
                    <span className="mt-1 text-xs text-white/70">
                        Defense:{" "}
                        <span className="text-blue-400">{item.defense}</span>
                    </span>
                )}

                {/* Generic item stats */}

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
