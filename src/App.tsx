import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Info from './pages/Info'
import EditorialPage from './pages/EditorialPage'
import PortraitPage from './pages/PortraitPage'
import FashionPage from './pages/FashionPage'
import CinematicPage from './pages/CinematicPage'
import ArtisticPage from './pages/ArtisticPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/editorial" element={<EditorialPage />} />
      <Route path="/portrait" element={<PortraitPage />} />
      <Route path="/fashion" element={<FashionPage />} />
      <Route path="/cinematic" element={<CinematicPage />} />
      <Route path="/artistic" element={<ArtisticPage />} />
    </Routes>
  )
}
