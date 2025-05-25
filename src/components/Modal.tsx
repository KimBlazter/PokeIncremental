import { useEffect, useRef, useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    // Animation mount/unmount
    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => setShow(false), 200); // durée = animation exit
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Click dehors / ESC
    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(e: MouseEvent) {
            if (
                overlayRef.current &&
                contentRef.current &&
                e.target instanceof Node &&
                overlayRef.current.contains(e.target) &&
                !contentRef.current.contains(e.target)
            ) {
                onClose();
            }
        }

        function handleEscKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, onClose]);

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
                className={`inventory-border text-mcInventoryText relative w-full max-w-md transform p-2 shadow-lg transition-all duration-200 ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
}
