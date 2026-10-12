import type { Note } from "@/types/note";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin, Star, Trash, RotateCcw, Trash2 } from "lucide-react";
import SafeHtml from "@/components/SafeHtml";
import { AleartDialog } from "./AleartDialog";

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
    return (
        <Card
            onClick={onClick}
            className={`relative flex flex-col h-[190px] sm:h-[200px] overflow-hidden transition-all duration-300 border border-amber-200/80 dark:border-amber-500/20 bg-amber-50/85 dark:bg-amber-950/20 shadow-xs shadow-amber-900/5 hover:shadow-lg hover:shadow-amber-500/15 hover:-translate-y-0.5 py-2.5 sm:py-4 gap-1.5 sm:gap-3 ${onClick ? "cursor-pointer hover:border-amber-400/80 dark:hover:border-amber-500/40" : ""
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
                                            className="cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 text-muted-foreground hover:text-primary hover:bg-amber-200/60 dark:hover:bg-amber-900/40 p-0"
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
                                            className="cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 text-muted-foreground hover:text-destructive hover:bg-amber-200/60 dark:hover:bg-amber-900/40 p-0"
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
                                    className="cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 hover:bg-amber-200/60 dark:hover:bg-amber-900/40 p-0"
                                    variant="ghost"
                                    size="icon"
                                    title={note.isPinned ? "Unpin note" : "Pin note"}
                                >
                                    <Pin
                                        className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-colors ${note.isPinned
                                            ? "fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400"
                                            : "text-muted-foreground hover:text-amber-600"
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
                                    className="cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 hover:bg-amber-200/60 dark:hover:bg-amber-900/40 p-0"
                                    variant="ghost"
                                    size="icon"
                                    title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <Star
                                        className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-colors ${note.isFavorite
                                            ? "fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400"
                                            : "text-muted-foreground hover:text-amber-500"
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
                                            className="cursor-pointer h-5.5 w-5.5 sm:h-6 sm:w-6 text-muted-foreground hover:text-destructive hover:bg-amber-200/60 dark:hover:bg-amber-900/40 p-0"
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
                <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-t from-amber-50/95 dark:from-[#1d170d] to-transparent pointer-events-none" />
            </CardContent>
        </Card>
    );
};
