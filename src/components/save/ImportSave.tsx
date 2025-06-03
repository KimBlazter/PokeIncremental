import { importSave } from "@/utils/save";

export default function ImportSave() {
    return (
        <button
            onClick={() => {
                const input = window.prompt("Enter your save : ");
                if (input) importSave(input);
            }}
        >
            Import save
        </button>
    );
}
