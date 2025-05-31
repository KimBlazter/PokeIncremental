import { AgeKey } from "@/stores/ages";
import { useGameStore } from "@/stores/game";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";
import { Tooltip } from "../ui/Tooltip";

export default function AgeButton({
    ageKey,
    onClick,
}: {
    ageKey: AgeKey;
    onClick: (age: AgeKey) => void;
}) {
    const currentAge = useGameStore((state) => state.currentAge);
    const ageProperties = useGameStore((state) => state.ages[ageKey]);
    return (
        <Tooltip
            content={<span>{ageProperties.name} Age</span>}
            position="bottom"
            align="start"
        >
            <button
                className={clsx(
                    "relative flex aspect-square h-12 flex-row items-center justify-center",
                    currentAge !== ageKey && "!bg-white/30"
                )}
                onClick={() => onClick(ageKey)}
            >
                <div
                    aria-hidden
                    className={clsx(
                        "icon-minecraft aspect-square",
                        getTextureFromIdentifier(
                            ageProperties.iconIdentifier ?? "barrier"
                        )
                    )}
                />
                {}
            </button>
        </Tooltip>
    );
}
