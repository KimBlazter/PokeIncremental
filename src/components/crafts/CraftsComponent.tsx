import { useGameStore } from "@/stores/game";
import CraftComponent from "./CraftComponent";
import { CraftKey } from "@/stores/crafts";

export default function CraftsComponent() {
    const crafts = useGameStore((state) => state.crafts);
    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex flex-row flex-wrap">
                {Object.keys(crafts).map((craft) => (
                    <CraftComponent key={craft} craftId={craft as CraftKey} />
                ))}
            </div>
        </div>
    );
}
