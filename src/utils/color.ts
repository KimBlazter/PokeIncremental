import { ToastType } from "@/stores/toast";

export const toastTypeToColor: Record<ToastType, string> = {
    info: "bg-blue-500",
    achievement: "bg-yellow-500",
    error: "bg-red-500",
    quest: "bg-green-500",
    save: "bg-purple-500",
} as const;

export function hexToRGB(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

const GRAY_TOLERANCE = 20;

export function isGrayscale(r: number, g: number, b: number): boolean {
    return (
        Math.abs(r - g) <= GRAY_TOLERANCE &&
        Math.abs(r - b) <= GRAY_TOLERANCE &&
        Math.abs(g - b) <= GRAY_TOLERANCE
    );
}
