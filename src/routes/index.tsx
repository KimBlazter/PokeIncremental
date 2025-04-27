import { useGameLoop } from "@/hooks/useGameLoop";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

// IMPORTANT: the id "root" of the first div is mandatory.. else it will break the TanStack Router
function Index() {
    const { totalTicks } = useGameLoop();
    return (
        <div id="root">
            <h1>Game</h1>
            <span>Total ticks: {totalTicks}</span>
        </div>
    );
}
