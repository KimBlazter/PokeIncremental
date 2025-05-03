import { Item } from "@/stores/items";

export default function ItemComponent({ item }: { item: Item }) {
    return (
        <div className="aspect-square size-12 bg-gray-400 flex flex-col items-center text-xs">
            {item.name}
        </div>
    );
}
