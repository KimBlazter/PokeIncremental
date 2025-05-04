import { Item } from "@/stores/items";

export default function ItemComponent({ item }: { item: Item }) {
    return (
        <div className="item-slot flex items-end justify-end p-0.5 text-end text-xs">
            {item.name}
        </div>
    );
}
