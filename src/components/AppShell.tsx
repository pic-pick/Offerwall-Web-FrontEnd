import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { Footer, Header, ScrollToTopButton } from './OfferwallPage'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { pathname } = useLocation()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 420)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_26%)]" />
      <Header />
      <main className="relative z-10 pb-24">{children}</main>
      <Footer />
      <ScrollToTopButton visible={showScrollTop} />
    </div>
  )
}
