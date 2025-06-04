import { SlotType } from "@/stores/equipments";
import { Item } from "@/stores/items";
import ItemIcon from "../ItemIcon";
import { useGameStore } from "@/stores/game";
import { Tooltip } from "../ui/Tooltip";
import ItemTooltipContent from "../Tooltips/ItemTooltipContent";

const slotTypeToTextureIdentifier: Record<SlotType, string> = {
    sword: "wooden_sword",
    axe: "wooden_axe",
    pickaxe: "wooden_pickaxe",
    shovel: "wooden_shovel",
    hoe: "wooden_hoe",
    helmet: "leather_helmet",
    chestplate: "leather_chestplate",
    leggings: "leather_leggings",
    boots: "leather_boots",
    shield: "shield",
};

export default function EquipmentSlot({
    slotType,
    item,
    tooltipPosition = "left",
}: {
    slotType: SlotType;
    item: Item | undefined | null;
    tooltipPosition?: "left" | "right";
}) {
    const unequipItem = useGameStore((state) => state.unequipItem);
    return (
        <Tooltip
            content={item ? <ItemTooltipContent item={item} /> : null}
            position={tooltipPosition}
        >
            <div
                className="item-slot relative flex items-center justify-center bg-black/50 hover:bg-black/30 active:bg-black/10"
                onClick={() => unequipItem(slotType)}
            >
                {item ?
                    <ItemIcon
                        textureIdentifier={item.textureIdentifier}
                        className="z-3"
                    />
                :   <ItemIcon
                        textureIdentifier={
                            slotTypeToTextureIdentifier[slotType]
                        }
                        className="absolute z-2 opacity-20 brightness-0"
                    />
                }
            </div>
        </Tooltip>
    );
}
