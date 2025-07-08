import { useGameStore } from "@/stores/game";

export default function CurrentBonuses() {
    const currentBonuses = useGameStore((state) => state.timedBonuses);
    return (
        <div className="flex flex-row">
            {Object.entries(currentBonuses).map(([resource, bonuses]) => (
                <span key={`${resource}-bonuses`}>
                    {bonuses.length > 0 &&
                        bonuses
                            .filter(
                                (bonus) =>
                                    new Date(bonus.expiresAt) >
                                    new Date(Date.now())
                            )
                            .map((bonus, index) => (
                                <span key={index} className="mr-2">
                                    {bonus.baseGain} {resource} ({bonus.source})
                                </span>
                            ))}
                </span>
            ))}
        </div>
    );
}
