import clsx from "clsx";

export default function ProgressBar({
    value,
    maxValue,
    className,
    style,
    progressBarColor = "oklch(72.3% 0.219 149.579)",
}: {
    value: number;
    maxValue: number;
    className?: string;
    style?: React.CSSProperties;
    progressBarColor?: string;
}) {
    return (
        <div
            className={clsx(
                "relative h-3 w-full transform border-3 border-black bg-red-950 transition-all",
                className
            )}
            style={style}
        >
            <div
                className="h-full transition-all duration-200 ease-in-out"
                style={{
                    width: `${(value / maxValue) * 100}%`,
                    backgroundColor: progressBarColor,
                }}
            ></div>
            {/* Progress bar highlight */}
            <div className="absolute top-0 h-1/2 w-19/20 bg-white/30 mix-blend-lighten" />
        </div>
    );
}
