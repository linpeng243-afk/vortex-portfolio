import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Info from './pages/Info'
import useCustomCursor from './hooks/use-custom-cursor'

export default function App() {
  const { containerRef, dotRef, ringRef, trailRefs, TRAIL_COUNT } = useCustomCursor()

  return (
    <>
      <div ref={containerRef} className="custom-cursor-container">
        <div ref={dotRef} className="cursor-dot" />
        <div ref={ringRef} className="cursor-ring" />
        {Array.from({ length: TRAIL_COUNT }, (_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) trailRefs.current[i] = el; }}
            className="cursor-trail"
            style={{
              width: `${6 - i}px`,
              height: `${6 - i}px`,
              opacity: 0.3 - i * 0.05,
            }}
          />
        ))}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  )
}
