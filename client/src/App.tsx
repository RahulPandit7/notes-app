import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { Note } from "@/types/note";
import './App.css';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  return (
    <SidebarProvider>
      <AppSidebar
      />
      <main className="flex-1 flex flex-col w-full h-screen relative bg-background">
        <SidebarTrigger className="absolute top-3 left-4 z-50 bg-background/50 hover:bg-muted/80 shadow-sm border border-border/50 text-muted-foreground" />
        <div className="px-6 mt-12 flex-1 overflow-auto">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">R & R notes</h1>

          <Outlet context={{ showAddForm, setShowAddForm, editingNote, setEditingNote }} />
        </div>
      </main>
    </SidebarProvider>
  )
}

export default App;

