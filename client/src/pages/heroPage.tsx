import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddNoteForm from "@/components/AddNoteForm";
import { Button } from "@/components/ui/button";
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
    Calendar,
    Sparkles,
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

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const currentDateFormatted = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const statCards = [
        {
            title: "All Notes",
            description: "Your complete notes notebook",
            count: stats?.data?.totalCount ?? 0,
            icon: FileText,
            link: "/app/notes",
            accentColor: "text-blue-500",
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
            accentColor: "text-amber-500",
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
            accentColor: "text-yellow-500",
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
            accentColor: "text-rose-500",
            iconBg: "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500/20",
            borderHover: "hover:border-rose-500/40",
            badge: "Bin",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto w-full pb-10 space-y-8 animate-in fade-in duration-300">
            {/* Top Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card/70 to-primary/5 p-6 md:p-8 shadow-sm transition-all">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/40">
                                <Calendar size={13} className="text-primary" />
                                {currentDateFormatted}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                <Sparkles size={12} />
                                Personal Workspace
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-foreground">
                            {getGreeting()},{" "}
                            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
                                {user?.name || "there"}
                            </span>
                        </h1>

                        <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                            Capture thoughts, brainstorm ideas, format rich content, and organize everything in one clean space.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {!isFormOpen ? (
                            <Button
                                onClick={() => dispatch(openNoteForm())}
                                size="lg"
                                className="h-11 px-5 shadow-sm rounded-xl font-medium gap-2 transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Plus size={18} strokeWidth={2.5} />
                                Create Note
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={() => dispatch(closeNoteForm())}
                                size="lg"
                                className="h-11 px-5 rounded-xl font-medium"
                            >
                                Cancel Form
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Note Editor Area (when open) */}
            {isFormOpen ? (
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm animate-in fade-in-50 zoom-in-95 duration-200">
                    <AddNoteForm
                        onClearEdit={() => dispatch(closeNoteForm())}
                    />
                </div>
            ) : (
                <>
                    {/* Quick Scratchpad / Create Note Prompt Bar */}
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
                                <p className="text-xs text-muted-foreground">Click here to quickly start a new rich text note with images, lists, or checklists</p>
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