import ItemComponent from "./ItemComponent";
import { useGameStore } from "@/stores/game";

export default function ItemsComponent() {
    const items = useGameStore((state) => state.items);
    return (
        <div className="flex h-full flex-col">
            <h2 className="text-mcInventoryText text-lg font-bold">Items</h2>
            <div className="flex flex-row flex-wrap overflow-y-auto pt-1">
                {Object.keys(items).map((id) => (
                    <ItemComponent key={id} item={items[id]} />
                ))}
            </div>
        </div>
    );
}
