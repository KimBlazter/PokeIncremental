import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

import Header from "@/components/Header";
export const Route = createRootRoute({
    component: () => (
        <>
            <HeadContent />
            <Header />
            <main className="h-screen pt-12">
                <Outlet />
            </main>
        </>
    ),
    head: () => ({
        meta: [
            {
                name: "description",
                content: "A minecraft inspired clicker game",
            },
            {
                title: "Craft&Click",
            },
        ],
        links: [
            {
                href: "/src/assets/css/index.css",
                rel: "stylesheet",
            },
        ],
    }),
});
