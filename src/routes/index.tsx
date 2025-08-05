import { createFileRoute } from "@tanstack/react-router";
import InventoryComponent from "@/components/InventoryComponent";
import UpgradesComponent from "@/components/upgrades/UpgradesComponent";
import CraftsComponent from "@/components/crafts/CraftsComponent";
import { useGameStore } from "@/stores/game";
import { useEffect } from "react";
import SettingsButton from "@/components/settings/SettingsButton";
import AchievementsButton from "@/components/achievements/AchievementsButton";
import { useHotkeys } from "@/hooks/useHotkeys";
import TabSwitcher from "@/components/ui/TabSwitcher";
import ModeSelectionButtons from "@/components/modes/ModeSelectionButtons";
import Mining from "@/components/modes/Mining/Mining";
import Battle from "@/components/modes/Battle/Battle";
import Farming from "@/components/modes/Farming/Farming";

export const Route = createFileRoute("/")({
    component: Index,
});

// IMPORTANT: the id "root" of the first div is mandatory.. else it will break the TanStack Router
function Index() {
    useHotkeys();
    // useGameLoop(); // Start the game loop
    const init = useGameStore((state) => state.init);

    const currentMode = useGameStore((state) => state.currentMode);

    // Initialize the game state when the component mounts
    useEffect(() => {
        console.log("Initialization...");
        init();
    }, []);

    return (
        <div id="root" className="flex h-full w-full flex-row gap-2">
            {/* Left Panel */}
            <div
                className="dialog-border-transparent flex h-full w-1/7 flex-col gap-2 p-4"
                style={{
                    backgroundImage: `url("/textures/blocks/oak_planks.png")`,
                    backgroundSize: "48px",
                    imageRendering: "pixelated",
                }}
            >
                <ModeSelectionButtons />
                <AchievementsButton />
                <SettingsButton />
            </div>

            {/* Central panel */}
            <div className="relative flex h-full flex-1 flex-col">
                {/* Central top - Current mode */}
                <div className="flex h-6/10 flex-col gap-1">
                    {currentMode === "mining" && <Mining />}
                    {currentMode === "battles" && <Battle />}
                    {currentMode === "farming" && <Farming />}
                </div>
                {/* Central bottom */}
                <div className="h-4/10">
                    <InventoryComponent />
                </div>
            </div>

            {/* Right Panel */}
            <div
                className="dialog-border-transparent flex h-full w-1/3 flex-col bg-gradient-to-b from-gray-600 to-gray-900 p-4"
                style={{
                    backgroundImage: `url("/textures/blocks/bricks.png")`,
                    backgroundSize: "48px",
                    imageRendering: "pixelated",
                }}
            >
                <UpgradesComponent />
                <TabSwitcher
                    tabs={[
                        {
                            title: "Craft",
                            icon: "block:crafting_table",
                            content: <CraftsComponent />,
                        },
                        {
                            title: "Smelt",
                            icon: "block:furnace",
                            content: "furnace",
                        },
                    ]}
                    className="h-5/10"
                />
            </div>
        </div>
    );
}
