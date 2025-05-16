import { Resource, ResourceData } from "@/stores/resources";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";
import { formatNumber } from "@/utils/number-formatting-compact";
import Decimal from "break_eternity.js";
import { Tooltip } from "./Tooltip";
import ResourceTooltipContent from "./Tooltips/ResourceTooltipContent";

export default function ResourceComponent({
    resourceData,
    resourceKey,
}: {
    resourceData: ResourceData;
    resourceKey: Resource;
}) {
    return (
        <Tooltip
            content={
                <ResourceTooltipContent
                    resourceData={resourceData}
                    resourceKey={resourceKey}
                />
            }
        >
            <div className="item-slot relative flex items-center justify-center text-xs">
                <div
                    aria-hidden
                    className={clsx(
                        "icon-minecraft",
                        getTextureFromIdentifier(
                            resourceData.texture_identifier
                        )
                    )}
                />
                <span
                    className="text-mc mc-text-shadow absolute right-0 bottom-0 text-right text-sm"
                    style={{
                        lineHeight: "1",
                        fontVariantLigatures: "none",
                        fontKerning: "none",
                    }}
                >
                    {formatNumber(Decimal.fromNumber(resourceData.amount))}
                </span>
            </div>
        </Tooltip>
    );
}
