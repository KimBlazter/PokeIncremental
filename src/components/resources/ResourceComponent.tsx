import { Resource, ResourceData } from "@/stores/resources";
import { formatNumber } from "@/utils/number-formatting-compact";
import Decimal from "break_eternity.js";
import { Tooltip } from "@/components/ui/Tooltip";
import ResourceTooltipContent from "@/components/Tooltips/ResourceTooltipContent";
import ItemIcon from "../ItemIcon";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function ResourceComponent({
    resourceData,
    resourceKey,
}: {
    resourceData: ResourceData;
    resourceKey: Resource;
}) {
    // Do not render if the resource amount is 0
    // This avoids rendering empty slots in the UI
    if (resourceData.amount == 0) {
        return;
    }

    const [animate, setAnimate] = useState(false);
    const prevAmount = useRef(resourceData.amount);

    useEffect(() => {
        if (resourceData.amount >= prevAmount.current) {
            setAnimate(true);
            const timeout = setTimeout(() => setAnimate(false), 150);
            return () => clearTimeout(timeout);
        }
        prevAmount.current = resourceData.amount;
    }, [resourceData.amount]);

    return (
        <Tooltip
            content={
                <ResourceTooltipContent
                    resourceData={resourceData}
                    resourceKey={resourceKey}
                />
            }
            position="top"
            align="start"
        >
            <div className="item-slot relative flex items-center justify-center text-xs">
                <ItemIcon
                    textureIdentifier={resourceData.texture_identifier}
                    className={clsx(animate && "item-squeak")}
                />
                <span
                    className="mc-text-shadow absolute right-0 bottom-0 text-right text-sm"
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
