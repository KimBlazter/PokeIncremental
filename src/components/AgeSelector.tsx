import { AgeKey } from "@/stores/ages";
import { useGameStore } from "@/stores/game";

export default function AgeSelector() {
    const ages = useGameStore((state) => state.ages);
    const setCurrentAge = useGameStore((state) => state.setCurrentAge);

    return (
        <div className="tooltip-border h-12 w-full">
            {Object.keys(ages).map(
                (ageKey) =>
                    ages[ageKey as AgeKey].unlocked && (
                        <button
                            key={ageKey}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentAge(ageKey as AgeKey);
                            }}
                        >
                            {ageKey}
                        </button>
                    )
            )}
        </div>
    );
}
