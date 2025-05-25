import { useGameStore } from "@/stores/game";
import { Upgrade, UpgradeKey } from "@/stores/upgrades";
import clsx from "clsx";
import { Tooltip } from "./Tooltip";

export default function UpgradeComponent({
    upgradeKey,
    upgrade,
}: {
    upgradeKey: UpgradeKey;
    upgrade: Upgrade;
}) {
    const unlockUpgrade = useGameStore((state) => state.unlockUpgrade);
    const resources = useGameStore((state) => state.resources);
    return (
        <Tooltip
            content={<div>{upgrade.description}</div>}
            position="left"
            align="start"
        >
            <button
                disabled={upgrade.unlocked}
                className="flex w-full flex-col !bg-gray-600"
                onClick={() => {
                    unlockUpgrade(upgradeKey);
                }}
            >
                {upgrade.name}
                {!upgrade.unlocked && (
                    <span className="text-sm text-gray-300 text-shadow-none">
                        {upgrade.cost.resource}: {upgrade.cost.amount}{" "}
                        <span
                            className={clsx(
                                "mc-text-shadow",
                                (
                                    resources[upgrade.cost.resource].amount <
                                        upgrade.cost.amount
                                ) ?
                                    "text-red-400"
                                :   "text-green-400"
                            )}
                        >
                            ({resources[upgrade.cost.resource].amount})
                        </span>
                    </span>
                )}
            </button>
        </Tooltip>
    );
}
