import { useGameStore } from "@/stores/game";
import UpgradeComponent from "./UpgradeComponent";
import { AgeKey } from "@/stores/ages";

export default function UpgradesComponent() {
    const upgrades = useGameStore((state) => state.upgrades);
    const ages = useGameStore((state) => state.ages);

    return (
        <div className="flex h-6/10 w-full flex-col gap-2">
            {Object.keys(upgrades).map((upgradeKey) => {
                const upgrade = upgrades[upgradeKey];

                if (
                    !upgrade.ageRequirement ||
                    ages[upgrade.ageRequirement as AgeKey].unlocked
                )
                    return (
                        <UpgradeComponent
                            key={upgradeKey}
                            upgrade={upgrade}
                            upgradeKey={upgradeKey}
                        />
                    );
            })}
        </div>
    );
}
