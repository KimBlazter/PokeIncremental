import { CraftKey } from "@/stores/crafts";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";
import { Tooltip } from "./Tooltip";
import { useGameStore } from "@/stores/game";
import CraftTooltipContent from "./Tooltips/CraftTooltipContent";

export default function CraftComponent({ craftId }: { craftId: CraftKey }) {
    const craft = useGameStore((state) => state.crafts[craftId]);
    const craftAction = useGameStore((state) => state.craft);
    return (
        <Tooltip
            className="aspect-square h-12 w-12"
            content={<CraftTooltipContent craft={craft} />}
            align="end"
        >
            <div
                className="item-slot relative flex items-center justify-center bg-none text-xs"
                onClick={() => craftAction(craftId)}
            >
                <div
                    aria-hidden
                    className={clsx(
                        "icon-minecraft",
                        getTextureFromIdentifier(
                            craft.result.item.textureIdentifier ?? "barrier"
                        )
                    )}
                />
            </div>
        </Tooltip>
    );
}
