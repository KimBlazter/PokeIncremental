import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useGameStore } from "@/stores/game";
import ItemIcon from "../ItemIcon";
import clsx from "clsx";

export default function AchievementsButton() {
    const achievements = useGameStore((state) => state.achievements);

    const [open, setOpen] = useState(false);
    return (
        <div className="mt-auto w-full">
            <button
                onClick={() => setOpen(!open)}
                className="w-full !text-white"
                id="open-achievements-button"
            >
                Achievements
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div>
                    <h2 className="mb-6 text-xl font-bold">Achievements</h2>

                    <div
                        className="dialog-border-transparent flex flex-col gap-1 p-5"
                        style={{
                            backgroundImage:
                                "url('/textures/blocks/stone.png')",
                            backgroundSize: "48px",
                        }}
                    >
                        {Object.entries(achievements).map(([achKey, ach]) => (
                            <div
                                key={achKey}
                                className={clsx(
                                    "dialog-border-transparent bg-mcInventoryBackground flex h-full w-full flex-row gap-2 p-4",
                                    !ach.unlocked ? "" : "!bg-green-400"
                                )}
                            >
                                <div className="item-slot bg-mcSlotBackground flex aspect-square size-12 items-center justify-center">
                                    <ItemIcon
                                        textureIdentifier={
                                            ach.texture_identifier
                                        }
                                    />
                                </div>

                                <div className="flex h-full w-full flex-col items-start justify-center">
                                    <span>{ach.name}</span>
                                    <p className="text-sm opacity-50">
                                        A really good description...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
