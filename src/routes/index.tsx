import { useGameLoop } from "@/hooks/useGameLoop";
import { createFileRoute } from "@tanstack/react-router";
import InventoryComponent from "@/components/InventoryComponent";
import MineResourceButton from "@/components/MineResourceButton";
import UpgradesComponent from "@/components/UpgradesComponent";
import AgeSelector from "@/components/AgeSelector";
import CraftsComponent from "@/components/CraftsComponent";

export const Route = createFileRoute("/")({
    component: Index,
});

// IMPORTANT: the id "root" of the first div is mandatory.. else it will break the TanStack Router
function Index() {
    const gameLoop = useGameLoop();

    return (
        <div id="root" className="flex h-full w-full flex-row gap-4">
            {/* Left Panel */}
            <div className="flex h-full w-1/7 flex-col bg-green-400 p-4">
                Left panel
            </div>

            {/* Central panel */}
            <div className="flex h-full flex-1 flex-col">
                {/* Central top */}
                <div className="flex h-1/2 flex-col bg-purple-400">
                    <AgeSelector />
                    <MineResourceButton />
                </div>

                {/* Central bottom */}
                <div className="h-1/2">
                    <InventoryComponent />
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex h-full w-1/3 flex-col bg-red-400 p-4">
                <UpgradesComponent />
                <CraftsComponent />
            </div>
        </div>
    );
}
