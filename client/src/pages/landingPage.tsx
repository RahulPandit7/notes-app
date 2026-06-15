import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
    const token = useSelector((state: RootState) => state.auth.token);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    if (token) return <Navigate to="/app" replace />;

    useEffect(() => {
        const blink = setInterval(() => setCursorVisible((v) => !v), 530);
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => {
            clearInterval(blink);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0D0F14] text-[#F2F0EB] font-sans overflow-x-hidden">
            {/* ── NAV ── */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#0D0F14]/90 backdrop-blur-sm border-b border-white/5"
                    : ""
                    }`}
            >
                <div className=" mx-auto flex items-center justify-between px-6 py-4">
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

                    <nav className="flex items-center gap-2">
                        <a
                            href="#features"
                            className="hidden sm:inline-block px-4 py-2 text-sm text-[#9CA3AF] hover:text-[#F2F0EB] transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="/login"
                            className="px-4 py-2 text-sm rounded-lg border border-white/10 text-[#F2F0EB] hover:bg-white/5 transition-colors"
                        >
                            Log in
                        </a>
                        <a
                            href="/login"
                            className="px-4 py-2 text-sm rounded-lg bg-[#E8A838] text-[#0D0F14] font-medium hover:bg-[#F0B845] transition-colors"
                        >
                            Get started
                        </a>
                    </nav>
                </div>
            </header>

            {/* ── HERO ── */}
            <main
                ref={heroRef}
                className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-6 pt-28 pb-20 mx-auto"
            >
                {/* Left — copy */}
                <div className="flex-1 max-w-2xl text-center lg:text-left">
                    <span className="inline-block mb-5 px-3 py-1 text-xs font-medium rounded-full bg-[#E8A838]/10 text-[#E8A838] border border-[#E8A838]/20 tracking-wide uppercase">
                        Your ideas, always within reach
                    </span>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                        Think freely.
                        <br />
                        <span className="text-[#E8A838]">Write clearly.</span>
                        <br />
                        Stay organised.
                    </h2>

                    <p className="mt-6 text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-md mx-auto lg:mx-0">
                        A calm, distraction-free space to capture your thoughts,
                        organise your ideas, and never lose what matters.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <a
                            href="/login"
                            className="px-6 py-3 rounded-xl bg-[#E8A838] text-[#0D0F14] font-semibold text-sm hover:bg-[#F0B845] transition-colors text-center"
                        >
                            Start writing — it's free
                        </a>
                        <a
                            href="#features"
                            className="px-6 py-3 rounded-xl border border-white/10 text-[#F2F0EB] text-sm hover:bg-white/5 transition-colors text-center"
                        >
                            See how it works
                        </a>
                    </div>

                    <p className="mt-5 text-xs text-[#6B7280]">
                        No credit card · No ads · Always yours
                    </p>
                </div>

                {/* Right — floating note card mockup */}
                <div className="relative flex-shrink-0 w-full max-w-sm">
                    {/* Back shadow card */}
                    <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-[#E8A838]/10 border border-[#E8A838]/10" />
                    <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-white/3 border border-white/5" />

                    {/* Main card */}
                    <div className="relative rounded-2xl bg-[#161922] border border-white/8 overflow-hidden shadow-2xl">
                        {/* Card top bar */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1A1E29]">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                            <span className="ml-2 text-xs text-[#6B7280]">
                                New note
                            </span>
                        </div>

                        {/* Card content */}
                        <div className="p-6 font-mono">
                            <p className="text-[#E8A838] text-xs mb-3 tracking-widest uppercase">
                                Meeting Notes · Today
                            </p>
                            <p className="text-[#F2F0EB] text-sm leading-7 mb-1">
                                Things to follow up on:
                            </p>
                            <ul className="text-sm text-[#9CA3AF] leading-8 space-y-0.5 pl-2">
                                <li>
                                    <span className="text-[#E8A838] mr-2">✓</span>
                                    Send the Q3 report
                                </li>
                                <li>
                                    <span className="text-[#E8A838] mr-2">✓</span>
                                    Review the new design
                                </li>
                                <li>
                                    <span className="text-[#6B7280] mr-2">○</span>
                                    Schedule a follow-up call
                                </li>
                                <li>
                                    <span className="text-[#6B7280] mr-2">○</span>
                                    Update the roadmap doc
                                    <span
                                        className={`inline-block w-0.5 h-4 bg-[#E8A838] ml-1 align-middle transition-opacity duration-100 ${cursorVisible
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
                                </li>
                            </ul>
                        </div>

                        {/* Card footer */}
                        <div className="px-6 pb-5 flex items-center gap-3">
                            <button className="text-xs text-[#6B7280] hover:text-[#F2F0EB] transition-colors flex items-center gap-1">
                                <span>📌</span> Pin
                            </button>
                            <button className="text-xs text-[#6B7280] hover:text-[#F2F0EB] transition-colors flex items-center gap-1">
                                <span>⭐</span> Favourite
                            </button>
                            <span className="ml-auto text-xs text-[#3D4148]">
                                Saved
                            </span>
                        </div>
                    </div>

                    {/* Floating tag pill */}
                    <div className="absolute -bottom-4 -right-4 bg-[#1A1E29] border border-white/8 rounded-xl px-4 py-2 text-xs text-[#9CA3AF] flex items-center gap-2 shadow-xl">
                        <span className="w-2 h-2 rounded-full bg-[#28C840] animate-pulse" />
                        Auto-saved
                    </div>
                </div>
            </main>

            {/* ── FEATURES ── */}
            <section
                id="features"
                className="py-20 px-6 max-w-6xl mx-auto"
            >
                {/* Section label */}
                <div className="text-center mb-14">
                    <span className="text-xs font-medium text-[#E8A838] tracking-widest uppercase">
                        Everything you need
                    </span>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-[#F2F0EB]">
                        Built for the way you actually think
                    </h3>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Feature 1 — large */}
                    <div className="sm:col-span-2 lg:col-span-1 group p-6 rounded-2xl bg-[#161922] border border-white/5 hover:border-[#E8A838]/20 transition-all duration-300 hover:bg-[#1A1E29]">
                        <div className="w-10 h-10 rounded-xl bg-[#E8A838]/10 flex items-center justify-center text-xl mb-4">
                            📝
                        </div>
                        <h4 className="font-semibold text-[#F2F0EB] mb-2">
                            Distraction-free writing
                        </h4>
                        <p className="text-sm text-[#6B7280] leading-relaxed">
                            A clean, focused editor that gets out of your way.
                            Just you and your thoughts.
                        </p>
                    </div>

                    <div className="group p-6 rounded-2xl bg-[#161922] border border-white/5 hover:border-[#E8A838]/20 transition-all duration-300 hover:bg-[#1A1E29]">
                        <div className="w-10 h-10 rounded-xl bg-[#E8A838]/10 flex items-center justify-center text-xl mb-4">
                            📌
                        </div>
                        <h4 className="font-semibold text-[#F2F0EB] mb-2">
                            Pin what matters
                        </h4>
                        <p className="text-sm text-[#6B7280] leading-relaxed">
                            Keep your most important notes always at the top of your list.
                        </p>
                    </div>

                    <div className="group p-6 rounded-2xl bg-[#161922] border border-white/5 hover:border-[#E8A838]/20 transition-all duration-300 hover:bg-[#1A1E29]">
                        <div className="w-10 h-10 rounded-xl bg-[#E8A838]/10 flex items-center justify-center text-xl mb-4">
                            ⭐
                        </div>
                        <h4 className="font-semibold text-[#F2F0EB] mb-2">
                            Favourites & Trash
                        </h4>
                        <p className="text-sm text-[#6B7280] leading-relaxed">
                            Mark notes you love, recover ones you deleted. Full control over your notes lifecycle.
                        </p>
                    </div>

                    <div className="group p-6 rounded-2xl bg-[#161922] border border-white/5 hover:border-[#E8A838]/20 transition-all duration-300 hover:bg-[#1A1E29]">
                        <div className="w-10 h-10 rounded-xl bg-[#E8A838]/10 flex items-center justify-center text-xl mb-4">
                            🔍
                        </div>
                        <h4 className="font-semibold text-[#F2F0EB] mb-2">
                            Instant search
                        </h4>
                        <p className="text-sm text-[#6B7280] leading-relaxed">
                            Find any note in milliseconds. No folders, no friction.
                        </p>
                    </div>

                    {/* Wide CTA card */}
                    <div className="sm:col-span-2 group p-6 rounded-2xl bg-[#E8A838]/8 border border-[#E8A838]/15 hover:bg-[#E8A838]/12 transition-all duration-300">
                        <p className="text-[#E8A838] text-xs font-medium tracking-wider uppercase mb-3">
                            Ready to start?
                        </p>
                        <h4 className="font-semibold text-[#F2F0EB] text-lg mb-4">
                            Your thoughts deserve a better home.
                        </h4>
                        <a
                            href="/login"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8A838] text-[#0D0F14] text-sm font-semibold hover:bg-[#F0B845] transition-colors"
                        >
                            Create a free account
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="py-8 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#E8A838] flex items-center justify-center text-[#0D0F14] font-bold text-xs select-none">
                            R
                        </span>
                        <span className="text-sm text-[#6B7280]">
                            R & R Notes
                        </span>
                    </div>
                    <p className="text-xs text-[#3D4148]">
                        © {new Date().getFullYear()} R & R Notes. All rights reserved.
                    </p>
                    <div className="flex gap-5 text-xs text-[#6B7280]">
                        <a href="#" className="hover:text-[#F2F0EB] transition-colors">Privacy</a>
                        <a href="#" className="hover:text-[#F2F0EB] transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}