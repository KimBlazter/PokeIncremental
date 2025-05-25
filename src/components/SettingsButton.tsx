import { useState } from "react";
import Modal from "./Modal";

export default function SettingsButton() {
    const [open, setOpen] = useState(false);
    return (
        <div className="mt-auto w-full">
            <button
                onClick={() => setOpen(true)}
                className="w-full !text-white"
            >
                Settings
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <h2 className="text-xl font-bold">Hello 👋</h2>
                <p className="my-4">Voici une modal personnalisable.</p>
                <button
                    onClick={() => setOpen(false)}
                    className="flex aspect-square flex-col items-center justify-center !bg-red-500 text-white"
                >
                    ×
                </button>
            </Modal>
        </div>
    );
}
