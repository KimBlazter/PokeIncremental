import { SlotType } from "@/stores/equipments";
import { Item } from "@/stores/items";
import ItemIcon from "../ItemIcon";
import { useGameStore } from "@/stores/game";
import { Tooltip } from "../ui/Tooltip";
import ItemTooltipContent from "../Tooltips/ItemTooltipContent";
import { Texture } from "@/utils/spriteLoader";

const slotTypeToTextureIdentifier: Record<SlotType, Texture> = {
    sword: "item:wooden_sword",
    axe: "item:wooden_axe",
    pickaxe: "item:wooden_pickaxe",
    shovel: "item:wooden_shovel",
    hoe: "item:wooden_hoe",
    helmet: {
        base: "item:leather_helmet",
        overlay: {
            base: "item:leather_helmet_overlay",
        },
    },
    chestplate: "item:leather_chestplate",
    leggings: {
        base: "item:leather_leggings",
        overlay: {
            base: "item:leather_leggings_overlay",
        },
    },
    boots: {
        base: "item:leather_boots",
        overlay: {
            base: "item:leather_boots_overlay",
        },
    },
    shield: "item:barrier",
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
            content={
                item ? <ItemTooltipContent item={item} equiped={true} /> : null
            }
            position={tooltipPosition}
        >
            <div
                className="item-slot relative flex items-center justify-center bg-black/50 hover:bg-black/30 active:bg-black/10"
                onClick={() => unequipItem(slotType)}
            >
                {item ?
                    <ItemIcon texture={item.texture} className="z-3" />
                :   <ItemIcon
                        texture={slotTypeToTextureIdentifier[slotType]}
                        className="absolute z-2 opacity-20 brightness-0"
                    />
                }
            </div>
        </Tooltip>
    );
}
