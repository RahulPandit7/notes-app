import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";

export default function LandingPage() {
    const token = useSelector(
        (state: RootState) => state.auth.token
    );

    // If user is already logged in, send them straight to the app
    if (token) {
        return <Navigate to="/app" replace />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* NAV */}
            <header className="w-full flex items-center justify-between px-6 py-4 border-b border-border">
                <h1 className="text-xl font-bold">
                    <a href="/" className="hover:cursor-pointer">
                        R & R Notes
                    </a>
                </h1>

                <div className="space-x-3">
                    <a
                        href="/login"
                        className="px-4 py-2 text-sm rounded-md border hover:bg-muted"
                    >
                        Login
                    </a>
                    <a
                        href="/login"
                        className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90"
                    >
                        Get Started
                    </a>
                </div>
            </header>

            {/* HERO */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    Organize your thoughts <br />
                    with simple notes
                </h2>

                <p className="mt-4 text-muted-foreground max-w-xl">
                    A fast, minimal and powerful note-taking app to capture,
                    organize and manage your ideas anywhere.
                </p>

                <div className="mt-6 flex gap-3">
                    <a
                        href="/login"
                        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
                    >
                        Start Writing
                    </a>

                    <a
                        href="#features"
                        className="px-6 py-3 rounded-lg border hover:bg-muted"
                    >
                        Learn More
                    </a>
                </div>
            </main>

            {/* FEATURES */}
            <section
                id="features"
                className="py-16 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
                <div className="p-6 border rounded-xl hover:shadow-sm transition">
                    <h3 className="font-semibold text-lg mb-2">
                        📝 Simple Notes
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Create and manage notes without distractions.
                    </p>
                </div>

                <div className="p-6 border rounded-xl hover:shadow-sm transition">
                    <h3 className="font-semibold text-lg mb-2">
                        📌 Pin & Organize
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Keep important notes always on top.
                    </p>
                </div>

                <div className="p-6 border rounded-xl hover:shadow-sm transition">
                    <h3 className="font-semibold text-lg mb-2">
                        ⭐ Favorites & Trash
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Manage notes lifecycle easily.
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
                © {new Date().getFullYear()} R & R Notes. All rights reserved.
            </footer>
        </div>
    );
}