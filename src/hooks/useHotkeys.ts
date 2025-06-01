import { useGameStore } from "@/stores/game";
import { useEffect } from "react";

export const useHotkeys = () => {
    const hotkeys = useGameStore((state) => state.hotkeys);

    const handleKeyDown = (e: KeyboardEvent) => {
        // Ignore keys pressed in form elements
        if (
            ["INPUT", "TEXTAREA", "SELECT"].includes(
                (e.target as HTMLElement).tagName
            )
        )
            return;

        const key = e.key.toUpperCase();

        //Execute action bound to this key
        Object.entries(hotkeys).forEach((hotkey) => {
            if (hotkey[1].hotkey.toUpperCase() === key) hotkey[1].action();
        });
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [hotkeys]);
};
