import { useGameStore } from "@/stores/game";
import type { ToolItem } from "@/stores/items";
import clsx from "clsx";

export default function ToolDescription({
    item,
    equiped,
}: {
    item: ToolItem;
    equiped: boolean;
}) {
    const currentEffectiveTool = useGameStore(
        (state) =>
            state.resources[state.ages[state.currentAge].collectible]
                .effective_tool
    );
    return (
        <div className="flex flex-col">
            <span className="text-xs text-white/70">
                ⛏ Mining damage:{" "}
                <span
                    className={clsx(
                        item.toolType === currentEffectiveTool && equiped ?
                            "text-green-400"
                        :   "text-white/60"
                    )}
                >
                    +{item.damage}
                </span>
            </span>
        </div>
    );
}
