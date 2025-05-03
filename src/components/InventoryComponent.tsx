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
        <div className="bg-mcInventoryBackground border-t-mcInventoryBackgroundBorderHighlight border-l-mcInventoryBackgroundBorderHighlight border-b-mcInventoryBackgroundBorder border-r-mcInventoryBackgroundBorder text-mcInventoryText flex h-full flex-row gap-2 border-6">
            {/* Resources */}
            <div className="h-full w-3/7 p-2">
                <ResourcesComponent resources={resources} />
            </div>

            {/* Items */}
            <div className="h-full w-4/7 p-2">
                <ItemsComponent items={items} />
            </div>
        </div>
    );
}
