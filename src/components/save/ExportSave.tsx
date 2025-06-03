import { exportSave } from "@/utils/save";

export default function ExportSave() {
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(exportSave());
                window.alert("Save copied to clipboard");
            }}
        >
            Export save
        </button>
    );
}
