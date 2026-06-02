import { FileText, Plus, Trash, Pin, Star } from "lucide-react";
import { useFetchNoteStatsQuery, useGetNotesQuery } from "../store/api/noteApi";
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
import { Button } from "./ui/button";
import type { Note } from "@/types/note";

interface AppSidebarProps {
    onSelectNote: (note: Note | null) => void;
    selectedNoteId: number | null;
}

export function AppSidebar({ onSelectNote, selectedNoteId }: AppSidebarProps) {
    const { data, isLoading } = useGetNotesQuery();
    const { data: stats } = useFetchNoteStatsQuery();
    const notes = data?.data ?? [];

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2 font-semibold text-lg">
                    <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground shadow-sm">
                        <FileText size={18} />
                    </div>
                    Notes
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <SidebarGroupLabel>YOUR NOTES</SidebarGroupLabel>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onSelectNote(null)}>
                            <Plus size={16} />
                        </Button>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>

                                    <FileText className="mr-2 h-4 w-4 opacity-70" />
                                    <div className="flex justify-between items-center w-full">All notes<span className="text-xs text-foreground bg-secondary rounded-sm px-2 py-0.5">{stats?.data?.totalCount}</span></div>
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

                {/* <SidebarGroup>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <SidebarGroupLabel>TAGS</SidebarGroupLabel>

                    </div>
                    <SidebarGroupContent>
                        {isLoading ? (
                            <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
                        ) : (
                            <SidebarMenu>
                                {notes.map((note) => (
                                    <SidebarMenuItem key={note.id}>
                                        <SidebarMenuButton
                                            isActive={selectedNoteId === note.id}
                                            onClick={() => onSelectNote(note)}
                                            className="transition-colors"
                                        >
                                            <FileText className="mr-2 h-4 w-4 opacity-70" />
                                            <span className="truncate">{note.title || 'Untitled note'}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        )}
                    </SidebarGroupContent>
                </SidebarGroup> */}

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
        </Sidebar>
    );
}
