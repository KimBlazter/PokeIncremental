import { Item } from "@/stores/items";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";
import { Tooltip } from "./Tooltip";
import ItemTooltipContent from "./Tooltips/ItemTooltipContent";

export default function ItemComponent({ item }: { item: Item }) {
    return (
        <Tooltip
            content={<ItemTooltipContent item={item} />}
            position="top"
            align="start"
        >
            <div className="item-slot relative flex items-center justify-center text-xs">
                <div
                    aria-hidden
                    className={clsx(
                        "icon-minecraft",
                        getTextureFromIdentifier(
                            item.textureIdentifier ?? "barrier"
                        )
                    )}
                />
            </div>
        </Tooltip>
    );
}
