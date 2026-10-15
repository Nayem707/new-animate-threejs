import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { SHOWCASE_ONLY } from './config'
import { Layout } from './components/layout/Layout'
import { ScrollManager } from './components/layout/ScrollManager'
import AboutPage from './pages/About'
import HomePage from './pages/Home'
import NotFoundPage from './pages/NotFound'
import ProjectsPage from './pages/Projects'

// Lazy so GSAP and the hero video page stay out of the portfolio bundle.
const ShowcasePage = lazy(() => import('./pages/Showcase'))

const showcase = (
  <Suspense fallback={<div className="h-svh" />}>
    <ShowcasePage />
  </Suspense>
)

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      {SHOWCASE_ONLY ? (
        <Routes>
          <Route index element={showcase} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="showcase" element={showcase} />
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
      {/* Shared by both layouts; rendered after the routes so pages (and pin spacers) exist before it restores scroll. */}
      <ScrollManager />
    </MotionConfig>
  )
}
