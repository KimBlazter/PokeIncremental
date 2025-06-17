import ItemComponent from "./ItemComponent";
import { useGameStore } from "@/stores/game";
import { v4 as uuidv4 } from "uuid";

const MIN_VISIBLE_SLOTS = 16;

export default function ItemsComponent() {
    const items = useGameStore((state) => state.items);

    const emptySlotsCount = Math.max(0, MIN_VISIBLE_SLOTS - items.length);

    return (
        <div className="flex h-full flex-col">
            <h2 className="text-mcInventoryText text-lg font-bold">Items</h2>
            <div className="flex flex-row flex-wrap overflow-y-auto pt-1">
                {items.map((item) => (
                    <ItemComponent key={uuidv4()} item={item} />
                ))}
                {/* Empty slots */}
                {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                    <div key={idx} className="item-slot" />
                ))}
            </div>
        </div>
    );
}
