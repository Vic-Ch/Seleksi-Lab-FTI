import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import Logo from './common/Logo'
import GooeyNav from './reactbits/GooeyNav'

// Navigation items
const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const location = useLocation()

  // Sync active item with current route
  useEffect(() => {
    if (location.pathname === '/contact') {
      setActiveIndex(1)
    } else {
      setActiveIndex(0)
    }
  }, [location])

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-neutral-800/80 text-white">
      <nav className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand logo */}
        <Logo variant="light" />

        {/* Desktop gooey nav */}
        <div className="hidden md:block">
          <GooeyNav
            items={NAV_ITEMS}
            particleCount={12}
            particleDistances={[70, 15]}
            particleR={90}
            initialActiveIndex={activeIndex}
            animationTime={500}
            timeVariance={200}
          />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 pt-2 space-y-1 border-t border-neutral-800 bg-[#0B0F19]">
          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeIndex === idx
                  ? 'bg-primary-600 text-white font-semibold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
