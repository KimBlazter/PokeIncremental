import { exportSave, importSave } from "@/utils/save";

export default function SaveManager() {
    return (
        <div className="flex flex-row gap-3">
            <button
                onClick={() => {
                    navigator.clipboard.writeText(exportSave());
                    window.alert("Save copied to clipboard");
                }}
            >
                Export save
            </button>
            <button
                onClick={() => {
                    const input = window.prompt("Enter your save : ");
                    if (input) importSave(input);
                }}
            >
                Import save
            </button>
        </div>
    );
}
