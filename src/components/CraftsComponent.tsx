import { useGameStore } from "@/stores/game";
import CraftComponent from "./CraftComponent";

export default function CraftsComponent() {
    const crafts = useGameStore((state) => state.crafts);

    return (
        <div className="flex h-4/10 w-full flex-col flex-wrap bg-amber-50">
            {Object.keys(crafts).map((craft) => (
                <CraftComponent
                    key={craft}
                    craft={crafts[craft]}
                    craftId={craft}
                />
            ))}
        </div>
    );
}
