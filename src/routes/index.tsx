import { useGameLoop } from "@/hooks/useGameLoop";
import { useResourceStore } from "@/stores/resources";
import { createFileRoute } from "@tanstack/react-router";
import Resources from "@/components/ResourcesComponent";
import { useItemStore } from "@/stores/items";
import InventoryComponent from "@/components/InventoryComponent";

export const Route = createFileRoute("/")({
    component: Index,
});

// IMPORTANT: the id "root" of the first div is mandatory.. else it will break the TanStack Router
function Index() {
    const itemStore = useItemStore();
    const resourceStore = useResourceStore();
    const gameLoop = useGameLoop();
    return (
        <div id="root" className="flex flex-row h-full w-full gap-4">
            {/* Left Panel */}
            <div className="bg-green-400 h-full w-2/10 flex flex-col p-4">
                Left panel
            </div>

            {/* Central panel */}
            <div className="bg-yellow-400 h-full flex flex-col flex-1">
                {/* Central top */}
                <div className="h-1/2 bg-purple-400"></div>

                {/* Central bottom */}
                <div className="h-1/2 bg-blue-400">
                    <InventoryComponent
                        items={itemStore.items}
                        resources={resourceStore.resources}
                    />
                </div>
            </div>

            <div className="bg-red-400 h-full w-1/3 flex flex-col p-4">
                Left panel
            </div>
        </div>
    );
}
