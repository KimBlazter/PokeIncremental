import { useGameStore } from "@/stores/game";

export default function ZoneSelector() {
    const zones = useGameStore((state) => state.combat.zones);
    const selectZone = useGameStore((state) => state.selectZone);
    return (
        <div className="mt-2 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
                {zones.map((zone) => (
                    <button key={zone.id} onClick={() => selectZone(zone.id)}>
                        {zone.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
