import { useGameStore } from "@/stores/game";
import UpgradeComponent from "./UpgradeComponent";
import { AgeKey } from "@/stores/ages";
import { UpgradeKey } from "@/stores/upgrades";

export default function UpgradesComponent() {
    const upgrades = useGameStore((state) => state.upgrades);
    const ages = useGameStore((state) => state.ages);

    return (
        <div className="flex h-6/10 w-full flex-col gap-2">
            {Object.keys(upgrades).map((upgradeKey) => {
                const upgrade = upgrades[upgradeKey as UpgradeKey];

                if (
                    !upgrade.ageRequirement ||
                    ages[upgrade.ageRequirement as AgeKey].unlocked
                )
                    return (
                        <UpgradeComponent
                            key={upgradeKey as UpgradeKey}
                            upgrade={upgrade}
                            upgradeKey={upgradeKey as UpgradeKey}
                        />
                    );
            })}
        </div>
    );
}
