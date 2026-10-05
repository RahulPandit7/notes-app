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
                        onKeyDown={(e) => e.key === "Enter" && dispatch(openNoteForm())}
                        className="group flex items-center justify-between p-4 px-5 rounded-xl border border-dashed border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all cursor-pointer shadow-xs"
                    >
                        <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                            <div className="p-2 rounded-lg bg-background border border-border/60 shadow-xs group-hover:border-primary/40 group-hover:text-primary transition-all">
                                <PenLine size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Write something down...</p>
                                <p className="text-xs text-muted-foreground">Click to start a new rich text note with images, lists, or checklists</p>
                            </div>
                        </div>
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            Open editor <Plus size={14} />
                        </span>
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