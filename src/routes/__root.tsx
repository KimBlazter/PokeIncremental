import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

import Header from "@/components/Header";
import ToastContainer from "@/components/ui/ToastContainer";
import "@/assets/css/index.css";

export const Route = createRootRoute({
    component: () => (
        <>
            <HeadContent />
            <Header />
            <main className="h-screen pt-12">
                <Outlet />
            </main>
            <ToastContainer />
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
    }),
});
