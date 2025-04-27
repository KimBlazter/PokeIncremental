import { createRootRoute, Outlet } from "@tanstack/react-router";

import "@/index.css";
import Header from "@/components/Header";

export const Route = createRootRoute({
    component: () => (
        <>
            <Header />
            <main className="min-h-screen pt-20 p-4">
                <Outlet />
            </main>
        </>
    ),
});
