import { Link } from "@tanstack/react-router";

export default function Header() {
    return (
        <div className="fixed top-0 flex h-12 w-full flex-row items-center bg-gray-900 p-4">
            <h1 className="mr-auto font-semibold">Click&Craft</h1>
            <div className="items center flex flex-row space-x-4">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        </div>
    );
}
