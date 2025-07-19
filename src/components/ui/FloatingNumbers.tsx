import { createPixelBorder } from "@/utils/text-border";
import { useEffect, useState, useCallback } from "react";

interface FloatingNumberData {
    id: string;
    number: string;
    x: number;
    y: number;
    style: FloatingNumberStyle;
}

type FloatingNumberStyle = {
    color?: string;
    size?: number;
    borderColor?: string;
    borderWidth?: number;
};

export function FloatingNumber({
    number,
    id,
    onComplete,
    x,
    y,
    style = { color: "white", size: 1.5, borderColor: "black", borderWidth: 2 },
}: FloatingNumberData & { onComplete: (id: string) => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete(id);
        }, 1500); // Animation duration

        return () => clearTimeout(timer);
    }, [id, onComplete]);

    return (
        <div
            className="floating-number"
            style={{
                left: x,
                top: y,
                color: style.color,
                fontSize: `${style.size}rem`,
                textShadow: createPixelBorder(
                    style.borderWidth ?? 2,
                    style.borderColor ?? "black"
                ),
                imageRendering: "pixelated",
                fontSmooth: "never",
                WebkitFontSmoothing: "none",
            }}
        >
            {number}
        </div>
    );
}

// Custom hook for easier usage of floating numbers
export function useFloatingNumbers() {
    const [numbers, setNumbers] = useState<FloatingNumberData[]>([]);

    const spawnNumber = useCallback(
        (number: string, x: number, y: number, style: FloatingNumberStyle) => {
            const id = `floating-${Date.now()}-${Math.random()}`;
            const newNumber: FloatingNumberData = {
                id,
                number,
                x,
                y,
                style,
            };

            setNumbers((prev) => [...prev, newNumber]);
            return id;
        },
        []
    );

    const removeNumber = useCallback((id: string) => {
        setNumbers((prev) => prev.filter((num) => num.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setNumbers([]);
    }, []);

    return {
        numbers,
        spawnNumber,
        removeNumber,
        clearAll,
    };
}

// Simplified version that works with the hook
export function FloatingNumbers({
    numbers,
    onNumberComplete,
}: {
    numbers: FloatingNumberData[];
    onNumberComplete: (id: string) => void;
}) {
    return (
        <div className="pointer-events-none absolute inset-0">
            {numbers.map((numberData) => (
                <FloatingNumber
                    key={numberData.id}
                    number={numberData.number}
                    id={numberData.id}
                    x={numberData.x}
                    y={numberData.y}
                    style={numberData.style}
                    onComplete={onNumberComplete}
                />
            ))}
        </div>
    );
}
