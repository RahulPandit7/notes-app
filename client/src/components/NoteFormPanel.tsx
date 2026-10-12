import AddNoteForm from "@/components/AddNoteForm";

interface NoteFormPanelProps {
    showForm: boolean;
    editingNote: import("@/types/note").Note | null;
    onClose: () => void;
}

/**
 * NoteFormPanel
 *
 * Drop-in panel that renders AddNoteForm when showForm or editingNote is truthy.
 * Uses animate-in for a smooth entrance.
 *
 * Usage:
 *   <NoteFormPanel showForm={showForm} editingNote={editingNote} onClose={closeForm} />
 */
export function NoteFormPanel({ showForm, editingNote, onClose }: NoteFormPanelProps) {
    if (!showForm && !editingNote) return null;

    return (
        <div className="mb-4 animate-in fade-in-50 zoom-in-95 duration-200">
            <AddNoteForm editingNote={editingNote} onClearEdit={onClose} />
        </div>
    );
}
