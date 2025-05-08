import { useGameStore } from "@/stores/game";

export default function UpgradesComponent() {
    const updateMultiplier = useGameStore((state) => state.updateMultiplier);

    const upgrades = [
        {
            name: "first youpi",
            effect: () => {
                console.log("First youpi");
                updateMultiplier("wood", 2);
            },
        },
        { name: "caca", effect: () => updateMultiplier("wood", 100) },
    ];

    return (
        <div>
            {upgrades.map((upgrade) => (
                <button onClick={() => upgrade.effect()} key={upgrade.name}>
                    <div>{upgrade.name}</div>
                </button>
            ))}
        </div>
    );
}
