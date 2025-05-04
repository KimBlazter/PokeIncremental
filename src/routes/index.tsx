import { useGameLoop } from "@/hooks/useGameLoop";
import { createFileRoute } from "@tanstack/react-router";
import InventoryComponent from "@/components/InventoryComponent";
import MineWoodButton from "@/components/MineWoodButton";

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
            <div className="flex h-full flex-1 flex-col bg-yellow-400">
                {/* Central top */}
                <div className="h-1/2 bg-purple-400">
                    <MineWoodButton />
                </div>

                {/* Central bottom */}
                <div className="h-1/2 bg-blue-400">
                    <InventoryComponent />
                </div>
            </div>

            <div className="flex h-full w-1/3 flex-col bg-red-400 p-4">
                Left panel
            </div>
        </div>
    );
}
