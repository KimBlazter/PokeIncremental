import { ToastType } from "@/stores/toast";

export const toastTypeToColor: Record<ToastType, string> = {
    info: "bg-blue-500",
    achievement: "bg-yellow-500",
    error: "bg-red-500",
    quest: "bg-green-500",
    save: "bg-purple-500",
} as const;
