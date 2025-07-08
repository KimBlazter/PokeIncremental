import { AgeKey } from "@/stores/ages";
import { useGameStore } from "@/stores/game";
import clsx from "clsx";
import { Tooltip } from "../ui/Tooltip";
import ItemIcon from "../ItemIcon";

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
                    "relative flex aspect-square h-12 flex-row items-center justify-center !p-0.5",
                    currentAge !== ageKey && "!bg-white/30"
                )}
                onClick={() => onClick(ageKey)}
            >
                <ItemIcon
                    texture={ageProperties.texture}
                    className="aspect-square size-10"
                />
            </button>
        </Tooltip>
    );
}
