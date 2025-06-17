import { Item } from "@/stores/items";
import { Tooltip } from "@/components/ui/Tooltip";
import ItemTooltipContent from "@/components/Tooltips/ItemTooltipContent";
import { useGameStore } from "@/stores/game";
import ItemIcon from "../ItemIcon";

export default function ItemComponent({ item }: { item: Item }) {
    const useItem = useGameStore((state) => state.useItem);

    return (
        <Tooltip
            content={<ItemTooltipContent item={item} />}
            position="top"
            align="start"
        >
            <div
                className="item-slot relative flex items-center justify-center text-xs"
                onClick={() => useItem(item)}
            >
                <ItemIcon textureIdentifier={item.textureIdentifier} />
                {false && <div className="enchanted" />}
            </div>
        </Tooltip>
    );
}
