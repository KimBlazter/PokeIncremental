import { formatNumber } from "@/utils/number-formatting-compact";
import { createPixelBorder } from "@/utils/text-border";
import clsx from "clsx";

export default function ProgressCounter({
    value,
    maxValue,
    className,
    style,
    borderStyle = {
        size: 2,
        color: "black",
    },
}: {
    value: number;
    maxValue: number;
    className?: string;
    style?: React.CSSProperties;
    borderStyle?: {
        size: number;
        color: string;
    };
}) {
    return (
        <div
            className={clsx("transition-all", className)}
            style={{
                textShadow: createPixelBorder(
                    borderStyle.size,
                    borderStyle.color
                ),
                ...style,
            }}
        >
            <span>
                {formatNumber(value, 3, 3, 10)}/
                {formatNumber(maxValue, 2, 3, 10)}
            </span>
        </div>
    );
}
