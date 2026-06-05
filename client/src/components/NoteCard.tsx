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
            className={`relative flex flex-col h-[150px] overflow-hidden transition-all duration-200 border bg-card hover:shadow-md ${onClick ? "cursor-pointer hover:border-primary/40" : ""
                }`}
        >
            <CardHeader className="relative pr-24 pb-2">
                <CardTitle className="line-clamp-1 pr-4 text-base font-semibold">{note.title}</CardTitle>
                <div className="flex gap-1 absolute right-2 top-0" onClick={(e) => e.stopPropagation()}>
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
                                            className="cursor-pointer h-6 w-6 text-muted-foreground hover:text-primary"
                                            variant="ghost"
                                            size="icon"
                                            title="Restore note"
                                        >
                                            <RotateCcw className="h-3.5 w-3.5" />
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
                                            className="cursor-pointer h-6 w-6 text-muted-foreground hover:text-destructive"
                                            title="Delete permanently"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
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
                                    className="cursor-pointer h-6 w-6"
                                    variant="ghost"
                                    size="icon"
                                    title={note.isPinned ? "Unpin note" : "Pin note"}
                                >
                                    <Pin
                                        className={`h-3 w-3 transition-colors ${note.isPinned
                                            ? "fill-orange-500 text-orange-500"
                                            : "text-muted-foreground hover:text-orange-500"
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
                                    className="cursor-pointer h-6 w-6"
                                    variant="ghost"
                                    size="icon"
                                    title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <Star
                                        className={`h-3 w-3 transition-colors ${note.isFavorite
                                            ? "fill-orange-500 text-orange-500"
                                            : "text-muted-foreground hover:text-orange-500"
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
                                            className="cursor-pointer h-6 w-6 text-muted-foreground hover:text-destructive"
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
            <CardContent className="flex-1 text-sm text-muted-foreground overflow-hidden relative pb-5">
                <div className="line-clamp-5">
                    <SafeHtml html={note.content} />
                </div>
                {/* Bottom shadow fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
            </CardContent>
        </Card>
    );
};
