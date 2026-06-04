import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store/store'
import './index.css'
import App from './App.tsx'
import NoteRoute from './routes/note.tsx'
import Hero from './routes/hero.tsx'
import PinnedNote from './routes/pinnedNote.tsx'
import TrashNote from './routes/TrashNote.tsx'
import FavoriteNote from './routes/favouriteNote.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Hero />} />
            <Route path="notes" element={<NoteRoute />} />
            <Route path="pinned-notes" element={<PinnedNote />} />
            <Route path="trash-notes" element={<TrashNote />} />
            <Route path="favorite-notes" element={<FavoriteNote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
