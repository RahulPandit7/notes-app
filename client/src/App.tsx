import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from './components/AppSidebar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import type { RootState } from '@/store/store';
import type { Note } from '@/types/note';
import { Calendar, Clock, Moon, NotebookPen, Sun, Sunset } from 'lucide-react';
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

  // Keep greeting and clock fresh without re-rendering every second
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const { text: greeting, Icon: GreetingIcon } = getGreeting(now);
  const firstName = user?.name?.trim().split(' ')[0] || 'there';
  const initial = user?.name?.charAt(0).toUpperCase() || 'U';

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
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <NotebookPen size={16} />
                  </span>
                  <h1 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                    R &amp; R Notes
                  </h1>
                </div>
              </div>

              {user && (
                <div className="flex items-center gap-3">
                  <span className="hidden max-w-[10rem] truncate text-sm font-medium text-muted-foreground sm:block">
                    {user.name}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
                  >
                    {initial}
                  </span>
                </div>
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