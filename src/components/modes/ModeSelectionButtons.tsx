import { useGameStore } from "@/stores/game";

export default function ModeSelectionButtons() {
    const setMode = useGameStore((state) => state.setCurrentMode);
    return (
        <div className="flex flex-col gap-1 [&>button]:transition-all">
            <button
                onClick={() => setMode("mining")}
                className="!bg-gradient-to-b from-gray-400 to-gray-600 hover:brightness-110"
                // style={{
                //     backgroundImage: 'url("/textures/blocks/stone.png")',
                //     backgroundSize: "32px",
                //     imageRendering: "pixelated",
                // }}
            >
                Mining
            </button>
            <button
                onClick={() => setMode("battles")}
                className="!bg-gradient-to-b from-amber-500 to-orange-700 hover:brightness-110"
            >
                Battle
            </button>
            <button
                onClick={() => setMode("farming")}
                className="!bg-gradient-to-b from-green-500 to-green-800 hover:brightness-110"
            >
                Farming
            </button>
        </div>
    );
}
