import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Search',                  href: '#' },
  { label: 'Sell',                    href: '#valuation' },
  { label: 'Your Agent',              href: '#about' },
  { label: 'Resources',               href: '#' },
  { label: 'First Responder Program', href: '#' },
  { label: 'Contact',                 href: '#contact' },
]

function NavLink({ label, href }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-white/75 hover:text-white text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200 py-1"
    >
      {label}
      {/* Animated gold underline */}
      <motion.span
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c96a)' }}
      />
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? y / docH : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? 'rgba(8,17,38,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        boxShadow: scrolled
          ? '0 1px 0 rgba(201,168,76,0.12), 0 8px 40px rgba(0,0,0,0.35)'
          : 'none',
        transition: 'background 0.45s ease, box-shadow 0.45s ease, backdrop-filter 0.45s ease',
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px] origin-left"
        style={{
          scaleX: scrollProgress,
          background: 'linear-gradient(90deg, #c9a84c, #e8c96a, #c9a84c)',
          width: '100%',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between"
          style={{
            height: scrolled ? '64px' : '80px',
            transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Logo */}
          <a href="#" className="flex-shrink-0 group">
            <span className="font-serif text-xl font-bold tracking-widest text-white group-hover:text-white/90 transition-colors duration-200">
              FRONTLINE
            </span>
            <span
              className="block text-[10px] font-sans font-semibold tracking-[0.45em] -mt-0.5 transition-all duration-300"
              style={{ background: 'linear-gradient(90deg,#c9a84c,#e8c96a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              ESTATES
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(l => <NavLink key={l.label} {...l} />)}
          </nav>

          {/* CTA button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="relative overflow-hidden text-sm font-bold tracking-wide rounded-lg px-6 py-2.5 shadow-lg group"
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)',
                color: '#0a1628',
              }}
            >
              {/* Shine sweep on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)', transform: 'skewX(-15deg)' }}
              />
              <span className="relative">Contact Me Now</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/8 transition-colors duration-150"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: open ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              background: 'rgba(6,14,30,0.97)',
              backdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(201,168,76,0.15)',
              overflow: 'hidden',
            }}
          >
            <div className="px-6 py-5 flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.22 }}
                  className="text-white/75 hover:text-white text-[15px] font-medium tracking-wide transition-colors duration-150 py-3.5 border-b border-white/[0.06] last:border-0 flex items-center justify-between group"
                >
                  {l.label}
                  <span className="text-gold-400/0 group-hover:text-gold-400/70 transition-colors text-lg leading-none">›</span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05 + 0.05 }}
                className="mt-5 text-center font-bold text-sm tracking-wide rounded-xl py-3.5 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)',
                  color: '#0a1628',
                }}
              >
                Contact Me Now
              </motion.a>
              <p className="text-white/20 text-[10px] tracking-widest text-center mt-4 uppercase">Frontline Estates · Long Island, NY</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
