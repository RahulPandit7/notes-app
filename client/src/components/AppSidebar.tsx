import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "@/store/slices/authSlice";
import { openNoteForm, toggleNoteForm } from "@/store/slices/uiSlice";
import type { RootState } from "@/store/store";
import { ChevronUp, FileText, LogOut, Mail, Pin, Plus, Star, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFetchNoteStatsQuery } from "../store/api/noteApi";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { AleartDialog } from "./AleartDialog";


export function AppSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isFormOpen = useSelector((state: RootState) => state.ui.isNoteFormOpen);
    const { data: stats } = useFetchNoteStatsQuery();
    const user = useSelector((state: RootState) => state.auth.user);
    const { state: sidebarState } = useSidebar();
    const expanded = sidebarState === "expanded";

    const handlePlusClick = () => {
        navigate("/app");
        if (isFormOpen) {
            dispatch(toggleNoteForm());
        } else {
            dispatch(openNoteForm());
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const noteMenus = [
        {
            title: "All notes",
            icon: FileText,
            path: "/app/notes",
            count: stats?.data?.totalCount,
        },
        {
            title: "Pinned",
            icon: Pin,
            path: "/app/pinned-notes",
            count: stats?.data?.pinnedCount,
        },
        {
            title: "Favorites",
            icon: Star,
            path: "/app/favorite-notes",
            count: stats?.data?.favoritedCount,
        },
    ];

    const otherMenus = [
        {
            title: "Trash",
            icon: Trash,
            path: "/app/trash-notes",
            count: stats?.data?.trashCount,
        },
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-4 transition-[padding] duration-200 ease-linear group-data-[collapsible=icon]:p-2">
                <div className="flex items-center gap-2 font-bold text-lg group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 transition-all duration-200 ease-linear">
                    <Link
                        to="/app"
                        className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground shadow-sm hover:scale-105 transition-transform shrink-0"
                    >
                        <FileText size={18} />
                    </Link>
                    <Link to="/app">
                        <span
                            className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent group-data-[collapsible=icon]:hidden"
                        >
                            R & R notes
                        </span>
                    </Link>

                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
                            YOUR NOTES
                        </SidebarGroupLabel>

                        {expanded && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={handlePlusClick}
                                aria-label="Create new note"
                                asChild
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Plus size={16} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add New Note</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Button>
                        )}
                    </div>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {noteMenus.map((item) => {
                                const Icon = item.icon;
                                const isActive =
                                    location.pathname === item.path ||
                                    (item.path === "/app/notes" && location.pathname === "/app");

                                return (
                                    <SidebarMenuItem key={item.path}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                        >
                                            <NavLink to={item.path}>
                                                <Icon className="h-4 w-4 shrink-0" />
                                                <span className="transition-all duration-200 ease-linear group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
                                                    {item.title}
                                                </span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                        {item.count !== undefined && item.count > 0 && (
                                            <SidebarMenuBadge>
                                                {item.count}
                                            </SidebarMenuBadge>
                                        )}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
                        Other
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {otherMenus.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <SidebarMenuItem key={item.path}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                        >
                                            <NavLink to={item.path}>
                                                <Icon className="h-4 w-4 shrink-0" />
                                                <span className="transition-all duration-200 ease-linear group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
                                                    {item.title}
                                                </span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                        {item.count !== undefined && item.count > 0 && (
                                            <SidebarMenuBadge>
                                                {item.count}
                                            </SidebarMenuBadge>
                                        )}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="w-full"
                                >
                                    <Avatar className="h-8 w-8 shrink-0 rounded-lg">
                                        <AvatarFallback className="rounded-lg">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                        <span className="truncate font-medium">
                                            {user?.name}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {user?.email}
                                        </span>
                                    </div>

                                    <ChevronUp className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side="top"
                                align="end"
                                className="w-56"
                            >
                                <DropdownMenuLabel>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user?.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {user?.email}
                                        </span>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem disabled>
                                    <Mail className="mr-2 h-4 w-4" />
                                    {user?.email}
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <AleartDialog
                                    title="Logout!"
                                    description="Are you sure you want to log out of your account? You will need to sign in again to access your notes."
                                    onConfirm={handleLogout}
                                    trigger={
                                        <DropdownMenuItem
                                            className="text-red-500 focus:text-red-500"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    }
                                />

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    );
}
