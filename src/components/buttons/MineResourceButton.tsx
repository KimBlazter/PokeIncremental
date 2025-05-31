import { useGameStore } from "@/stores/game";

export default function MineResourceButton() {
    const resource = useGameStore(
        (state) => state.ages[state.currentAge].collectible
    );
    const addRessource = useGameStore((state) => state.addResource);
    const multiplier = useGameStore((state) => state.multiplier[resource]);
    return (
        <button onClick={() => addRessource(resource, multiplier)}>
            Mine <span className="capitalize">{resource}</span>
        </button>
    );
}
