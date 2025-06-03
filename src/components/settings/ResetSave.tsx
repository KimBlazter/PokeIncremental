import clsx from "clsx";

export default function ResetSave({ className }: { className?: string }) {
    const handleResetSave = () => {
        if (
            !window.confirm(
                "WARNING: All data will be permanently wiped. Are you sure you want to reset your save?"
            )
        )
            return;
        // Wiping save data from localstorage
        localStorage.clear();
        console.log("Save data has been reset successfully");
        // Reload page after wiping data to clear current game data
        window.location.reload();
    };

    return (
        <button
            className={clsx("!bg-red-700", className)}
            onClick={() => handleResetSave()}
        >
            RESET SAVE
        </button>
    );
}
