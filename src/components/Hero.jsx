import { useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Search, ChevronDown, Phone } from 'lucide-react'

// Image import with graceful fallback — if file is missing the build still works
let heroImage = null
try {
  heroImage = (await import('../assets/hero/open-house-2.jpg.jpg')).default
} catch {
  // fallback to gradient
}

let advisorImage = null
try {
  advisorImage = (await import('../assets/hero/advisor.jpg.png')).default
} catch {
  // fallback to initials
}

export default function Hero() {
  const [form, setForm] = useState({ query: '', type: '', beds: '', baths: '', minPrice: '', maxPrice: '' })
  const [imgErr, setImgErr] = useState(false)
  const [advisorErr, setAdvisorErr] = useState(false)

  const { scrollY } = useScroll()
  // Parallax: image drifts at 40% scroll speed (Ken Burns handles the zoom)
  const bgY = useTransform(scrollY, [0, 800], [0, 160])

  // Agent card mouse tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [6, -6]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-6, 6]), { stiffness: 200, damping: 25 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const showImage = heroImage && !imgErr

  const selectCls = "bg-white/[0.07] border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-gold-400/70 focus:bg-white/10 transition-all appearance-none min-w-0 backdrop-blur-sm"
  const optionDark = "bg-[#0a1628] text-white"

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── BACKGROUND LAYER ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-8%] will-change-transform"
      >
        {showImage ? (
          <img
            src={heroImage}
            alt="Luxury mansion"
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover object-center ken-burns"
          />
        ) : (
          <div className="w-full h-full bg-hero-gradient ken-burns" />
        )}
        {/* Glass reflection sheen — thin diagonal highlight across image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(118deg, transparent 38%, rgba(255,255,255,0.03) 50%, transparent 62%)',
          }}
        />
      </motion.div>

      {/* ── CINEMATIC OVERLAYS ── */}
      {/* Base darkening — kept light so mansion is clearly recognisable */}
      <div className="absolute inset-0 bg-navy-950/32" />
      {/* Ambient gold bloom — pulsing glow near headline area */}
      <div
        className="absolute pointer-events-none ambient-pulse"
        style={{
          top: '18%', left: '6%',
          width: '520px', height: '320px',
          background: 'radial-gradient(ellipse at 35% 50%, rgba(201,168,76,0.13) 0%, transparent 70%)',
          filter: 'blur(32px)',
        }}
      />
      {/* Vignette: edge darkening only — keep center open */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_30%_55%,transparent_35%,rgba(6,14,30,0.38)_100%)]" />
      {/* Gold atmospheric glow — upper left quadrant */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_25%,rgba(201,168,76,0.07),transparent_70%)]" />
      {/* Deep shadow bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy-950/80 to-transparent" />
      {/* Subtle top fade — reduced from /50 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-950/35 to-transparent" />
      {/* Gold horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2.5 border border-gold-400/25 bg-white/[0.04] backdrop-blur-sm px-4 py-2 rounded-full mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-gold-400 text-xs font-semibold tracking-[0.28em] uppercase">Long Island Real Estate</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] xl:text-7xl font-bold text-white leading-[1.04] mb-6"
                style={{ textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>
                Real Estate<br />
                <em className="not-italic" style={{
                  background: 'linear-gradient(135deg, #e8c96a 0%, #c9a84c 50%, #d4a843 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>Guidance</em>{' '}for<br />
                Frontline Families.
              </h1>

              <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-[520px]"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
                Private buyer and seller representation for first responders, healthcare workers, veterans, and families across Long Island.
              </p>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="rounded-2xl mb-8 overflow-hidden"
              style={{
                background: 'rgba(6,14,30,0.55)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div className="px-5 pt-4 pb-1">
                <div className="flex items-center gap-2 mb-3">
                  <Search size={13} className="text-gold-400" />
                  <p className="text-white/40 text-xs font-semibold tracking-[0.22em] uppercase">Property Search</p>
                </div>
                <input
                  placeholder="City, Area, ZIP, MLS#, or Address"
                  value={form.query} onChange={e => set('query', e.target.value)}
                  className="w-full bg-white/[0.06] border border-white/15 text-white placeholder-white/35 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400/60 transition-all mb-3"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pb-4">
                  <select value={form.type} onChange={e => set('type', e.target.value)} className={selectCls}>
                    <option value="" className={optionDark}>Property Type</option>
                    <option className={optionDark}>Single Family</option>
                    <option className={optionDark}>Condo / Co-op</option>
                    <option className={optionDark}>Multi-Family</option>
                    <option className={optionDark}>Land</option>
                  </select>
                  <select value={form.beds} onChange={e => set('beds', e.target.value)} className={selectCls}>
                    <option value="" className={optionDark}>Beds</option>
                    {[1,2,3,4,5].map(n => <option key={n} className={optionDark}>{n}+</option>)}
                  </select>
                  <select value={form.baths} onChange={e => set('baths', e.target.value)} className={selectCls}>
                    <option value="" className={optionDark}>Baths</option>
                    {[1,2,3,4].map(n => <option key={n} className={optionDark}>{n}+</option>)}
                  </select>
                  <select value={form.minPrice} onChange={e => set('minPrice', e.target.value)} className={selectCls}>
                    <option value="" className={optionDark}>Min Price</option>
                    {['$300K','$400K','$500K','$600K','$700K','$800K','$1M'].map(p => <option key={p} className={optionDark}>{p}</option>)}
                  </select>
                  <select value={form.maxPrice} onChange={e => set('maxPrice', e.target.value)} className={selectCls}>
                    <option value="" className={optionDark}>Max Price</option>
                    {['$500K','$700K','$900K','$1.2M','$1.5M','$2M+'].map(p => <option key={p} className={optionDark}>{p}</option>)}
                  </select>
                  <button className="flex items-center justify-center gap-2 font-bold text-sm rounded-lg px-4 py-2.5 transition-opacity hover:opacity-90 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)', color: '#0a1628' }}>
                    <Search size={15} /> Search
                  </button>
                </div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#"
                className="bg-white text-navy-900 font-bold px-7 py-3.5 rounded-lg text-sm tracking-wide hover:bg-ivory-100 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200">
                Find a Home
              </a>
              <a href="#valuation"
                className="font-semibold px-7 py-3.5 rounded-lg text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}>
                What Is My Home Worth?
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Agent Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 36, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.18, ease: 'easeOut' }}
            className="hidden lg:flex justify-center"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-[340px] rounded-[28px] overflow-hidden cursor-default"
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, rotateX: {}, rotateY: {} }}
            >
              {/* Glass card — full portrait layout */}
              <div style={{
                backdropFilter: 'blur(28px)',
                border: '1px solid rgba(255,255,255,0.13)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
                borderRadius: 28,
                overflow: 'hidden',
              }}>

                {/* ── PORTRAIT AREA ── */}
                <div style={{ position: 'relative', height: 420 }}>

                  {/* Gold ambient bloom behind portrait — brighter at face height */}
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 75% 50% at 50% 22%, rgba(201,168,76,0.32) 0%, rgba(201,168,76,0.10) 48%, transparent 70%)',
                  }} />

                  {/* Portrait image */}
                  {advisorImage && !advisorErr ? (
                    <img
                      src={advisorImage}
                      alt="Daniel Foley"
                      onError={() => setAdvisorErr(true)}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center top',
                      }}
                    />
                  ) : (
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 1,
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="font-serif text-4xl font-bold text-gold-400">DF</span>
                      </div>
                    </div>
                  )}

                  {/* Edge depth vignette — reduced to let face read clearly */}
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                    boxShadow: 'inset 0 0 38px rgba(6,14,30,0.35), inset 0 0 80px rgba(6,14,30,0.10)',
                  }} />

                  {/* Thin gold shimmer at top edge */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 3,
                    background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)',
                  }} />

                  {/* Available dot */}
                  <div style={{
                    position: 'absolute', top: 16, right: 16, zIndex: 4,
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#34d399', border: '2px solid rgba(6,14,30,0.8)',
                    boxShadow: '0 0 8px rgba(52,211,153,0.6)',
                  }} />

                  {/* Bottom gradient fade for name overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '58%', zIndex: 3, pointerEvents: 'none',
                    background: 'linear-gradient(to top, rgba(6,14,30,0.97) 0%, rgba(6,14,30,0.72) 38%, transparent 100%)',
                  }} />

                  {/* Name + title — left-aligned over gradient */}
                  <div style={{ position: 'absolute', bottom: 22, left: 22, right: 22, zIndex: 4 }}>
                    <h3
                      className="font-serif text-2xl text-white font-bold tracking-tight mb-1"
                      style={{ textShadow: '0 2px 18px rgba(0,0,0,0.7)' }}
                    >
                      Daniel Foley
                    </h3>
                    <p
                      className="text-xs font-semibold tracking-[0.18em] uppercase mb-0.5"
                      style={{ background: 'linear-gradient(135deg, #e8c96a, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                    >
                      Licensed Real Estate Salesperson
                    </p>
                    <p className="text-white/35 text-[10px] tracking-widest">Frontline Realty Group</p>
                  </div>
                </div>

                {/* ── STATS + CTA PANEL ── */}
                <div style={{ background: 'rgba(6,14,30,0.94)', padding: '18px 22px 22px' }}>
                  {/* Gold divider */}
                  <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.38), transparent)' }} />

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
                    {[['12+', 'Years'], ['200+', 'Closed'], ['5★', 'Rated']].map(([val, label]) => (
                      <div key={label} className="rounded-xl py-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <p className="text-white font-bold text-base font-serif">{val}</p>
                        <p className="text-white/35 text-[10px] tracking-wide">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2.5 font-bold text-[#0a1628] text-sm py-3 rounded-2xl hover:opacity-90 transition-opacity shadow-lg w-full"
                    style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)' }}
                  >
                    <Phone size={15} /> Schedule a Call
                  </a>

                  <p className="text-white/18 text-[10px] tracking-widest uppercase mt-3.5 text-center"
                    style={{ color: 'rgba(255,255,255,0.18)' }}>
                    Frontline Estates · Long Island, NY
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
            <ChevronDown className="text-white/25" size={18} />
          </motion.div>
        </motion.div>
      </div>

      {/* ── ADVISOR PROFILE CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.0, delay: 1.4, ease: 'easeOut' }}
        className="hidden sm:block absolute bottom-24 left-8 lg:left-14 z-20 advisor-float"
      >
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.11)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.09)',
          }}
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-11 h-11 rounded-full overflow-hidden border-2 border-gold-400/30 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.9), rgba(10,22,40,0.95))' }}
            >
              {advisorImage && !advisorErr ? (
                <img
                  src={advisorImage}
                  alt="Michael Carter"
                  onError={() => setAdvisorErr(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-serif text-sm font-bold text-gold-400">MC</span>
              )}
            </div>
            {/* Available indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a1628]" />
          </div>

          {/* Text */}
          <div>
            <p
              className="text-white text-sm font-semibold leading-tight tracking-wide"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
            >
              Michael Carter
            </p>
            <p
              className="text-[11px] font-medium tracking-wide leading-tight mt-0.5"
              style={{
                background: 'linear-gradient(90deg, #e8c96a, #c9a84c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Private Property Advisor
            </p>
          </div>
        </div>
      </motion.div>

    </section>
  )
}
