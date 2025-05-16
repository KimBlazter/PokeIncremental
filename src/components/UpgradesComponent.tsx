import { useGameStore } from "@/stores/game";
import clsx from "clsx";

export default function UpgradesComponent() {
    const upgrades = useGameStore((state) => state.upgrades);
    const unlockUpgrade = useGameStore((state) => state.unlockUpgrade);
    const ressources = useGameStore((state) => state.resources);

    return (
        <div className="flex flex-col gap-2">
            {Object.keys(upgrades).map((upgradeKey) => {
                const upgrade = upgrades[upgradeKey];
                return (
                    <button
                        key={upgradeKey}
                        disabled={upgrade.unlocked}
                        className="flex flex-col"
                        onClick={() => {
                            unlockUpgrade(upgradeKey);
                        }}
                    >
                        {upgrade.name}
                        {!upgrade.unlocked && (
                            <span className="text-sm text-white/40">
                                {upgrade.cost.ressource}: {upgrade.cost.amount}{" "}
                                <span
                                    className={clsx(
                                        (
                                            ressources[upgrade.cost.ressource]
                                                .amount < upgrade.cost.amount
                                        ) ?
                                            "text-red-400"
                                        :   "text-green-400"
                                    )}
                                >
                                    ({ressources[upgrade.cost.ressource].amount}
                                    )
                                </span>
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
