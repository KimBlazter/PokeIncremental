import Modal from "@/components/ui/Modal";
import { useModalStore } from "@/stores/modals";
import Achievements from "@/components/achievements/Achievements";

export default function AchievementsButton() {
    const toggle = useModalStore((s) => s.toggle);
    return (
        <div className="mt-auto w-full">
            <button
                onClick={() => toggle("achievements-modal")}
                className="w-full !text-white"
                id="open-achievements-button"
            >
                Achievements
            </button>
            <Modal modalId="achievements-modal">
                <Achievements />
            </Modal>
        </div>
    );
}
