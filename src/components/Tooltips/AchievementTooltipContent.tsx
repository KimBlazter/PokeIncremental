import { Achievement } from "@/stores/achivements";
import clsx from "clsx";

export default function AchievementTooltipContent({
    achievement,
    visible = true,
}: {
    achievement: Achievement;
    visible?: boolean;
}) {
    return (
        <div
            className={clsx(
                "flex max-w-70 flex-col text-wrap",
                !visible ? "!max-w-40 items-center" : "items-start"
            )}
        >
            {/* Title */}
            <h3
                className={clsx(
                    "mb-2 text-lg font-bold",
                    !visible ? "hidden" : "leading-4.5",
                    achievement.unlocked ? "text-green-400" : "text-gray-300"
                )}
            >
                {visible ? achievement.name : "???"}
            </h3>
            {/* Description */}
            <p
                className={clsx(
                    "mb-1 text-sm leading-4 text-gray-300/70",
                    !visible ? "text-center" : ""
                )}
            >
                {visible ?
                    achievement.unlocked ?
                        achievement.description
                    :   achievement.hint
                :   "Unlock earlier achievements to reveal the details of this one."
                }
            </p>
        </div>
    );
}
