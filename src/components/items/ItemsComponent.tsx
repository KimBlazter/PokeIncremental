import ItemComponent from "./ItemComponent";
import { useGameStore } from "@/stores/game";
import { v4 as uuidv4 } from "uuid";

export default function ItemsComponent() {
    const items = useGameStore((state) => state.items);
    return (
        <div className="flex h-full flex-col">
            <h2 className="text-mcInventoryText text-lg font-bold">Items</h2>
            <div className="flex flex-row flex-wrap overflow-y-auto pt-1">
                {items.map((item) => (
                    <ItemComponent key={uuidv4()} item={item} />
                ))}
            </div>
        </div>
    );
}
