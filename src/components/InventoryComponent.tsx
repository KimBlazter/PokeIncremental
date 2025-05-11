import ResourcesComponent from "@/components/ResourcesComponent";
import ItemsComponent from "@/components/ItemsComponent";

export default function InventoryComponent() {
    return (
        <div className="inventory-border text-mcInventoryText flex h-full flex-row gap-2">
            {/* Resources */}
            <div className="h-full w-3/7">
                <ResourcesComponent />
            </div>

            {/* Items */}
            <div className="h-full w-4/7">
                <ItemsComponent />
            </div>
        </div>
    );
}
