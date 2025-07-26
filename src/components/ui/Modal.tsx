import { useEffect, useRef, useState } from "react";
import { useModalStore } from "@/stores/modals";

type ModalProps = {
    modalId: string;
    children: React.ReactNode;
};

export default function Modal({ modalId, children }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    const { openModalId, close } = useModalStore();
    const isOpen = openModalId === modalId;

    // Animation
    useEffect(() => {
        if (isOpen) setShow(true);
        else {
            const timeout = setTimeout(() => setShow(false), 200);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // ESC key and click outside to close
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                overlayRef.current &&
                contentRef.current &&
                e.target instanceof Node &&
                overlayRef.current.contains(e.target) &&
                !contentRef.current.contains(e.target)
            ) {
                close();
            }
        };

        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, close]);

    useEffect(() => {
        if (isOpen) {
            // Save the current scroll position
            const scrollY = window.scrollY;

            // Apply styles to block scrolling
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";

            return () => {
                // Restore original styles
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.left = "";
                document.body.style.right = "";
                document.body.style.overflow = "";

                // Restore scroll position
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    if (!show) return null;

    return (
        <div
            ref={overlayRef}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-200 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                ref={contentRef}
                className={`inventory-border text-mcInventoryText relative w-full max-w-xl min-w-md transform p-2 shadow-lg transition-all duration-200 ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <button
                    onClick={() => close()}
                    className="absolute top-0 right-0 flex aspect-square flex-col items-center justify-center !bg-red-500 text-white"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}
