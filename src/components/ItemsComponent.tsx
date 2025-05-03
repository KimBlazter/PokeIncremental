import { Items } from "@/stores/items";
import ItemComponent from "./ItemComponent";

export default function ItemsComponent({ items }: { items: Items }) {
    return (
        <div className="flex flex-col">
            <h2>Items</h2>
            <div className="flex flex-row flex-wrap gap-1">
                {Object.keys(items).map((id) => (
                    <ItemComponent key={id} item={items[id]} />
                ))}
            </div>
        </div>
    );
}
