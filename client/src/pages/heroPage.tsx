import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AddNoteForm from "@/components/AddNoteForm";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { openNoteForm, closeNoteForm } from "@/store/slices/uiSlice";
import { logout } from "@/store/slices/authSlice";

import type { RootState } from "@/store/store";

import { useFetchNoteStatsQuery } from "@/store/api/noteApi";

import {
    Plus,
    FileText,
    Pin,
    Star,
    Trash,
    LogOut,
} from "lucide-react";
import { AuthForm } from "@/components/form/AuthForm";

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

    const handleLogout = () => {
        dispatch(logout());
        dispatch(closeNoteForm());
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <AuthForm />
            </div>
        );
    }

    return (
        <div className="w-full p-4 space-y-6">
            {/* Header */}
            <Card className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">
                        Welcome, {user?.name}
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your notes efficiently.
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </Card>

            {/* Note Form */}
            {isFormOpen ? (
                <Card className="p-6">
                    <AddNoteForm
                        onClearEdit={() =>
                            dispatch(closeNoteForm())
                        }
                    />
                </Card>
            ) : (
                <>
                    {/* Add Note */}
                    <Card className="p-6">
                        <Button
                            onClick={() =>
                                dispatch(openNoteForm())
                            }
                            className="w-full md:w-auto"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Note
                        </Button>
                    </Card>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/notes">
                            <Card className="p-5 hover:shadow-md transition">
                                <FileText className="mb-3" />
                                <h3 className="text-2xl font-bold">
                                    {stats?.data?.totalCount ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Notes
                                </p>
                            </Card>
                        </Link>

                        <Link to="/pinned-notes">
                            <Card className="p-5 hover:shadow-md transition">
                                <Pin className="mb-3" />
                                <h3 className="text-2xl font-bold">
                                    {stats?.data?.pinnedCount ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Pinned
                                </p>
                            </Card>
                        </Link>

                        <Link to="/favorite-notes">
                            <Card className="p-5 hover:shadow-md transition">
                                <Star className="mb-3" />
                                <h3 className="text-2xl font-bold">
                                    {stats?.data?.favoritedCount ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Favorites
                                </p>
                            </Card>
                        </Link>

                        <Link to="/trash-notes">
                            <Card className="p-5 hover:shadow-md transition">
                                <Trash className="mb-3" />
                                <h3 className="text-2xl font-bold">
                                    {stats?.data?.trashCount ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Trash
                                </p>
                            </Card>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}