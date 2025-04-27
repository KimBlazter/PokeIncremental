import { Link } from "@tanstack/react-router";

export default function Header() {
    return (
        <div className="flex flex-row p-4 items-center bg-gray-900 fixed top-0 w-full">
            <h1 className="font-semibold mr-auto">PokeIncremental</h1>
            <div className="flex flex-row items center space-x-4">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        </div>
    );
}
