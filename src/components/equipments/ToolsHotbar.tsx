import { SlotType } from "@/stores/equipments";
import { useGameStore } from "@/stores/game";
import EquipmentSlot from "./EquipmentSlot";
import clsx from "clsx";

const toolsSlots: SlotType[] = ["sword", "axe", "pickaxe", "shovel", "hoe"];

export default function ToolsHotbar({ className }: { className?: string }) {
    const equipmentSlots = useGameStore((state) => state.equipments);
    return (
        <div
            className={clsx(
                "inventory-border flex flex-col border-r-0 pr-2",
                className
            )}
        >
            {toolsSlots.map((slotType) => (
                <EquipmentSlot
                    key={slotType}
                    slotType={slotType}
                    item={equipmentSlots[slotType]}
                />
            ))}
        </div>
    );
}
