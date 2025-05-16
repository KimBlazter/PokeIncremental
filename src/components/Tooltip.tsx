import { ReactNode } from "react";
import clsx from "clsx";

export function Tooltip({
    children,
    content,
    className,
    position = "top",
}: {
    children: ReactNode;
    content: ReactNode;
    className?: string;
    position?: "top" | "bottom" | "left" | "right";
}) {
    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div className={clsx("group relative inline-flex", className)}>
            {children}
            <div
                className={clsx(
                    "tooltip-border absolute z-10 hidden px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:block group-hover:opacity-100",
                    positionClasses[position]
                )}
            >
                {content}
            </div>
        </div>
    );
}
