import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store/store'
import './index.css'
import NoteRoute from './routes/note.tsx'
import Hero from './routes/hero.tsx'
import PinnedNote from './routes/pinnedNote.tsx'
import FavoriteNote from './routes/favouriteNote.tsx'
import TrashNote from './routes/trashNote.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import LoginForm from './routes/loginForm.tsx'
import ProtectedLayout from './layouts/ProtectedLayout.tsx'
import Landing from './routes/landing.tsx'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />

          {/* PROTECTED */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<ProtectedLayout />}>
              <Route index element={<Hero />} />
              <Route path="notes" element={<NoteRoute />} />
              <Route path="pinned-notes" element={<PinnedNote />} />
              <Route path="trash-notes" element={<TrashNote />} />
              <Route path="favorite-notes" element={<FavoriteNote />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
