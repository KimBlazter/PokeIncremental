import { useGameStore } from "@/stores/game";
import { HotkeySettingsKeys } from "@/stores/settings";
import { useRef, useState } from "react";

export default function HotkeySettings() {
    const hotkeys = useGameStore((state) => state.hotkeys);
    const changeKey = useGameStore((state) => state.updateHotkey);

    const [editingKey, setEditingKey] = useState<HotkeySettingsKeys | null>(
        null
    );
    const [conflict, setConflict] = useState<string | null>(null);

    const inputRefs = useRef<
        Record<HotkeySettingsKeys, HTMLInputElement | null>
    >({} as any);

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        key: HotkeySettingsKeys
    ) => {
        event.preventDefault();
        const pressedKey = event.key;

        if (pressedKey === "Shift" || pressedKey === "Meta") return;

        // Vérifie si une autre touche est déjà associée
        const conflictKey = Object.entries(hotkeys).find(
            ([otherKey, data]) =>
                otherKey !== key &&
                data.hotkey.toLowerCase() === pressedKey.toLowerCase()
        );

        if (conflictKey) {
            setConflict(
                `Key "${pressedKey}" is already used by "${conflictKey[0]}"`
            );
            return;
        }

        changeKey(key, pressedKey);
        setEditingKey(null);
        setConflict(null);

        const input = inputRefs.current[key];
        if (input) input.blur();
    };

    return (
        <div className="flex flex-col gap-4">
            {Object.entries(hotkeys).map(([key, data]) => {
                const typedKey = key as HotkeySettingsKeys;
                const isEditing = editingKey === typedKey;

                return (
                    <div key={key} className="flex flex-col items-start gap-1">
                        <label className="flex w-full flex-row items-center justify-between gap-2 text-sm font-medium">
                            <span className="min-w-[100px]">{key}</span>
                            <input
                                ref={(el) => {
                                    inputRefs.current[typedKey] = el;
                                }}
                                type="text"
                                readOnly
                                className="dialog-border-transparent w-32 bg-gray-500 p-2 text-center text-white uppercase focus-within:bg-gray-600"
                                value={
                                    isEditing ? "Press a key..." : data.hotkey
                                }
                                onClick={() => {
                                    setEditingKey(typedKey);
                                    setConflict(null);
                                }}
                                onKeyDown={(e) => handleKeyDown(e, typedKey)}
                            />
                        </label>
                        {isEditing && conflict && (
                            <span className="text-sm text-red-400">
                                {conflict}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
