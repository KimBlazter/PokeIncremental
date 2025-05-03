import { Items } from "@/stores/items";
import { Resources } from "@/stores/resources";
import ResourcesComponent from "@/components/ResourcesComponent";
import ItemsComponent from "@/components/ItemsComponent";

export default function InventoryComponent({
    resources,
    items,
}: {
    resources: Resources;
    items: Items;
}) {
    return (
        <div className="flex flex-row gap-2 h-full bg-mcInventoryBackground border-t-mcInventoryBackgroundBorderHighlight border-8 border-b-mcInventoryBackgroundBorder border-r-mcInventoryBackgroundBorder">
            {/* Resources */}
            <div className="w-3/7 h-full p-2">
                <ResourcesComponent resources={resources} />
            </div>

            {/* Items */}
            <div className="w-4/7 h-full p-2">
                <ItemsComponent items={items} />
            </div>
        </div>
    );
}
