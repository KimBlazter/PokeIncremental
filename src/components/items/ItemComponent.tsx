import { Item } from "@/stores/items";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";
import { Tooltip } from "@/components/ui/Tooltip";
import ItemTooltipContent from "@/components/Tooltips/ItemTooltipContent";
import { useGameStore } from "@/stores/game";

export default function ItemComponent({ item }: { item: Item }) {
    const equipItem = useGameStore((state) => state.equipItem);
    return (
        <Tooltip
            content={<ItemTooltipContent item={item} />}
            position="top"
            align="start"
        >
            <div
                className="item-slot relative flex items-center justify-center text-xs"
                onClick={() => equipItem(item)}
            >
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
