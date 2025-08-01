import AgeSelector from "../../ages/AgeSelector";
import AgeSplashScreen from "../../ages/AgeSplashScreen";
import CurrentBonuses from "../../bonuses/CurrentBonuses";
import MineResourceButton from "./MineResourceButton";
import ArmorsHotbar from "../../equipments/ArmorsHotbar";
import ToolsHotbar from "../../equipments/ToolsHotbar";

export default function Mining() {
    return (
        <div className="flex h-full w-full flex-col">
            <AgeSelector />
            <AgeSplashScreen className="relative flex items-center">
                <div className="flex h-full w-full flex-col items-center justify-center p-4">
                    <MineResourceButton />
                </div>
                <ToolsHotbar className="absolute right-0 mr-0.5" />
                <ArmorsHotbar className="absolute left-0 ml-0.5" />
                {/* Current bonuses */}
                <CurrentBonuses className="absolute top-0 left-1/2 mt-3 h-12 w-7/10 -translate-x-1/2" />
            </AgeSplashScreen>
        </div>
    );
}
