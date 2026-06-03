import { useDispatch, useSelector } from "react-redux";
import { openNoteForm } from "@/store/slices/uiSlice";
import type { RootState } from "@/store/store";
import AddNoteForm from "@/components/AddNoteForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HeroPage() {
    const dispatch = useDispatch();
    const isFormOpen = useSelector((state: RootState) => state.ui.isNoteFormOpen);

    return (
        <div className="p-4 flex justify-center items-center flex-col gap-4 w-full">
            {!isFormOpen ? (
                <>
                    <h1>Wel-Come Note App</h1>
                    <Button
                        onClick={() => dispatch(openNoteForm())}
                        className="flex items-center gap-1 cursor-pointer bg-primary hover:bg-primary/95"
                    >
                        <Plus size={16} /> Add New Note
                    </Button>
                </>
            ) : (
                <AddNoteForm />
            )}
        </div>
    );
}