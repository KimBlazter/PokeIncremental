import { useGameStore } from "@/stores/game";
import { Resource, ResourceData } from "@/stores/resources";
import { formatNumber } from "@/utils/number-formatting-compact";
import ItemIcon from "../ItemIcon";
import { TextureId } from "@/utils/spriteLoader";

export default function ResourceTooltipContent({
    resourceData,
    resourceKey,
}: {
    resourceData: ResourceData;
    resourceKey: Resource;
}) {
    const perClick = useGameStore((state) =>
        state.computeResourcesYield(resourceKey)
    );

    // console.log("Resource re-render");

    return (
        <div className="mc-text-shadow letter-sp flex flex-col text-base tracking-normal">
            <span>
                {resourceData.name}{" "}
                <span className="text-sm opacity-60">
                    x{formatNumber(resourceData.amount, 3, 6)}
                </span>
            </span>
            <div className="flex flex-row items-center gap-1 text-sm text-white/30">
                <span className="text-xs text-white/40">{perClick}/click</span>(
                <ItemIcon
                    className="-m-2 size-6 text-white opacity-30 brightness-0 invert-100"
                    texture={
                        ("item:iron_" +
                            resourceData.effective_tool) as TextureId
                    }
                />
                )
            </div>

            {}
        </div>
    );
}
