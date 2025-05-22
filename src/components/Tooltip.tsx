import { ReactNode } from "react";
import clsx from "clsx";

export function Tooltip({
    children,
    content,
    className,
    position = "top",
    align = "center",
}: {
    children: ReactNode;
    content: ReactNode;
    className?: string;
    position?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}) {
    const basePosition = {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
        left: "right-full mr-2",
        right: "left-full ml-2",
    };

    const alignment = {
        top: {
            start: "left-0",
            center: "left-1/2 -translate-x-1/2",
            end: "right-0",
        },
        bottom: {
            start: "left-0",
            center: "left-1/2 -translate-x-1/2",
            end: "right-0",
        },
        left: {
            start: "top-0",
            center: "top-1/2 -translate-y-1/2",
            end: "bottom-0",
        },
        right: {
            start: "top-0",
            center: "top-1/2 -translate-y-1/2",
            end: "bottom-0",
        },
    };

    return (
        <div className={clsx("group relative inline-flex", className)}>
            {children}
            <div
                className={clsx(
                    "tooltip-border absolute z-10 hidden px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:block group-hover:opacity-100",
                    basePosition[position],
                    alignment[position][align]
                )}
            >
                {content}
            </div>
        </div>
    );
}
