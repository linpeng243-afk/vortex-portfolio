import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Info from './pages/Info'
import useCustomCursor from './hooks/use-custom-cursor'

export default function App() {
  const cursorRef = useCustomCursor()

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  )
}
