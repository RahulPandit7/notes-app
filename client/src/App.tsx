import { useState } from 'react';
import './App.css';
import Editor from './editor/Editor';
import { AppSidebar } from './components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Note } from "@/types/note";
import NotePage from './pages/notePage';

function App() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <SidebarProvider>
      <AppSidebar onSelectNote={setSelectedNote} selectedNoteId={selectedNote?.id ?? null} />
      <main className="flex-1 flex flex-col w-full h-screen relative bg-background">
        <SidebarTrigger className="absolute top-3 left-4 z-50 bg-background/50 hover:bg-muted/80 shadow-sm border border-border/50 text-muted-foreground" />
        {/* <Editor note={selectedNote} onNoteSaved={setSelectedNote} /> */}
        <NotePage />
      </main>
    </SidebarProvider>
  )
}

export default App;
