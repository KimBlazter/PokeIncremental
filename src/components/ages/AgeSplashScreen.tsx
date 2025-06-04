import { useGameStore } from "@/stores/game";
import clsx from "clsx";
import React from "react";

export default function AgeSplashScreen({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const currentAge = useGameStore((state) => state.currentAge);
    const ages = useGameStore((state) => state.ages);
    return (
        <div
            className={clsx(
                "dialog-border-transparent h-full w-full transition-all",
                className
            )}
            style={{
                backgroundImage: `url(${ages[currentAge].splashScreenUrl})`,
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 80%",
            }}
        >
            {children}
        </div>
    );
}
