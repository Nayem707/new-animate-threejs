import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollManager } from './ScrollManager'
import { SkipLink } from './SkipLink'

export function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollManager />
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
