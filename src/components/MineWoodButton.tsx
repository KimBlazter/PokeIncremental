import { useGameStore } from "@/stores/game";

export default function MineWoodButton() {
    const addRessource = useGameStore((state) => state.addResource);
    const multiplier = useGameStore((state) => state.multiplier.wood);
    return (
        <button onClick={() => addRessource("wood", multiplier)}>
            Mine Wood{" "}
        </button>
    );
}
