import { useState } from "react";
import Modal from "@/components/ui/Modal";
import SaveManager from "../save/SaveManager";
import HotkeySettings from "./HotkeySettings";

export default function SettingsButton() {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-full">
            <button
                onClick={() => setOpen(!open)}
                className="w-full !text-white"
                id="open-settings-button"
            >
                Settings
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <h2 className="mb-12 text-xl font-bold">Settings</h2>
                <HotkeySettings />
                <SaveManager />
            </Modal>
        </div>
    );
}
