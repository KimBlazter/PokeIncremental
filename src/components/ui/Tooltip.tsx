import { ReactNode, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

type TooltipProps = {
    children: ReactNode;
    content: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    position?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
};

export function Tooltip({
    children,
    content,
    className,
    style,
    position = "top",
    align = "center",
}: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!visible || !triggerRef.current || !tooltipRef.current) return;

        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;

        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top = 0,
            left = 0;

        // Position
        switch (position) {
            case "top":
                top = triggerRect.top - tooltipRect.height - 8;
                break;
            case "bottom":
                top = triggerRect.bottom + 8;
                break;
            case "left":
                top =
                    triggerRect.top +
                    (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - 8;
                break;
            case "right":
                top =
                    triggerRect.top +
                    (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + 8;
                break;
        }

        // Align
        if (position === "top" || position === "bottom") {
            switch (align) {
                case "start":
                    left = triggerRect.left;
                    break;
                case "center":
                    left =
                        triggerRect.left +
                        (triggerRect.width - tooltipRect.width) / 2;
                    break;
                case "end":
                    left = triggerRect.right - tooltipRect.width;
                    break;
            }
        } else {
            switch (align) {
                case "start":
                    top = triggerRect.top;
                    break;
                case "center":
                    top =
                        triggerRect.top +
                        (triggerRect.height - tooltipRect.height) / 2;
                    break;
                case "end":
                    top = triggerRect.bottom - tooltipRect.height;
                    break;
            }
        }

        setCoords({ top: top + window.scrollY, left: left + window.scrollX });
    }, [visible, position, align]);

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className={clsx("inline-flex", className)}
                style={style}
            >
                {children}
            </div>

            {visible &&
                ReactDOM.createPortal(
                    <div
                        ref={tooltipRef}
                        className={clsx(
                            "tooltip-border fixed z-50 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg transition-opacity",
                            visible ? "opacity-100" : "opacity-0",
                            content ? "" : "hidden"
                        )}
                        style={{
                            top: coords.top,
                            left: coords.left,
                        }}
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
}
