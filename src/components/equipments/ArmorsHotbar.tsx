import { SlotType } from "@/stores/equipments";
import { useGameStore } from "@/stores/game";
import EquipmentSlot from "./EquipmentSlot";
import clsx from "clsx";

const toolsSlots: SlotType[] = [
    "helmet",
    "chestplate",
    "leggings",
    "boots",
    "shield",
];

export default function ArmorsHotbar({ className }: { className?: string }) {
    const equipmentSlots = useGameStore((state) => state.equipments);
    return (
        <div
            className={clsx(
                "inventory-border flex flex-col border-l-0 pl-2",
                className
            )}
        >
            {toolsSlots.map((slotType) => (
                <EquipmentSlot
                    key={slotType}
                    slotType={slotType}
                    item={equipmentSlots[slotType]}
                    tooltipPosition="right"
                />
            ))}
        </div>
    );
}
