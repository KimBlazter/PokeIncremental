import { TimedBonus } from "@/stores/bonuses";
import { Resource } from "@/stores/resources";
import { useEffect, useState } from "react";

export default function EffectTooltipContent({
    bonus,
    resource,
}: {
    bonus: TimedBonus;
    resource: Resource;
}) {
    const [currentTime, setCurrentTime] = useState(Date.now());

    // Update the current time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Calculate remaining time in seconds
    const getRemainingTime = () => {
        const expiresTime = new Date(bonus.expiresAt).getTime();
        const remaining = Math.max(0, expiresTime - currentTime);
        return Math.floor(remaining / 1000);
    };

    // Format time duration to a readable string
    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m ${remainingSeconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${remainingSeconds}s`;
        }
    };

    const remainingTime = getRemainingTime();
    const formattedTime = formatDuration(remainingTime);

    return (
        <div className="max-w-xs">
            <div className="mb-2 flex flex-row items-end gap-2 text-sm font-semibold text-purple-400">
                {bonus.effectMetadata?.name || "???"}
                <span className="text-xs text-white opacity-50">
                    ({bonus.source} effect)
                </span>
            </div>

            {bonus.effectMetadata?.description && (
                <div className="mb-4 text-xs text-gray-300">
                    {bonus.effectMetadata.description}
                </div>
            )}

            <div className="flex w-full items-center justify-between">
                <div className="flex flex-row gap-1">
                    {bonus.baseGain !== 0 && (
                        <span className="text-green-400">+1 {resource}</span>
                    )}
                    {bonus.multiplier && bonus.multiplier !== 1 && (
                        <span className="text-yellow-400">
                            x{bonus.multiplier.toFixed(2)}
                        </span>
                    )}
                </div>
                <span
                    className={`${remainingTime <= (bonus.effectMetadata?.duration ?? 20) / 4 ? "text-red-400" : "text-white"}`}
                >
                    ⌚ {formattedTime}
                </span>
            </div>
        </div>
    );
}
