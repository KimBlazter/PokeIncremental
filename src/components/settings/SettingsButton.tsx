import Modal from "@/components/ui/Modal";
import SaveManager from "../save/SaveManager";
import HotkeySettings from "./HotkeySettings";
import ResetSave from "./ResetSave";
import { useModalStore } from "@/stores/modals";

export default function SettingsButton() {
    const toggle = useModalStore((s) => s.toggle);
    return (
        <div className="w-full">
            <button
                onClick={() => toggle("settings-modal")}
                className="w-full !text-white"
                id="open-settings-button"
            >
                Settings
            </button>
            <Modal modalId="settings-modal">
                <h2 className="mb-12 text-xl font-bold">Settings</h2>
                <HotkeySettings />
                <SaveManager />
                <div className="mt-10 flex w-full justify-end">
                    <ResetSave />
                </div>
            </Modal>
        </div>
    );
}
