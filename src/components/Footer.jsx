import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Search',           href: '#' },
  { label: 'Sell',             href: '#valuation' },
  { label: 'Your Agent',       href: '#about' },
  { label: 'First Responders', href: '#' },
  { label: 'Contact',          href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      className="px-4 pt-12 pb-10"
      style={{ background: '#030810' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Luxury gold divider */}
        <div
          className="w-full mb-10"
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.22) 25%, rgba(201,168,76,0.48) 50%, rgba(201,168,76,0.22) 75%, transparent 100%)',
          }}
        />

        {/* Main row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10"
        >
          {/* Logo */}
          <a href="#" className="flex-shrink-0 group">
            <span className="font-serif text-lg font-bold tracking-widest text-white group-hover:text-white/85 transition-colors">
              LUXENEST
            </span>
            <span
              className="block text-[9px] font-sans font-semibold tracking-[0.45em] -mt-0.5 transition-all"
              style={{
                background: 'linear-gradient(90deg, #c9a84c, #e8c96a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ESTATES
            </span>
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2.5">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-white/30 hover:text-gold-400 text-xs font-medium tracking-wide transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-white/20 text-xs tracking-wide flex-shrink-0">
            © {new Date().getFullYear()} LuxeNest Estates
          </p>
        </motion.div>

        {/* Legal line */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }} className="pt-7">
          <p className="text-white/18 text-[10px] leading-relaxed text-center max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.18)' }}>
            Licensed Real Estate Brokerage · Equal Housing Opportunity · Long Island, NY ·
            Incentive programs subject to eligibility, lender approval, and applicable state law.
            Property data shown is for illustrative purposes only.
          </p>
        </div>

      </div>
    </footer>
  )
}
