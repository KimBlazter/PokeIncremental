import { create } from "zustand";
import { nanoid } from "nanoid";
import { produce } from "immer";

export type ToastType = "achievement" | "save" | "info" | "quest" | "error";

export interface Toast {
    id: string;
    title?: string;
    message: string;
    type: ToastType;
    duration: number; // in ms
}

export interface ToastStore {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (toastId: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) =>
        set(
            produce((state: ToastStore) => {
                state.toasts.push({ id: nanoid(), ...toast });
            })
        ),
    removeToast: (toastId) =>
        set(
            produce((state: ToastStore) => {
                state.toasts = state.toasts.filter(
                    (toast) => toastId !== toast.id
                );
            })
        ),
}));
