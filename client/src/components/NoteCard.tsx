import type { Note } from "@/types/note";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin, Star, Trash, RotateCcw, Trash2 } from "lucide-react";
import SafeHtml from "@/components/SafeHtml";
import { AleartDialog } from "./AleartDialog";

export interface NoteColorTheme {
    bg: string;
    border: string;
    borderHover: string;
    shadow: string;
    fade: string;
    btnHover: string;
    pinActive: string;
    starActive: string;
}

export const NOTE_LIGHT_THEMES: NoteColorTheme[] = [
    // 0: Warm Pastel Amber / Yellow
    {
        bg: "bg-amber-50/90 dark:bg-amber-950/20",
        border: "border-amber-200/80 dark:border-amber-500/20",
        borderHover: "hover:border-amber-400 dark:hover:border-amber-500/40",
        shadow: "shadow-amber-900/5 hover:shadow-amber-500/15",
        fade: "from-amber-50/95 dark:from-[#1d170d]",
        btnHover: "hover:bg-amber-200/60 dark:hover:bg-amber-900/40",
        pinActive: "fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400",
        starActive: "fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400",
    },
    // 1: Pastel Sky Blue
    {
        bg: "bg-sky-50/90 dark:bg-sky-950/20",
        border: "border-sky-200/80 dark:border-sky-500/20",
        borderHover: "hover:border-sky-400 dark:hover:border-sky-500/40",
        shadow: "shadow-sky-900/5 hover:shadow-sky-500/15",
        fade: "from-sky-50/95 dark:from-[#0d1824]",
        btnHover: "hover:bg-sky-200/60 dark:hover:bg-sky-900/40",
        pinActive: "fill-sky-600 text-sky-600 dark:fill-sky-400 dark:text-sky-400",
        starActive: "fill-sky-500 text-sky-500 dark:fill-sky-400 dark:text-sky-400",
    },
    // 2: Pastel Emerald / Mint
    {
        bg: "bg-emerald-50/90 dark:bg-emerald-950/20",
        border: "border-emerald-200/80 dark:border-emerald-500/20",
        borderHover: "hover:border-emerald-400 dark:hover:border-emerald-400/40",
        shadow: "shadow-emerald-900/5 hover:shadow-emerald-500/15",
        fade: "from-emerald-50/95 dark:from-[#0c1c14]",
        btnHover: "hover:bg-emerald-200/60 dark:hover:bg-emerald-900/40",
        pinActive: "fill-emerald-600 text-emerald-600 dark:fill-emerald-400 dark:text-emerald-400",
        starActive: "fill-emerald-500 text-emerald-500 dark:fill-emerald-400 dark:text-emerald-400",
    },
    // 3: Pastel Rose / Blush
    {
        bg: "bg-rose-50/90 dark:bg-rose-950/20",
        border: "border-rose-200/80 dark:border-rose-500/20",
        borderHover: "hover:border-rose-400 dark:hover:border-rose-400/40",
        shadow: "shadow-rose-900/5 hover:shadow-rose-500/15",
        fade: "from-rose-50/95 dark:from-[#1f0f14]",
        btnHover: "hover:bg-rose-200/60 dark:hover:bg-rose-900/40",
        pinActive: "fill-rose-600 text-rose-600 dark:fill-rose-400 dark:text-rose-400",
        starActive: "fill-rose-500 text-rose-500 dark:fill-rose-400 dark:text-rose-400",
    },
    // 4: Pastel Lavender / Violet
    {
        bg: "bg-purple-50/90 dark:bg-purple-950/20",
        border: "border-purple-200/80 dark:border-purple-500/20",
        borderHover: "hover:border-purple-400 dark:hover:border-purple-400/40",
        shadow: "shadow-purple-900/5 hover:shadow-purple-500/15",
        fade: "from-purple-50/95 dark:from-[#161024]",
        btnHover: "hover:bg-purple-200/60 dark:hover:bg-purple-900/40",
        pinActive: "fill-purple-600 text-purple-600 dark:fill-purple-400 dark:text-purple-400",
        starActive: "fill-purple-500 text-purple-500 dark:fill-purple-400 dark:text-purple-400",
    },
    // 5: Pastel Peach / Coral
    {
        bg: "bg-orange-50/90 dark:bg-orange-950/20",
        border: "border-orange-200/80 dark:border-orange-500/20",
        borderHover: "hover:border-orange-400 dark:hover:border-orange-400/40",
        shadow: "shadow-orange-900/5 hover:shadow-orange-500/15",
        fade: "from-orange-50/95 dark:from-[#21140b]",
        btnHover: "hover:bg-orange-200/60 dark:hover:bg-orange-900/40",
        pinActive: "fill-orange-600 text-orange-600 dark:fill-orange-400 dark:text-orange-400",
        starActive: "fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400",
    },
    // 6: Pastel Teal / Aqua
    {
        bg: "bg-teal-50/90 dark:bg-teal-950/20",
        border: "border-teal-200/80 dark:border-teal-500/20",
        borderHover: "hover:border-teal-400 dark:hover:border-teal-400/40",
        shadow: "shadow-teal-900/5 hover:shadow-teal-500/15",
        fade: "from-teal-50/95 dark:from-[#0c1c1a]",
        btnHover: "hover:bg-teal-200/60 dark:hover:bg-teal-900/40",
        pinActive: "fill-teal-600 text-teal-600 dark:fill-teal-400 dark:text-teal-400",
        starActive: "fill-teal-500 text-teal-500 dark:fill-teal-400 dark:text-teal-400",
    },
];

/**
 * Returns a consistent pseudo-random light color theme for a note card based on its id or title.
 */
export function getNoteRandomColor(seed: number | string | undefined): NoteColorTheme {
    if (typeof seed === "number") {
        return NOTE_LIGHT_THEMES[Math.abs(seed) % NOTE_LIGHT_THEMES.length];
    }
    if (typeof seed === "string" && seed.length > 0) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash << 5) - hash + seed.charCodeAt(i);
            hash |= 0;
        }
        return NOTE_LIGHT_THEMES[Math.abs(hash) % NOTE_LIGHT_THEMES.length];
    }
    return NOTE_LIGHT_THEMES[0];
}

interface NoteCardProps {
    note: Note;
    onClick?: () => void;
    onPinToggle?: (e: React.MouseEvent) => void;
    onFavoriteToggle?: (e: React.MouseEvent) => void;
    onDelete?: (e: React.MouseEvent) => void;
    onRestore?: (e: React.MouseEvent) => void;
    onDeleteForever?: (e: React.MouseEvent) => void;
    isTrash?: boolean;
}

export const NoteCard = ({
    note,
    onClick,
    onPinToggle,
    onFavoriteToggle,
    onDelete,
    onRestore,
    onDeleteForever,
    isTrash = false,
}: NoteCardProps) => {
    const theme = getNoteRandomColor(note.id ?? note.title);

    return (
        <Card
            onClick={onClick}
            className={`relative flex flex-col h-[190px] sm:h-[200px] overflow-hidden transition-all duration-300 border ${theme.border} ${theme.bg} shadow-xs ${theme.shadow} hover:shadow-lg hover:-translate-y-0.5 py-2.5 sm:py-4 gap-1.5 sm:gap-3 ${onClick ? `cursor-pointer ${theme.borderHover}` : ""
                }`}
        >
            <CardHeader className="relative px-2.5 sm:px-4 pt-0 pb-1 sm:pb-2 pr-[4.5rem] sm:pr-24">
                <CardTitle className="line-clamp-1 pr-1 text-sm sm:text-base font-semibold text-foreground">{note.title}</CardTitle>
                <div className="flex gap-0.5 sm:gap-1 absolute right-1.5 sm:right-2 top-0" onClick={(e) => e.stopPropagation()}>
                    {isTrash ? (
                        <>
                            {onRestore && (
                                <AleartDialog
                                    title="Restore Note"
                                    description="Are you sure you want to restore this note?"
                                    confirmText="Restore"
                                    onConfirm={() => onRestore({} as React.MouseEvent)}
                                    trigger={
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className={`cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 text-muted-foreground hover:text-primary ${theme.btnHover} p-0`}
                                            variant="ghost"
                                            size="icon"
                                            title="Restore note"
                                        >
                                            <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                        </Button>
                                    }
                                />
                            )}
                            {onDeleteForever && (
                                <AleartDialog
                                    title="Delete Note"
                                    description="Are you sure you want to delete this note permanently?"
                                    confirmText="Delete"
                                    onConfirm={() => onDeleteForever({} as React.MouseEvent)}
                                    trigger={
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant="ghost"
                                            size="icon"
                                            className={`cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 text-muted-foreground hover:text-destructive ${theme.btnHover} p-0`}
                                            title="Delete permanently"
                                        >
                                            <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                        </Button>
                                    }
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {onPinToggle && (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onPinToggle(e);
                                    }}
                                    className={`cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 ${theme.btnHover} p-0`}
                                    variant="ghost"
                                    size="icon"
                                    title={note.isPinned ? "Unpin note" : "Pin note"}
                                >
                                    <Pin
                                        className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-colors ${note.isPinned
                                            ? theme.pinActive
                                            : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    />
                                </Button>
                            )}
                            {onFavoriteToggle && (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFavoriteToggle(e);
                                    }}
                                    className={`cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 ${theme.btnHover} p-0`}
                                    variant="ghost"
                                    size="icon"
                                    title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <Star
                                        className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-colors ${note.isFavorite
                                            ? theme.starActive
                                            : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    />
                                </Button>
                            )}
                            {onDelete && (
                                <AleartDialog
                                    title="Move Note to Trash"
                                    description="Are you sure you want to move this note to trash? You can restore it later from the trash."
                                    confirmText="Move to Trash"
                                    onConfirm={() => onDelete({} as React.MouseEvent)}
                                    trigger={
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant="ghost"
                                            size="icon"
                                            className={`cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 text-muted-foreground hover:text-destructive ${theme.btnHover} p-0`}
                                            title="Move to trash"
                                        >
                                            <Trash className="h-2.5 w-2.5" />
                                        </Button>
                                    }
                                />
                            )}
                        </>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-1 px-2.5 sm:px-4 text-xs sm:text-sm text-foreground/80 dark:text-muted-foreground overflow-hidden relative pb-4 sm:pb-5">
                <div className="line-clamp-6 sm:line-clamp-7">
                    <SafeHtml html={note.content} className="[&_img]:max-h-28 sm:[&_img]:max-h-36 [&_img]:w-auto [&_img]:rounded-md [&_img]:object-cover [&_img]:my-1" />
                </div>
                {/* Bottom shadow fade overlay */}
                <div className={`absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-t ${theme.fade} to-transparent pointer-events-none`} />
            </CardContent>
        </Card>
    );
};
