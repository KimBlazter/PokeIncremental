import { useGameStore } from "@/stores/game";

export default function MineWoodButton() {
    const addRessource = useGameStore((state) => state.addResource);
    return <button onClick={() => addRessource("wood", 2)}>Mine Wood </button>;
}
