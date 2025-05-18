import { useGameStore } from "@/stores/game";
import { Resource, ResourceData } from "@/stores/resources";
import { getTextureFromIdentifier } from "@/utils/item-models";
import { formatNumber } from "@/utils/number-formatting-compact";
import Decimal from "break_eternity.js";
import clsx from "clsx";

export default function ResourceTooltipContent({
    resourceData,
    resourceKey,
}: {
    resourceData: ResourceData;
    resourceKey: Resource;
}) {
    const perClick = useGameStore((state) => state.multiplier[resourceKey]);
    console.log("Resource re-render");
    return (
        <div className="mc-text-shadow letter-sp flex flex-col text-base tracking-normal">
            <span>
                {resourceData.name}{" "}
                <span className="text-sm opacity-60">
                    x
                    {formatNumber(
                        Decimal.fromNumber(resourceData.amount),
                        3,
                        6
                    )}
                </span>
            </span>
            <div className="flex flex-row items-center gap-1 text-sm text-white/30">
                <span className="text-xs text-white/40">{perClick}/click</span>
                (
                <div
                    aria-hidden
                    className={clsx(
                        "icon-minecraft-sm text-white opacity-30 brightness-0 invert-100",
                        getTextureFromIdentifier(
                            "iron_" + resourceData.effective_tool
                        )
                    )}
                />
                )
            </div>

            {}
        </div>
    );
}
