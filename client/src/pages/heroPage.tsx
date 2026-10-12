import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddNoteForm from "@/components/AddNoteForm";
import { closeNoteForm, openNoteForm } from "@/store/slices/uiSlice";
import type { RootState } from "@/store/store";
import { useFetchNoteStatsQuery } from "@/store/api/noteApi";
import { AuthForm } from "@/components/form/AuthForm";
import {
    FileText,
    Pin,
    Plus,
    Star,
    Trash,
    ArrowUpRight,
    PenLine,
    Sparkles,
} from "lucide-react";

export default function HeroPage() {
    const dispatch = useDispatch();
    const { data: stats } = useFetchNoteStatsQuery();

    const isFormOpen = useSelector(
        (state: RootState) => state.ui.isNoteFormOpen
    );

    const user = useSelector(
        (state: RootState) => state.auth.user
    );

    const isLoggedIn = !!user;

    if (!isLoggedIn) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <AuthForm />
            </div>
        );
    }

    const statCards = [
        {
            title: "All Notes",
            description: "Your complete notes notebook",
            count: stats?.data?.totalCount ?? 0,
            icon: FileText,
            link: "/app/notes",
            gradientWash: "from-blue-500/15 via-indigo-500/5 to-transparent dark:from-blue-500/20 dark:via-indigo-500/10",
            topAccent: "from-blue-500 via-indigo-400 to-transparent",
            glowColor: "bg-blue-500/25",
            iconBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/25 group-hover/card:bg-blue-500/25 group-hover/card:ring-blue-500/40",
            borderHover: "hover:border-blue-500/50 hover:shadow-blue-500/15",
            badgeBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500/30",
            dotColor: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]",
            badge: "Browse all",
        },
        {
            title: "Pinned",
            description: "Important & quick-access notes",
            count: stats?.data?.pinnedCount ?? 0,
            icon: Pin,
            link: "/app/pinned-notes",
            gradientWash: "from-amber-500/15 via-orange-500/5 to-transparent dark:from-amber-500/20 dark:via-orange-500/10",
            topAccent: "from-amber-500 via-orange-400 to-transparent",
            glowColor: "bg-amber-500/25",
            iconBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/25 group-hover/card:bg-amber-500/25 group-hover/card:ring-amber-500/40",
            borderHover: "hover:border-amber-500/50 hover:shadow-amber-500/15",
            badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30",
            dotColor: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
            badge: "Priority",
        },
        {
            title: "Favorites",
            description: "Starred & essential notes",
            count: stats?.data?.favoritedCount ?? 0,
            icon: Star,
            link: "/app/favorite-notes",
            gradientWash: "from-purple-500/15 via-pink-500/5 to-transparent dark:from-purple-500/20 dark:via-pink-500/10",
            topAccent: "from-purple-500 via-pink-400 to-transparent",
            glowColor: "bg-purple-500/25",
            iconBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/25 group-hover/card:bg-purple-500/25 group-hover/card:ring-purple-500/40",
            borderHover: "hover:border-purple-500/50 hover:shadow-purple-500/15",
            badgeBg: "bg-purple-500/10 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500/30",
            dotColor: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]",
            badge: "Curated",
        },
        {
            title: "Trash",
            description: "Deleted & recoverable items",
            count: stats?.data?.trashCount ?? 0,
            icon: Trash,
            link: "/app/trash-notes",
            gradientWash: "from-rose-500/15 via-red-500/5 to-transparent dark:from-rose-500/20 dark:via-red-500/10",
            topAccent: "from-rose-500 via-red-400 to-transparent",
            glowColor: "bg-rose-500/25",
            iconBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/25 group-hover/card:bg-rose-500/25 group-hover/card:ring-rose-500/40",
            borderHover: "hover:border-rose-500/50 hover:shadow-rose-500/15",
            badgeBg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/30",
            dotColor: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
            badge: "Bin",
        },
    ];

    return (
        <div className="mx-auto w-full pb-10 space-y-8">

            {/* Note Editor Area (when open) */}
            {isFormOpen ? (
                <div className="animate-in fade-in-50 zoom-in-95 duration-200">
                    <AddNoteForm
                        onClearEdit={() => dispatch(closeNoteForm())}
                    />
                </div>
            ) : (
                <>

                    {/* Quick Create Note Prompt (Sticky on top during scroll) */}
                    <div className="sticky top-0 z-30 -my-2 py-2 backdrop-blur-md bg-muted/40 transition-all">
                        <div
                            onClick={() => dispatch(openNoteForm())}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    dispatch(openNoteForm());
                                }
                            }}
                            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl p-4 sm:p-5 cursor-pointer
                   bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600
                   shadow-lg shadow-fuchsia-500/30
                   transition-all duration-300
                   hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-500/50
                   active:translate-y-0 active:scale-[0.99]
                   focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-400/50 focus-visible:ring-offset-2"
                        >
                        {/* Ambient glow blobs */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-2xl transition-transform duration-500 group-hover:scale-150"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-purple-300/30 blur-2xl"
                        />

                        {/* Shine sweep on hover */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        />

                        <div className="relative flex items-center gap-3.5 sm:gap-4 min-w-0">
                            {/* Icon with soft pulse halo */}
                            <div className="relative shrink-0">
                                <span
                                    aria-hidden
                                    className="absolute inset-0 rounded-xl bg-white/40 animate-ping [animation-duration:2.5s]"
                                />
                                <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-white/30">
                                    <PenLine size={20} className="transition-transform duration-300 group-hover:-rotate-6" />
                                </div>
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm sm:text-base font-bold text-white">
                                        Create New Note
                                    </h3>
                                    <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm">
                                        <Sparkles size={11} /> Quick Note
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-white/90 truncate">
                                    Write something down... Click to start a new rich text note with images, lists, or checklists
                                </p>
                            </div>
                        </div>

                        {/* CTA pill: white so it pops against the gradient */}
                        <div className="relative shrink-0">
                            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 sm:px-4 py-2 text-xs font-bold text-fuchsia-600 shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:bg-fuchsia-50 active:scale-95">
                                <Plus size={15} className="transition-transform duration-300 group-hover:rotate-90" />
                                <span className="hidden sm:inline">Create Note</span>
                                <span className="sm:hidden">New</span>
                            </span>
                        </div>
                    </div>
                </div>

                    {/* Stats Navigation Grid */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mt-2">
                                Overview & Collections
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                            {statCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <Link key={card.title} to={card.link} className="group/card focus:outline-none">
                                        <div
                                            className={`h-full relative overflow-hidden p-3.5 sm:p-5 rounded-2xl border border-border/70 bg-card/90 dark:bg-card/50 backdrop-blur-md shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-3 sm:gap-4 ${card.borderHover}`}
                                        >
                                            {/* Ambient gradient wash */}
                                            <div
                                                aria-hidden
                                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradientWash} opacity-70 group-hover/card:opacity-100 transition-opacity duration-300`}
                                            />

                                            {/* Top accent light bar */}
                                            <div
                                                aria-hidden
                                                className={`pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.topAccent} opacity-50 group-hover/card:opacity-100 transition-opacity duration-300`}
                                            />

                                            {/* Ambient glow sphere */}
                                            <div
                                                aria-hidden
                                                className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full ${card.glowColor} blur-2xl opacity-40 group-hover/card:scale-125 group-hover/card:opacity-80 transition-all duration-500`}
                                            />

                                            {/* Watermark ghost icon */}
                                            <Icon
                                                aria-hidden
                                                className="pointer-events-none absolute -right-1.5 -bottom-1.5 sm:-right-2 sm:-bottom-2 h-14 w-14 sm:h-16 sm:w-16 text-foreground/[0.025] dark:text-white/[0.035] transition-transform duration-500 group-hover/card:scale-110 group-hover/card:-rotate-6"
                                            />

                                            {/* Card Header (Icon + Badge + Arrow) */}
                                            <div className="relative z-10 flex items-start justify-between gap-1.5">
                                                <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 transition-transform duration-300 group-hover/card:scale-110 shadow-xs ${card.iconBg}`}>
                                                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
                                                </div>
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    <span className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs transition-colors ${card.badgeBg}`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${card.dotColor}`} />
                                                        {card.badge}
                                                    </span>
                                                    <span className="hidden sm:flex h-6 w-6 items-center justify-center rounded-full bg-muted/60 text-muted-foreground/70 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-200">
                                                        <ArrowUpRight size={13} strokeWidth={2.5} />
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Stats & Description */}
                                            <div className="relative z-10 space-y-0.5 sm:space-y-1">
                                                <div className="flex items-baseline gap-1.5 sm:gap-2">
                                                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
                                                        {card.count}
                                                    </span>
                                                    <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">notes</span>
                                                </div>
                                                <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover/card:text-primary transition-colors truncate">
                                                    {card.title}
                                                </h3>
                                                <p className="text-[11px] sm:text-xs text-muted-foreground/80 leading-snug sm:leading-relaxed line-clamp-1">
                                                    {card.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}