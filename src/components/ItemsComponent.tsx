import { Items } from "@/stores/items";
import ItemComponent from "./ItemComponent";

export default function ItemsComponent({ items }: { items: Items }) {
    return (
        <div className="flex flex-row flex-wrap gap-1 bg-mc">
            {Object.keys(items).map((id) => (
                <ItemComponent key={id} item={items[id]} />
            ))}
        </div>
    );
}
