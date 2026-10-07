import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from './components/AppSidebar';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { closeNoteForm } from '@/store/slices/uiSlice';
import type { RootState } from '@/store/store';
import type { Note } from '@/types/note';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AleartDialog } from '@/components/AleartDialog';
import { useFetchNoteStatsQuery } from '@/store/api/noteApi';
import {
  Calendar,
  ChevronDown,
  Clock,
  FileText,
  LogOut,
  Moon,
  Pin,
  Star,
  Sun,
  Sunset,
  Trash2,
} from 'lucide-react';
import './App.css';

function getGreeting(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return { text: 'Good morning', Icon: Sun };
  if (hour < 18) return { text: 'Good afternoon', Icon: Sunset };
  return { text: 'Good evening', Icon: Moon };
}

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [now, setNow] = useState(() => new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);
  const isFormOpen = useSelector((state: RootState) => state.ui.isNoteFormOpen);
  const { data: stats } = useFetchNoteStatsQuery();

  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch(logout());
      navigate('/login', { replace: true });
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    setShowAddForm(false);
    setEditingNote(null);
    dispatch(closeNoteForm());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const { text: greeting, Icon: GreetingIcon } = getGreeting(now);

  const nameParts = user?.name?.trim().split(/\s+/) || [];
  const firstName = nameParts[0] || 'there';

  const initial =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : nameParts[0]?.[0]?.toUpperCase() || 'U';

  const dateLabel = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeLabel = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  // Only show the welcome banner on the /app (hero) route, and not when the form is open
  const isHeroRoute = location.pathname === '/app';
  const showBanner = isHeroRoute && !!user && !isFormOpen;

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative flex h-screen w-full flex-1 flex-col overflow-hidden bg-muted/30">
          {/* Floating top bar */}
          <div className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
            <header className="flex h-14 select-none items-center justify-between rounded-2xl border border-border/60 bg-background/80 px-3 shadow-sm backdrop-blur-xl sm:px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="h-9 w-9 rounded-xl text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" />
                <Link to="/app">
                  <h1 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                    Dashboard
                  </h1>
                </Link>
              </div>

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="User account menu"
                      className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-border/70 bg-background/80 py-1 pl-1.5 pr-2.5 shadow-xs backdrop-blur-md transition-all hover:border-primary/40 hover:bg-accent/60 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 data-[state=open]:border-primary/50 data-[state=open]:bg-accent/80"
                    >
                      <Avatar className="h-7 w-7 shrink-0 ring-2 ring-primary/20 transition-transform group-hover:scale-105">
                        <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                          {initial}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden max-w-[9rem] truncate text-xs font-medium text-foreground sm:inline-block">
                        {user.name}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    className="w-72 rounded-2xl border border-border/80 bg-popover/95 p-2 shadow-2xl backdrop-blur-xl duration-200"
                  >
                    {/* User profile card */}
                    <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3 ring-1 ring-border/50">
                      <Avatar className="h-10 w-10 shrink-0 ring-2 ring-primary/25 shadow-xs">
                        <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
                          {initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-semibold text-foreground">
                          {user.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </span>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                          <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
                            Active Account
                          </span>
                        </div>
                      </div>
                    </div>

                    <DropdownMenuSeparator className="my-2 bg-border/60" />

                    {/* Quick navigation */}
                    <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                      Notes
                    </div>

                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate('/app/notes')}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors hover:bg-accent focus:bg-accent"
                      >
                        <span className="flex items-center gap-2.5 text-foreground">
                          <FileText className="h-4 w-4 text-primary" />
                          All Notes
                        </span>
                        {stats?.data?.totalCount !== undefined && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {stats.data.totalCount}
                          </span>
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => navigate('/app/pinned-notes')}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors hover:bg-accent focus:bg-accent"
                      >
                        <span className="flex items-center gap-2.5 text-foreground">
                          <Pin className="h-4 w-4 text-amber-500" />
                          Pinned Notes
                        </span>
                        {stats?.data?.pinnedCount !== undefined && stats.data.pinnedCount > 0 && (
                          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                            {stats.data.pinnedCount}
                          </span>
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => navigate('/app/favorite-notes')}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors hover:bg-accent focus:bg-accent"
                      >
                        <span className="flex items-center gap-2.5 text-foreground">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Favorite Notes
                        </span>
                        {stats?.data?.favoritedCount !== undefined && stats.data.favoritedCount > 0 && (
                          <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] font-semibold text-yellow-600 dark:text-yellow-400">
                            {stats.data.favoritedCount}
                          </span>
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => navigate('/app/trash-notes')}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors hover:bg-accent focus:bg-accent"
                      >
                        <span className="flex items-center gap-2.5 text-foreground">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                          Trash
                        </span>
                        {stats?.data?.trashCount !== undefined && stats.data.trashCount > 0 && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {stats.data.trashCount}
                          </span>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-2 bg-border/60" />

                    {/* Logout trigger */}
                    <AleartDialog
                      title="Log out of your account?"
                      description="Are you sure you want to log out? You will need to sign in again to access your notes."
                      confirmText="Log out"
                      cancelText="Cancel"
                      onConfirm={handleLogout}
                      trigger={
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
                        >
                          <LogOut className="h-4 w-4" />
                          Log out
                        </DropdownMenuItem>
                      }
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </header>
          </div>

          {/* Welcome hero card — hero route only, hidden while the note form is open */}
          {showBanner && (
            <section className="px-3 pt-4 sm:px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-500">
              <div className="relative mx-auto overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg sm:p-8">
                {/* Dot grid texture */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(currentColor 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                  }}
                />
                {/* Soft shapes */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-black/10"
                />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur sm:h-16 sm:w-16">
                      <GreetingIcon size={28} />
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate text-2xl font-extrabold tracking-tight sm:text-4xl">
                        {greeting}, {firstName}
                      </h2>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                        Capture ideas, format them your way, and keep everything in one place.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur sm:text-sm">
                      <Calendar size={14} />
                      {dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/15 px-3.5 py-1.5 text-xs font-medium ring-1 ring-white/10 backdrop-blur sm:text-sm">
                      <Clock size={14} />
                      {timeLabel}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Page content */}
          <div className="flex-1 overflow-auto px-3 py-5 sm:px-6 sm:py-6">
            <div className="mx-auto h-full">
              <Outlet
                context={{ showAddForm, setShowAddForm, editingNote, setEditingNote }}
              />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default App;