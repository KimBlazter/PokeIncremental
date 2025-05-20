import { useGameStore } from "@/stores/game";
import CraftComponent from "./CraftComponent";
import { CraftKey } from "@/stores/crafts";

export default function CraftsComponent() {
    const crafts = useGameStore((state) => state.crafts);
    return (
        <div className="flex h-4/10 w-full flex-row flex-wrap bg-amber-900">
            {Object.keys(crafts).map((craft) => (
                <CraftComponent key={craft} craftId={craft as CraftKey} />
            ))}
        </div>
    );
}
