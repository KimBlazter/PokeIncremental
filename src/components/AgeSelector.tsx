import { AgeKey } from "@/stores/ages";
import { useGameStore } from "@/stores/game";
import AgeButton from "./AgeButton";

export default function AgeSelector() {
    const ages = useGameStore((state) => state.ages);
    const setCurrentAge = useGameStore((state) => state.setCurrentAge);

    return (
        <div className="tooltip-border flex h-14 w-full flex-row">
            {Object.keys(ages).map(
                (ageKey) =>
                    ages[ageKey as AgeKey].unlocked && (
                        <AgeButton
                            key={ageKey}
                            ageKey={ageKey as AgeKey}
                            onClick={setCurrentAge}
                        />
                    )
            )}
        </div>
    );
}
