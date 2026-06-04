import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { closeNoteForm, openNoteForm } from "@/store/slices/uiSlice";
import type { RootState } from "@/store/store";
import AddNoteForm from "@/components/AddNoteForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetchNoteStatsQuery } from "@/store/api/noteApi";
import {
    Plus,
    FileText,
    Pin,
    Star,
    Trash,
    LogOut,
    Sparkles,
    BookOpen,
    Lock,
    Mail,
    User,
    ArrowRight,
    PenTool,
    Keyboard,
    Laptop,
    CheckCircle
} from "lucide-react";

export default function HeroPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFormOpen = useSelector((state: RootState) => state.ui.isNoteFormOpen);
    const { data: stats } = useFetchNoteStatsQuery();

    // Mock auth state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [loginTheme, setLoginTheme] = useState<'classic' | 'modern'>('modern');
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    // Form inputs
    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load mock session on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("username");
        if (token && name) {
            setIsLoggedIn(true);
            setUserName(name);
        }
    }, []);

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        if (authMode === 'signup' && !formName.trim()) {
            setError("Please tell us your name.");
            return;
        }
        if (!formEmail.trim() || !formPassword.trim()) {
            setError("Please fill in all details.");
            return;
        }

        setIsSubmitting(true);

        // Simulate network latency
        setTimeout(() => {
            const displayName = authMode === 'signup' ? formName : formEmail.split('@')[0];
            localStorage.setItem("token", "mock-jwt-token-r-and-r");
            localStorage.setItem("username", displayName);

            setIsSubmitting(false);
            setSuccessMsg(authMode === 'signup' ? "Account created! Welcome to R & R Notes." : "Welcome back!");

            setTimeout(() => {
                setIsLoggedIn(true);
                setUserName(displayName);
                setSuccessMsg("");
                setFormName("");
                setFormEmail("");
                setFormPassword("");
            }, 800);
        }, 1200);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUserName("");
        dispatch(closeNoteForm());
    };

    return (
        <div className=" w-full flex flex-col items-center justify-center py-4 px-2 sm:px-6 lg:px-8">
            {isLoggedIn ? (
                /* ========================================================================= */
                /* LOGGED IN DASHBOARD VIEW */
                /* ========================================================================= */
                <div className="w-full  space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Welcome Header */}
                    <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/5 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-transparent border border-indigo-500/20 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm backdrop-blur-sm">
                        <div className="space-y-2">

                            <h1 className="text-3xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                                Welcome to <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">R & R notes</span>, {userName}!
                            </h1>
                            <p className="text-muted-foreground text-sm sm:text-base">
                                Let's capture your brilliant ideas, keep them organized, and structure your mind.
                            </p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-300 border-border/80"
                        >
                            <LogOut size={16} />
                            Log Out
                        </Button>
                    </div>

                    {!isFormOpen ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left: Quick Actions */}
                            <div className="md:col-span-1 space-y-6">
                                <Card className="p-6 border border-border/60 shadow-lg shadow-black/5 bg-card/60 backdrop-blur-sm rounded-2xl flex flex-col justify-between h-full">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                                            <PenTool size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-foreground">Draft Your Thoughts</h3>
                                            <p className="text-muted-foreground text-sm mt-1">
                                                Create a new note instantly with our rich editor, format content, and pin it for quick reference.
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => dispatch(openNoteForm())}
                                        className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-md shadow-indigo-500/20 py-5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.98]"
                                    >
                                        <Plus size={18} />
                                        Add New Note
                                    </Button>
                                </Card>
                            </div>

                            {/* Right: Quick Stats & Navigation */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* All Notes Stat */}
                                    <Link to="/notes" className="group">
                                        <Card className="p-5 border border-border/50 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 rounded-2xl bg-card/40 flex flex-col justify-between h-40">
                                            <div className="flex justify-between items-start">
                                                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                                    <FileText size={20} />
                                                </div>
                                                <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform group-hover:text-indigo-500" />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-extrabold tracking-tight text-foreground">
                                                    {stats?.data?.totalCount ?? 0}
                                                </div>
                                                <div className="text-sm font-medium text-muted-foreground mt-1">
                                                    All Notes
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>

                                    {/* Pinned Stat */}
                                    <Link to="/pinned-notes" className="group">
                                        <Card className="p-5 border border-border/50 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 rounded-2xl bg-card/40 flex flex-col justify-between h-40">
                                            <div className="flex justify-between items-start">
                                                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                                    <Pin size={20} />
                                                </div>
                                                <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform group-hover:text-amber-500" />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-extrabold tracking-tight text-foreground">
                                                    {stats?.data?.pinnedCount ?? 0}
                                                </div>
                                                <div className="text-sm font-medium text-muted-foreground mt-1">
                                                    Pinned Notes
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>

                                    {/* Favorites Stat */}
                                    <Link to="/favorite-notes" className="group">
                                        <Card className="p-5 border border-border/50 hover:border-pink-500/40 hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 rounded-2xl bg-card/40 flex flex-col justify-between h-40">
                                            <div className="flex justify-between items-start">
                                                <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                                                    <Star size={20} />
                                                </div>
                                                <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform group-hover:text-pink-500" />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-extrabold tracking-tight text-foreground">
                                                    {stats?.data?.favoritedCount ?? 0}
                                                </div>
                                                <div className="text-sm font-medium text-muted-foreground mt-1">
                                                    Favorites
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>

                                    {/* Trash Stat */}
                                    <Link to="/trash-notes" className="group">
                                        <Card className="p-5 border border-border/50 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 rounded-2xl bg-card/40 flex flex-col justify-between h-40">
                                            <div className="flex justify-between items-start">
                                                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                                    <Trash size={20} />
                                                </div>
                                                <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform group-hover:text-red-500" />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-extrabold tracking-tight text-foreground">
                                                    {stats?.data?.trashCount ?? 0}
                                                </div>
                                                <div className="text-sm font-medium text-muted-foreground mt-1">
                                                    Trash Bin
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Open Note Creation Form Container */
                        <Card className="w-full p-6 sm:p-8 border border-border/80 shadow-2xl rounded-2xl bg-card/80 backdrop-blur-md animate-in zoom-in-95 duration-300">
                            <AddNoteForm
                                onClearEdit={() => dispatch(closeNoteForm())}
                            />
                        </Card>
                    )}
                </div>
            ) : (
                /* ========================================================================= */
                /* LOGGED OUT HERO PAGE (Classic vs Modern UI Showcase + Login Form) */
                /* ========================================================================= */
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-700">

                    {/* LEFT COLUMN: HERO SHOWCASE (Modern & Classic hybrid theme text) */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                        {/* App Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 dark:text-indigo-400 text-sm font-medium">
                            <Sparkles size={14} className="animate-spin-slow" />
                            Classic Typography Meets Modern Utility
                        </div>

                        {/* Title */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                                Write. Organise.<br />
                                Perfected in <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">R & R notes</span>.
                            </h1>
                            <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
                                A premium workspace where timeless notes meet powerful modern organization. Toggle styles to fit your current writing state.
                            </p>
                        </div>

                        {/* Features Showcase List */}
                        <div className="space-y-4 max-w-lg">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-emerald-500/10 text-emerald-500 p-1.5 rounded-lg">
                                    <CheckCircle size={16} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground text-base">Rich Text Notes & Drafting</h4>
                                    <p className="text-muted-foreground text-sm">Write using visual headers, bullet lists, character counters, and horizontal lines.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-amber-500/10 text-amber-500 p-1.5 rounded-lg">
                                    <CheckCircle size={16} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground text-base">Pin & Keep Favorites close</h4>
                                    <p className="text-muted-foreground text-sm">Keep crucial checklists pinned on top, and favorite notes for rapid lookup.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-indigo-500/10 text-indigo-500 p-1.5 rounded-lg">
                                    <CheckCircle size={16} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground text-base">Safely Discard and Purge</h4>
                                    <p className="text-muted-foreground text-sm">Notes go to the Trash Bin, allowing you to easily restore them or delete permanently.</p>
                                </div>
                            </div>
                        </div>

                        {/* Note count indicator */}
                        {stats && stats.data && (
                            <div className="pt-4 flex gap-8 border-t border-border/40">
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{stats.data.totalCount}</div>
                                    <div className="text-xs text-muted-foreground uppercase font-medium">Notes Saved</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{stats.data.pinnedCount}</div>
                                    <div className="text-xs text-muted-foreground uppercase font-medium">Pinned</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{stats.data.favoritedCount}</div>
                                    <div className="text-xs text-muted-foreground uppercase font-medium">Favorites</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: THE MOCK LOGIN CARD (Classic vs Modern Toggle) */}
                    <div className="lg:col-span-5 flex justify-center w-full">
                        <div className="w-full max-w-md relative">
                            {/* Background glowing blobs for Modern Theme */}
                            {loginTheme === 'modern' && (
                                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-30 blur-2xl transition-all duration-1000 -z-10 animate-pulse" />
                            )}

                            {/* Card Container */}
                            <div
                                className={`w-full transition-all duration-500 ease-in-out ${loginTheme === 'modern'
                                    ? 'rounded-3xl border border-white/20 dark:border-zinc-800/30 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl shadow-2xl p-6 sm:p-8 text-foreground'
                                    : 'rounded-none border-2 border-zinc-900 dark:border-zinc-100 bg-[#FAF7F0] dark:bg-[#2C2B29] shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] dark:shadow-[8px_8px_0px_0px_rgba(244,244,245,1)] p-6 sm:p-8 font-mono text-zinc-950 dark:text-zinc-50'
                                    }`}
                            >
                                {/* CARD HEADER: Theme Switcher & Titles */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${loginTheme === 'modern' ? 'text-indigo-500' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                            {loginTheme === 'modern' ? '⚙️ Modern Portal' : '📟 CLASSIC TELETYPE'}
                                        </span>

                                        {/* Classic vs Modern Toggle Switch */}
                                        <div className="flex bg-zinc-200/60 dark:bg-zinc-800/60 p-0.5 rounded-full border border-border/40">
                                            <button
                                                type="button"
                                                onClick={() => { setLoginTheme('classic'); setError(''); }}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 transition-all ${loginTheme === 'classic'
                                                    ? 'bg-zinc-900 text-[#FAF7F0] dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                                                    : 'text-muted-foreground hover:text-foreground'
                                                    }`}
                                            >
                                                <Keyboard size={12} />
                                                Classic
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setLoginTheme('modern'); setError(''); }}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 transition-all ${loginTheme === 'modern'
                                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm'
                                                    : 'text-muted-foreground hover:text-foreground'
                                                    }`}
                                            >
                                                <Laptop size={12} />
                                                Modern
                                            </button>
                                        </div>
                                    </div>

                                    {/* App Brand & Description */}
                                    <div className="space-y-2">
                                        <h2 className={`text-2xl font-black ${loginTheme === 'modern' ? 'tracking-tight text-foreground' : 'font-mono uppercase tracking-widest text-zinc-950 dark:text-zinc-50 border-b border-zinc-900 dark:border-zinc-100 pb-2'}`}>
                                            {authMode === 'login' ? 'Enter Space' : 'Enroll Account'}
                                        </h2>
                                        <p className={`text-xs ${loginTheme === 'modern' ? 'text-muted-foreground' : 'text-zinc-600 dark:text-zinc-400 font-mono'}`}>
                                            {authMode === 'login'
                                                ? 'Sign in to access your digital thoughts.'
                                                : 'Claim your profile and start recording items.'}
                                        </p>
                                    </div>
                                </div>

                                {/* AUTH MODE TAB SELECTOR */}
                                <div className={`flex w-full mt-6 ${loginTheme === 'modern' ? 'border-b border-border/30' : 'border-2 border-zinc-900 dark:border-zinc-100'}`}>
                                    <button
                                        type="button"
                                        onClick={() => { setAuthMode('login'); setError(''); }}
                                        className={`flex-1 text-center py-2.5 text-xs font-bold uppercase transition-all ${authMode === 'login'
                                            ? loginTheme === 'modern'
                                                ? 'border-b-2 border-indigo-500 text-foreground'
                                                : 'bg-zinc-900 text-[#FAF7F0] dark:bg-zinc-100 dark:text-zinc-900'
                                            : 'text-muted-foreground hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30'
                                            }`}
                                    >
                                        LOG IN
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setAuthMode('signup'); setError(''); }}
                                        className={`flex-1 text-center py-2.5 text-xs font-bold uppercase transition-all ${authMode === 'signup'
                                            ? loginTheme === 'modern'
                                                ? 'border-b-2 border-indigo-500 text-foreground'
                                                : 'bg-zinc-900 text-[#FAF7F0] dark:bg-zinc-100 dark:text-zinc-900'
                                            : 'text-muted-foreground hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30'
                                            }`}
                                    >
                                        SIGN UP
                                    </button>
                                </div>

                                {/* LOGIN/SIGNUP FORM */}
                                <form onSubmit={handleAuth} className="space-y-5 mt-6">
                                    {/* Name Input (Sign Up Only) */}
                                    {authMode === 'signup' && (
                                        <div className="space-y-1.5 text-left">
                                            <label className={`text-xs font-bold ${loginTheme === 'modern' ? 'text-muted-foreground' : 'text-zinc-700 dark:text-zinc-300 font-mono'}`}>
                                                {loginTheme === 'modern' ? 'Your Name' : 'NAME_OF_USER:'}
                                            </label>
                                            <div className="relative">
                                                {loginTheme === 'modern' && (
                                                    <User size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                                                )}
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder={loginTheme === 'modern' ? 'e.g. John Doe' : 'ENTER_TEXT'}
                                                    value={formName}
                                                    onChange={(e) => setFormName(e.target.value)}
                                                    className={`w-full ${loginTheme === 'modern'
                                                        ? 'pl-10 pr-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all'
                                                        : 'px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-900 dark:border-zinc-100 focus:bg-amber-50/10 focus:outline-none font-mono text-sm'
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Email/Username Input */}
                                    <div className="space-y-1.5 text-left">
                                        <label className={`text-xs font-bold ${loginTheme === 'modern' ? 'text-muted-foreground' : 'text-zinc-700 dark:text-zinc-300 font-mono'}`}>
                                            {loginTheme === 'modern' ? 'Email / Username' : 'ACCOUNT_ID:'}
                                        </label>
                                        <div className="relative">
                                            {loginTheme === 'modern' && (
                                                <Mail size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                                            )}
                                            <input
                                                type="text"
                                                required
                                                placeholder={loginTheme === 'modern' ? 'you@domain.com' : 'SPECIFY_EMAIL'}
                                                value={formEmail}
                                                onChange={(e) => setFormEmail(e.target.value)}
                                                className={`w-full ${loginTheme === 'modern'
                                                    ? 'pl-10 pr-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all'
                                                    : 'px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-900 dark:border-zinc-100 focus:bg-amber-50/10 focus:outline-none font-mono text-sm'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-1.5 text-left">
                                        <label className={`text-xs font-bold ${loginTheme === 'modern' ? 'text-muted-foreground' : 'text-zinc-700 dark:text-zinc-300 font-mono'}`}>
                                            {loginTheme === 'modern' ? 'Password' : 'ACCESS_CODE:'}
                                        </label>
                                        <div className="relative">
                                            {loginTheme === 'modern' && (
                                                <Lock size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                                            )}
                                            <input
                                                type="password"
                                                required
                                                placeholder={loginTheme === 'modern' ? '••••••••' : 'SPECIFY_PASSWORD'}
                                                value={formPassword}
                                                onChange={(e) => setFormPassword(e.target.value)}
                                                className={`w-full ${loginTheme === 'modern'
                                                    ? 'pl-10 pr-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all'
                                                    : 'px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-900 dark:border-zinc-100 focus:bg-amber-50/10 focus:outline-none font-mono text-sm'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    {/* Form Alerts */}
                                    {error && (
                                        <div className={`p-3 text-xs text-red-500 ${loginTheme === 'modern' ? 'bg-red-500/10 rounded-xl' : 'border border-red-500 font-mono bg-red-500/5'}`}>
                                            ⚠️ {error}
                                        </div>
                                    )}
                                    {successMsg && (
                                        <div className={`p-3 text-xs text-emerald-500 ${loginTheme === 'modern' ? 'bg-emerald-500/10 rounded-xl' : 'border border-emerald-500 font-mono bg-emerald-500/5'}`}>
                                            ✓ {successMsg}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full flex items-center justify-center gap-2 cursor-pointer transition-all ${loginTheme === 'modern'
                                            ? 'py-3.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]'
                                            : 'py-2.5 font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-[#FAF7F0] border-2 border-zinc-900 shadow-[3px_3px_0px_0px_rgba(100,100,100,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-100'
                                            } disabled:opacity-50`}
                                    >
                                        {isSubmitting ? (
                                            <span>Processing...</span>
                                        ) : (
                                            <>
                                                <span>{authMode === 'login' ? 'Log In' : 'Create Account'}</span>
                                                <ArrowRight size={16} />
                                            </>
                                        )}
                                    </button>

                                    {/* Classic stamp styling detail */}
                                    {loginTheme === 'classic' && (
                                        <div className="pt-4 mt-4 border-t border-dashed border-zinc-400 text-[10px] text-zinc-500 font-mono flex justify-between uppercase">
                                            <span>System No: RR-404</span>
                                            <span>Secured Link Verified</span>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}