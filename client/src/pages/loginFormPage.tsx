import { AuthForm } from "@/components/form/AuthForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";

export default function LoginFormPage() {
    const token = useSelector((state: RootState) => state.auth.token);

    if (token) return <Navigate to="/app" replace />;

    return (
        <div className="min-h-screen bg-[#0D0F14] text-[#F2F0EB] flex flex-col">
            {/* ── NAV ── */}
            <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/5">
                <a
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <span className="w-7 h-7 rounded-md bg-[#E8A838] flex items-center justify-center text-[#0D0F14] font-bold text-sm select-none">
                        R
                    </span>
                    <span className="text-base font-semibold tracking-tight">
                        R & R Notes
                    </span>
                </a>

                <a
                    href="/"
                    className="flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#F2F0EB] transition-colors"
                >
                    <span aria-hidden="true">←</span>
                    Back to home
                </a>
            </header>

            {/* ── MAIN ── */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="rounded-2xl bg-[#161922] border border-white/5 overflow-hidden">
                        {/* Card header stripe */}
                        <div className="h-1 w-full bg-[#E8A838]" />

                        <div className="px-8 py-10">


                            {/* Heading */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold tracking-tight text-[#F2F0EB]">
                                    Welcome back
                                </h1>
                                <p className="mt-2 text-sm text-[#6B7280]">
                                    Sign in to continue to your notes
                                </p>
                            </div>

                            {/* Auth form — inherits dark context via CSS vars */}
                            <AuthForm />

                            {/* Divider */}
                            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                <p className="text-xs text-[#3D4148]">
                                    No credit card · No ads · Always yours
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Below-card note */}
                    <p className="mt-6 text-center text-xs text-[#6B7280]">
                        Don't have an account?{" "}
                        <a
                            href="/login"
                            className="text-[#E8A838] hover:text-[#F0B845] transition-colors"
                        >
                            Sign up for free
                        </a>
                    </p>
                </div>
            </main>

            {/* ── FOOTER ── */}
            <footer className="py-5 px-6 border-t border-white/5 text-center">
                <p className="text-xs text-[#3D4148]">
                    © {new Date().getFullYear()} R & R Notes. All rights reserved.
                </p>
            </footer>
        </div>
    );
}