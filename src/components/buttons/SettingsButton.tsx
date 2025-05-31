import { useState } from "react";
import Modal from "@/components/ui/Modal";
import SaveManager from "../save/SaveManager";

export default function SettingsButton() {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-full">
            <button
                onClick={() => setOpen(true)}
                className="w-full !text-white"
            >
                Settings
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <h2 className="mb-12 text-xl font-bold">Settings</h2>
                <SaveManager />
            </Modal>
        </div>
    );
}
