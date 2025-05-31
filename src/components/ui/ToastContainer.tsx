import { useToastStore } from "@/stores/toast";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ToastContainer() {
    const { toasts, removeToast } = useToastStore();
    const [leavingToasts, setLeavingToasts] = useState<Set<string>>(new Set());

    useEffect(() => {
        const timers = toasts.map((toast) => {
            const id = toast.id;
            return setTimeout(() => {
                setLeavingToasts((prev) => new Set(prev).add(id));
                setTimeout(() => {
                    removeToast(id);
                    setLeavingToasts((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(id);
                        return newSet;
                    });
                }, 300); // durée de l'animation de sortie
            }, toast.duration ?? 3000);
        });

        return () => timers.forEach(clearTimeout);
    }, [toasts]);

    return (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => {
                const isLeaving = leavingToasts.has(toast.id);
                return (
                    <div
                        key={toast.id}
                        className={clsx(
                            "dialog-border-transparent !bg-amber-400 p-4 text-lg text-black/70 shadow-md transition-all",
                            isLeaving ? "toast-leave" : "toast-enter"
                        )}
                    >
                        {toast.message}
                    </div>
                );
            })}
        </div>
    );
}
