import { useGameStore } from "@/stores/game";
import { Resource, ResourceData } from "@/stores/resources";
import { formatNumber } from "@/utils/number-formatting-compact";
import Decimal from "break_eternity.js";

export default function ResourceTooltipContent({
    resourceData,
    resourceKey,
}: {
    resourceData: ResourceData;
    resourceKey: Resource;
}) {
    const perClick = useGameStore((state) => state.multiplier[resourceKey]);
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
            <span className="text-xs text-white/40">{perClick}/click</span>
        </div>
    );
}
