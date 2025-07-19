import { useGameStore } from "@/stores/game";
import ItemIcon from "../ItemIcon";
import clsx from "clsx";
import { Tooltip } from "../ui/Tooltip";
import EffectTooltipContent from "../Tooltips/EffectTooltipContent";
import { useEffect, useState } from "react";
import { Resource } from "@/stores/resources";

export default function CurrentBonuses({ className }: { className?: string }) {
    const currentBonuses = useGameStore((state) => state.timedBonuses);
    const [currentTime, setCurrentTime] = useState(Date.now());

    // Update the current time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Compute the progress percentage
    const getProgressPercentage = (createdAt: string, expiresAt: string) => {
        const createdTime = new Date(createdAt).getTime();
        const expiresTime = new Date(expiresAt).getTime();
        const totalDuration = expiresTime - createdTime;
        const timeElapsed = currentTime - createdTime;
        const progress = Math.max(
            0,
            Math.min(1, 1 - timeElapsed / totalDuration)
        );
        return 1 - progress;
    };

    return (
        <div className={clsx("flex flex-row justify-center", className)}>
            {Object.entries(currentBonuses).map(([resource, bonuses]) => (
                <div key={`${resource}-bonuses`}>
                    {bonuses.length > 0 &&
                        bonuses
                            .filter(
                                (bonus) =>
                                    new Date(bonus.expiresAt) >
                                    new Date(Date.now())
                            )
                            .map((bonus) => {
                                const progress = getProgressPercentage(
                                    bonus.createdAt,
                                    bonus.expiresAt
                                );

                                return (
                                    <Tooltip
                                        key={`${bonus.createdAt}-${bonus.expiresAt}`}
                                        content={
                                            <EffectTooltipContent
                                                bonus={bonus}
                                                resource={resource as Resource}
                                            />
                                        }
                                        align="end"
                                        position="bottom"
                                    >
                                        <div className="dialog-border-transparent relative flex size-12 flex-row items-center justify-center gap-1 overflow-hidden bg-gray-800/50">
                                            <div className="absolute inset-0 top-1/2 left-1/2 size-8 -translate-1/2 rounded-full bg-white/30 blur-xs"></div>
                                            <ItemIcon
                                                texture={
                                                    bonus.effectMetadata
                                                        ?.icon ?? "item:barrier"
                                                }
                                                className="relative size-9"
                                            />

                                            {/* Progress bar */}
                                            <div
                                                className="absolute inset-0 bg-black/30 transition-all duration-1000 ease-linear"
                                                style={{
                                                    transform: `scaleX(${progress})`,
                                                    transformOrigin: "right",
                                                }}
                                            />
                                        </div>
                                    </Tooltip>
                                );
                            })}
                </div>
            ))}
        </div>
    );
}
