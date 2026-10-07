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
            iconBg: "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20",
            borderHover: "hover:border-blue-500/40",
            badge: "Browse all",
        },
        {
            title: "Pinned",
            description: "Important & quick-access notes",
            count: stats?.data?.pinnedCount ?? 0,
            icon: Pin,
            link: "/app/pinned-notes",
            iconBg: "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20",
            borderHover: "hover:border-amber-500/40",
            badge: "Priority",
        },
        {
            title: "Favorites",
            description: "Starred & essential notes",
            count: stats?.data?.favoritedCount ?? 0,
            icon: Star,
            link: "/app/favorite-notes",
            iconBg: "bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20",
            borderHover: "hover:border-yellow-500/40",
            badge: "Curated",
        },
        {
            title: "Trash",
            description: "Deleted & recoverable items",
            count: stats?.data?.trashCount ?? 0,
            icon: Trash,
            link: "/app/trash-notes",
            iconBg: "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500/20",
            borderHover: "hover:border-rose-500/40",
            badge: "Bin",
        },
    ];

    return (
        <div className=" mx-auto w-full pb-10 space-y-8 animate-in fade-in duration-300">

            {/* Note Editor Area (when open) */}
            {isFormOpen ? (
                <div className="animate-in fade-in-50 zoom-in-95 duration-200">
                    <AddNoteForm
                        onClearEdit={() => dispatch(closeNoteForm())}
                    />
                </div>
            ) : (
                <>

                    {/* Quick Create Note Prompt */}
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

                    {/* Stats Navigation Grid */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                                Overview & Collections
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {statCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <Link key={card.title} to={card.link} className="group focus:outline-none">
                                        <div
                                            className={`h-full relative overflow-hidden p-5 rounded-xl border border-border/60 bg-card/80 backdrop-blur-xs hover:bg-card hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4 ${card.borderHover}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className={`p-2.5 rounded-lg transition-colors duration-200 ${card.iconBg}`}>
                                                    <Icon size={20} strokeWidth={2.2} />
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-muted/70 text-muted-foreground">
                                                        {card.badge}
                                                    </span>
                                                    <ArrowUpRight
                                                        size={16}
                                                        className="text-muted-foreground/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-3xl font-bold tracking-tight text-foreground font-sans">
                                                        {card.count}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground font-medium">notes</span>
                                                </div>
                                                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {card.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
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