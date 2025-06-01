import { useGameStore } from "@/stores/game";
import { HotkeySettingsKeys } from "@/stores/settings";
import { ChangeEvent } from "react";

export default function HotkeySettings() {
    const hotkeys = useGameStore((state) => state.hotkeys);
    const changeKey = useGameStore((state) => state.updateHotkey);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        key: HotkeySettingsKeys
    ) => {
        event.preventDefault();

        const value = event.target.value;

        if (value.length > 1) {
            event.target.value = value.slice(-1);
        }

        changeKey(key, event.target.value.toUpperCase());
    };
    return (
        <div className="flex flex-col gap-1">
            {Object.entries(hotkeys).map(([key, data]) => {
                return (
                    <div
                        key={key}
                        className="flex flex-row items-center justify-between"
                    >
                        {key} :{" "}
                        <input
                            type="text"
                            className="dialog-border-transparent aspect-square w-12 bg-gray-500 p-2 text-center text-white uppercase focus-within:bg-gray-600"
                            defaultValue={data.hotkey}
                            onChange={(event) =>
                                handleChange(event, key as HotkeySettingsKeys)
                            }
                            placeholder={data.hotkey}
                            onClick={(event) =>
                                (event.currentTarget.value = "")
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
}
