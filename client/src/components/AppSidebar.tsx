import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText, Pin, Plus, Star, Trash } from "lucide-react";
import { useFetchNoteStatsQuery } from "../store/api/noteApi";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openNoteForm, toggleNoteForm } from "@/store/slices/uiSlice";
import type { RootState } from "@/store/store";


export function AppSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFormOpen = useSelector((state: RootState) => state.ui.isNoteFormOpen);
    const { data: stats } = useFetchNoteStatsQuery();

    const handlePlusClick = () => {
        navigate("/");
        if (isFormOpen) {
            dispatch(toggleNoteForm());
        } else {
            dispatch(openNoteForm());
        }
    };
    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2 font-semibold text-lg">
                    <Link to="/" className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground shadow-sm">
                        <FileText size={18} />
                    </Link>
                    Notes
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <SidebarGroupLabel>YOUR NOTES</SidebarGroupLabel>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handlePlusClick}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton >
                                    <FileText className="mr-2 h-4 w-4 opacity-70" />
                                    <Link to="/notes" className="flex justify-between items-center w-full">All notes<span className="text-xs text-foreground bg-secondary rounded-sm px-2 py-0.5">{stats?.data?.totalCount}</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Pin className="mr-2 h-4 w-4 opacity-70" />
                                    <div className="flex justify-between items-center w-full">Pinned<span className="text-xs text-foreground bg-secondary rounded-sm px-2 py-0.5">{stats?.data?.pinnedCount}</span></div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Star className="mr-2 h-4 w-4 opacity-70" />
                                    <div className="flex justify-between items-center w-full">Favorites<span className="text-xs text-foreground bg-secondary rounded-sm px-2 py-0.5">{stats?.data?.favoritedCount}</span></div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <SidebarGroupLabel>Other</SidebarGroupLabel>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="transition-colors text-muted-foreground hover:text-foreground">
                                    <Trash className="mr-2 h-4 w-4 opacity-70" />
                                    <div className="flex justify-between items-center w-full">Trash<span className="text-xs text-foreground bg-secondary rounded-sm px-2 py-0.5">{stats?.data?.trashCount}</span></div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    );
}
