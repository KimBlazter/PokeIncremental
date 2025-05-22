import { AgeKey } from "@/stores/ages";
import { useGameStore } from "@/stores/game";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";
import { Tooltip } from "./Tooltip";

export default function AgeButton({ ageKey }: { ageKey: AgeKey }) {
    const currentAge = useGameStore((state) => state.currentAge);
    const ageProperties = useGameStore((state) => state.ages[ageKey]);
    const setAge = useGameStore((state) => state.setCurrentAge);
    return (
        <Tooltip
            content={<span>{ageProperties.name} Age</span>}
            position="bottom"
            align="start"
        >
            <div
                className={clsx(
                    "bg-mcInventoryBackground/50 border-inset relative flex aspect-square h-full flex-row items-center justify-center border-2 border-t-white/20 border-r-white/50 border-b-white/50 border-l-white/20 !p-2 text-xs",
                    currentAge !== ageKey ?
                        "!bg-mcInventoryBackground/30 hover:!bg-mcInventoryBackground/50"
                    :   ""
                )}
                onClick={() => setAge(ageKey)}
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
            </div>
        </Tooltip>
    );
}
