import { createFileRoute } from "@tanstack/react-router";
import InventoryComponent from "@/components/InventoryComponent";
import MineResourceButton from "@/components/buttons/MineResourceButton";
import UpgradesComponent from "@/components/upgrades/UpgradesComponent";
import AgeSelector from "@/components/ages/AgeSelector";
import CraftsComponent from "@/components/crafts/CraftsComponent";
import { useGameStore } from "@/stores/game";
import { useEffect } from "react";
import AgeSplashScreen from "@/components/ages/AgeSplashScreen";
import SettingsButton from "@/components/settings/SettingsButton";
import AchievementsButton from "@/components/achievements/AchievementsButton";
import { useHotkeys } from "@/hooks/useHotkeys";
import TabSwitcher from "@/components/ui/TabSwitcher";

export const Route = createFileRoute("/")({
    component: Index,
});

// IMPORTANT: the id "root" of the first div is mandatory.. else it will break the TanStack Router
function Index() {
    useHotkeys();
    const init = useGameStore((state) => state.init);

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
                <AchievementsButton />
                <SettingsButton />
            </div>

            {/* Central panel */}
            <div className="flex h-full flex-1 flex-col">
                {/* Central top */}
                <div className="flex h-1/2 flex-col gap-1">
                    <AgeSelector />
                    <AgeSplashScreen>
                        <div className="flex h-full w-full flex-col items-center justify-between p-4">
                            <MineResourceButton />
                        </div>
                    </AgeSplashScreen>
                </div>

                {/* Central bottom */}
                <div className="h-1/2">
                    <InventoryComponent />
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex h-full w-1/3 flex-col bg-red-400 p-4">
                <UpgradesComponent />
                <TabSwitcher
                    tabs={[
                        {
                            title: "Craft",
                            icon: "crafting_table",
                            content: <CraftsComponent />,
                        },
                        {
                            title: "Smelt",
                            icon: "furnace",
                            content: "furnace",
                        },
                    ]}
                    className="h-5/10"
                />
            </div>
        </div>
    );
}
