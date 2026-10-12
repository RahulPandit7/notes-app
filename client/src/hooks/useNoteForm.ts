import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import type { RootState } from "@/store/store";
import { closeNoteForm } from "@/store/slices/uiSlice";
import type { Note } from "@/types/note";

interface OutletCtx {
    showAddForm: boolean;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
    editingNote: Note | null;
    setEditingNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

/**
 * useNoteForm
 *
 * Single hook that merges:
 *  - Redux `isNoteFormOpen`  (set by FAB / heroPage)
 *  - Outlet-context `showAddForm` (set by per-page Add buttons)
 *  - Outlet-context `editingNote` (set when editing an existing note)
 *
 * Usage in any page:
 *   const { showForm, editingNote, openForm, closeForm, startEditing } = useNoteForm();
 */
export function useNoteForm() {
    const dispatch = useDispatch();
    const isFormOpen = useSelector((state: RootState) => state.ui.isNoteFormOpen);

    const { showAddForm, setShowAddForm, editingNote, setEditingNote } =
        useOutletContext<OutletCtx>();

    /** True whenever the add/edit form should be visible */
    const showForm = showAddForm || isFormOpen || !!editingNote;

    /** Open the create-new form */
    const openForm = () => setShowAddForm(true);

    /** Close form and reset all related state */
    const closeForm = () => {
        setEditingNote(null);
        setShowAddForm(false);
        dispatch(closeNoteForm());
    };

    /** Start editing an existing note */
    const startEditing = (note: Note) => {
        setEditingNote({ ...note });
        setShowAddForm(false);
        dispatch(closeNoteForm()); // make sure Redux flag is off so only editingNote drives it
    };

    return {
        showForm,
        editingNote,
        openForm,
        closeForm,
        startEditing,
    };
}
