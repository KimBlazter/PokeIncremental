import { SlotType } from "@/stores/equipments";
import { Item } from "@/stores/items";
import ItemIcon from "../ItemIcon";
import { useGameStore } from "@/stores/game";
import { Tooltip } from "../ui/Tooltip";
import ItemTooltipContent from "../Tooltips/ItemTooltipContent";

export default function EquipmentSlot({
    slotType,
    item,
}: {
    slotType: SlotType;
    item: Item | undefined | null;
}) {
    const unequipItem = useGameStore((state) => state.unequipItem);
    return (
        <Tooltip
            content={item ? <ItemTooltipContent item={item} /> : null}
            position="left"
        >
            <div
                className="item-slot relative flex items-center justify-center bg-black/50 hover:bg-black/30 active:bg-black/10"
                onClick={() => unequipItem(slotType)}
            >
                {item && (
                    <ItemIcon
                        textureIdentifier={item.textureIdentifier}
                        className="z-3"
                    />
                )}
                <ItemIcon
                    textureIdentifier={"wooden_" + slotType}
                    className="absolute z-2 opacity-20 brightness-0"
                />
            </div>
        </Tooltip>
    );
}
