import { useGameStore } from "@/stores/game";
import React from "react";

export default function AgeSplashScreen({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentAge = useGameStore((state) => state.currentAge);
    const ages = useGameStore((state) => state.ages);
    return (
        <div
            className="dialog-border-transparent h-full w-full transition-all"
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
