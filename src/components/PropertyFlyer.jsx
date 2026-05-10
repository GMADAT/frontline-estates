import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { X, MapPin, Phone, Mail, ChevronRight, ChevronLeft, Share2, MessageSquare } from 'lucide-react'
import droneImg   from '../assets/hero/estate-drone.jpg.jpg'
import kitchenImg from '../assets/hero/kitchen-1.jpg.jpg'
import extImg     from '../assets/hero/open-house-1.jpg.jpg'
import suiteImg   from '../assets/hero/mansion-1.jpg.jpg'
import outdoorImg from '../assets/hero/mansion-2.jpg.jpg'
import advisorImg  from '../assets/agents/luxury-agent.png.png'
import coverImg    from '../assets/agents/luxury-agent-cover.png.png'

/* ─── Constants ─────────────────────────────────────── */
const PHONE  = '6316729013'
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hi Daniel, I saw The Harbor House listing at $1,250,000 and would love more info.')}`

/* ─── Helpers ────────────────────────────────────────── */
function getNextSunday() {
  const now = new Date()
  const day = now.getDay()
  const sunday = new Date(now)
  sunday.setDate(now.getDate() + (day === 0 ? 7 : 7 - day))
  return sunday
}
function toICSDate(date, hour) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(hour)}0000`
}

/* ─── 3D Tilt ────────────────────────────────────────── */
function Tilt3D({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const rawX = useMotionValue(0), rawY = useMotionValue(0)
  const cfg = { stiffness: 160, damping: 22, mass: 0.7 }
  const x = useSpring(rawX, cfg), y = useSpring(rawY, cfg)
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8])
  function onMove(e) {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    const cx = e.touches ? e.touches[0].clientX : e.clientX
    const cy = e.touches ? e.touches[0].clientY : e.clientY
    rawX.set((cx - r.left) / r.width - 0.5)
    rawY.set((cy - r.top)  / r.height - 0.5)
  }
  function onLeave() { rawX.set(0); rawY.set(0) }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onTouchMove={onMove} onTouchEnd={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800, ...style }} className={className}>
      {children}
    </motion.div>
  )
}

/* ─── QR placeholder ─────────────────────────────────── */
const QR_GRID = [
  [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],[1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],[1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,1,0,0,0,0,0,0,0,1,0,1,0],[0,1,0,0,1,0,1,1,0,1,1,0,0,0,1],
  [1,1,1,1,1,1,1,0,0,0,1,0,1,0,0],[1,0,0,0,0,0,1,1,1,0,0,1,0,1,1],
  [1,0,1,1,1,0,1,0,0,1,0,0,1,0,0],[1,0,1,1,1,0,1,1,1,0,1,0,0,1,0],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1],[1,1,1,1,1,1,1,1,0,0,1,0,1,1,0],
  [0,0,1,0,0,1,0,0,1,1,0,0,0,0,1],
]
function QRPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <div className="p-2.5 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15,1fr)', gap: '1.5px', width: 84, height: 84 }}>
          {QR_GRID.flat().map((cell, i) => (
            <div key={i} style={{ borderRadius: '1px', background: cell ? 'rgba(201,168,76,0.72)' : 'transparent' }} />
          ))}
        </div>
      </div>
      <p className="text-white/30 text-[8px] tracking-[0.18em] uppercase">QR-ready</p>
    </div>
  )
}

/* ─── Agent card (shared) ────────────────────────────── */
function AgentCard({ size = 'small' }) {
  const isLarge = size === 'large'
  // large ≈ 6:5 (w:h landscape), small ≈ 5:4
  const pw = isLarge ? 200 : 110
  const ph = isLarge ? Math.round(pw * 5 / 6) : Math.round(pw * 4 / 5)
  return (
    <Tilt3D>
      <div className="rounded-2xl overflow-hidden flex items-center"
        style={{
          background: 'rgba(6,14,30,0.9)',
          border: '1px solid rgba(201,168,76,0.18)',
          boxShadow: isLarge ? '0 16px 48px rgba(0,0,0,0.45)' : '0 8px 24px rgba(0,0,0,0.3)',
        }}>
        {/* Portrait */}
        <div className="flex-shrink-0 relative overflow-hidden" style={{ width: pw, height: ph }}>
          <img src={advisorImg} alt="Daniel Foley"
            className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(270deg, rgba(6,14,30,0.5) 0%, transparent 55%)' }} />
        </div>
        {/* Details */}
        <div className="flex flex-col justify-between flex-1 min-w-0"
          style={{ padding: isLarge ? '16px 20px' : '12px 14px', minHeight: ph }}>
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                style={{ boxShadow: '0 0 5px rgba(52,211,153,0.7)' }} />
              <span className="text-white/40 text-[9px] tracking-wide">Available Now</span>
            </div>
            <p className={`font-serif font-bold text-white leading-tight mb-0.5 ${isLarge ? 'text-lg' : 'text-sm'}`}>
              Daniel Foley
            </p>
            <p className="text-gold-400 text-[9px] tracking-widest uppercase">Licensed Real Estate Agent</p>
          </div>
          <div className="space-y-1.5" style={{ marginTop: isLarge ? 14 : 10 }}>
            <a href={`tel:${PHONE}`}
              className={`flex items-center gap-2 text-white/55 hover:text-gold-400 transition-colors ${isLarge ? 'text-sm' : 'text-[11px]'}`}>
              <Phone size={isLarge ? 12 : 10} className="text-gold-400 flex-shrink-0" /> (631) 672-9013
            </a>
            <a href="mailto:daniel@frontlineestates.com"
              className={`flex items-center gap-2 text-white/55 hover:text-gold-400 transition-colors truncate ${isLarge ? 'text-sm' : 'text-[11px]'}`}>
              <Mail size={isLarge ? 12 : 10} className="text-gold-400 flex-shrink-0" /> daniel@frontlineestates.com
            </a>
          </div>
        </div>
      </div>
    </Tilt3D>
  )
}

/* ─── Page indicator dots ────────────────────────────── */
function PageDots({ current, total = 4 }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <motion.div key={i}
          animate={{ width: i + 1 === current ? 18 : 6, opacity: i + 1 === current ? 1 : 0.22 }}
          transition={{ duration: 0.3 }}
          className="h-1.5 rounded-full flex-shrink-0"
          style={{ background: i + 1 === current ? '#c9a84c' : 'rgba(255,255,255,0.5)', minWidth: 6 }}
        />
      ))}
    </div>
  )
}

/* ─── Shared nav bar ─────────────────────────────────── */
function NavBar({ onPrev, onNext, nextLabel, prevLabel, current, showPrev = true }) {
  return (
    <div className="flex-shrink-0 px-4 pt-3 pb-5"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(3,8,16,0.72)', backdropFilter: 'blur(10px)' }}>
      <div className="flex justify-center mb-3">
        <PageDots current={current} />
      </div>
      {onNext && (
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 font-bold text-sm rounded-xl py-4 mb-2.5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)', color: '#060e1e' }}>
          {nextLabel || 'Next'} <ChevronRight size={15} />
        </motion.button>
      )}
      {showPrev && onPrev && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onPrev}
          className="w-full flex items-center justify-center gap-1.5 font-semibold text-sm py-3 rounded-xl transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.45)' }}>
          <ChevronLeft size={14} /> {prevLabel || 'Back'}
        </motion.button>
      )}
    </div>
  )
}

/* ─── PAGE 1: Main property flyer ────────────────────── */
function Page1({ onNext }) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#030810' }}>

      {/* Poster image — full cover, very slow zoom */}
      <motion.img
        src={coverImg}
        alt="The Harbor House"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'contain', objectPosition: 'center center' }}
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: 'easeOut' }}
      />

      {/* Bottom vignette so button reads over poster */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(3,8,16,0.82) 100%)' }} />

      {/* Push button to bottom */}
      <div className="flex-1" />

      {/* Bottom CTA */}
      <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-3 px-5 pb-10 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-xs relative">
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{ boxShadow: ['0 0 0px rgba(201,168,76,0)', '0 0 26px rgba(201,168,76,0.5)', '0 0 0px rgba(201,168,76,0)'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          />
          <motion.button
            onClick={onNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 font-bold text-sm rounded-xl py-4 shadow-xl relative z-10"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)', color: '#060e1e' }}>
            Explore Interior & Exterior <ChevronRight size={15} />
          </motion.button>
        </motion.div>
        <PageDots current={1} />
      </div>
    </div>
  )
}

/* ─── PAGE 2: Gallery ────────────────────────────────── */
const PHOTOS = [
  { img: kitchenImg,  label: "Chef's Kitchen",      desc: 'Custom cabinetry, waterfall island, premium appliances.' },
  { img: extImg,      label: 'Waterfront Exterior', desc: 'Private dock with panoramic harbor views.' },
  { img: suiteImg,    label: 'Primary Suite',       desc: 'Vaulted ceilings, spa bath, and water views.' },
  { img: outdoorImg,  label: 'Outdoor Lounge',      desc: 'Wraparound deck, outdoor kitchen, sunset vistas.' },
]

function Page2({ onNext, onPrev }) {
  const [active, setActive] = useState(null)
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#040b18' }}>
      <div className="pt-20 pb-4 px-6 text-center flex-shrink-0">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}
          className="text-gold-400 text-[9px] font-bold tracking-[0.38em] uppercase block mb-2">
          Interior & Exterior
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
          className="font-serif font-bold text-white text-2xl sm:text-3xl">
          Every space, considered.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }}
          className="text-white/45 text-xs mt-1">Tap any photo to reveal details</motion.p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3 px-4 pb-3 content-start">
        {PHOTOS.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            className="relative rounded-2xl overflow-hidden cursor-pointer"
            style={{ height: 158 }}
            onClick={() => setActive(active === i ? null : i)}>
            <motion.img src={p.img} alt={p.label} className="w-full h-full object-cover"
              animate={{ scale: active === i ? 1.06 : 1 }} transition={{ duration: 0.35 }} />
            <div className="absolute inset-0"
              style={{ background: active === i
                ? 'linear-gradient(180deg, rgba(3,8,16,0.1) 0%, rgba(3,8,16,0.88) 100%)'
                : 'linear-gradient(180deg, transparent 40%, rgba(3,8,16,0.7) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white font-bold text-xs leading-tight">{p.label}</p>
              <AnimatePresence>
                {active === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
                    className="text-white/55 text-[10px] leading-relaxed mt-1 overflow-hidden">
                    {p.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }} className="flex-shrink-0 px-4 pb-3">
        <AgentCard size="small" />
      </motion.div>
      <NavBar onPrev={onPrev} onNext={onNext} nextLabel="View Open House Details" current={2} />
    </div>
  )
}

/* ─── PAGE 3: Open House & Details ──────────────────── */
const HIGHLIGHTS = [
  '4-bedroom waterfront residence with private dock',
  "Chef's kitchen with custom island and premium appliances",
  'Panoramic harbor views from the primary suite',
  'Spa-inspired primary bath with soaking tub',
  'Walking distance to Port Jefferson Village',
]

function Page3({ onNext, onPrev }) {
  const [added, setAdded] = useState(false)

  function downloadICS() {
    const sunday  = getNextSunday()
    const dtStart = toICSDate(sunday, 12)
    const dtEnd   = toICSDate(sunday, 15)
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Frontline Estates//EN',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
      `UID:hh-oh-${sunday.getTime()}@frontlineestates.com`,
      `DTSTART:${dtStart}`, `DTEND:${dtEnd}`,
      'SUMMARY:Open House: The Harbor House',
      'LOCATION:Port Jefferson\\, NY',
      'DESCRIPTION:Luxury waterfront open house. Hosted by Daniel Foley — (631) 672-9013.',
      'STATUS:CONFIRMED', 'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'harbor-house-open-house.ics'; a.click()
    URL.revokeObjectURL(url)
    setAdded(true); setTimeout(() => setAdded(false), 3000)
  }

  const sunday  = getNextSunday()
  const dateStr = sunday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#060e1e' }}>
      <div className="flex-1 overflow-y-auto">
        <div className="pt-14 pb-3 px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-gold-400 text-[10px] font-bold tracking-[0.38em] uppercase block mb-2">
            Open House Details
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="font-serif font-bold text-white text-2xl sm:text-3xl leading-tight">
            Come experience it yourself.
          </motion.h2>
        </div>

        {/* Open house card */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
          className="mx-4 mb-4 rounded-2xl p-5"
          style={{ background: 'rgba(201,168,76,0.11)', border: '1px solid rgba(201,168,76,0.28)' }}>
          <p className="text-gold-400 text-[9px] font-bold tracking-widest uppercase mb-2">Next Open House</p>
          <p className="font-serif font-bold text-white text-xl leading-tight">{dateStr}</p>
          <p className="text-white/75 text-sm mt-1">12:00 PM – 3:00 PM</p>
          <div className="flex items-center gap-1.5 mt-3">
            <MapPin size={11} className="text-gold-400 flex-shrink-0" />
            <p className="text-white/65 text-xs">Harborview Drive, Port Jefferson, NY 11777</p>
          </div>
        </motion.div>

        {/* Add to calendar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} className="px-4 mb-6">
          <button onClick={downloadICS}
            className="w-full font-bold text-sm py-3.5 rounded-xl transition-all"
            style={added
              ? { background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.35)', color: '#6ee7b7' }
              : { background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)', color: '#060e1e' }}>
            {added ? '✓ Added to Calendar' : '+ Add to Calendar'}
          </button>
        </motion.div>

        {/* Highlights */}
        <div className="px-4 mb-4">
          <p className="text-white/45 text-[9px] font-bold tracking-[0.3em] uppercase mb-3">Property Highlights</p>
          <div className="space-y-2.5">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 + i * 0.07 }}
                className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: '#c9a84c', boxShadow: '0 0 5px rgba(201,168,76,0.6)' }} />
                <p className="text-white/85 text-sm leading-relaxed">{h}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.58 }}
          className="mx-4 mb-5 px-5 py-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '2px solid rgba(201,168,76,0.4)' }}>
          <p className="text-white/55 text-xs leading-relaxed italic">
            "The Harbor House combines timeless architecture with the serenity of waterfront living —
            a rare offering steps from Port Jefferson's vibrant village."
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.62 }} className="flex-shrink-0 px-4 pb-3">
        <AgentCard size="small" />
      </motion.div>
      <NavBar onPrev={onPrev} onNext={onNext} nextLabel="Contact Agent" current={3} />
    </div>
  )
}

/* ─── PAGE 4: Agent & Share ──────────────────────────── */
function Page4({ onClose, onPrev }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (navigator.share) {
      try { await navigator.share({ title: 'The Harbor House — $1,250,000', url }) } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true); setTimeout(() => setCopied(false), 2400)
    }
  }

  const flyerUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareBtns = [
    { label: 'Call',     icon: Phone,         href: `tel:${PHONE}`,   gold: true  },
    { label: 'Text',     icon: MessageSquare, href: `sms:${PHONE}`,   gold: false },
    { label: 'WhatsApp', icon: null,          href: WA_URL,           gold: false },
    { label: 'Share',    icon: Share2,        href: null,             gold: false },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#030810' }}>
      <div className="flex-1 overflow-y-auto">
        <div className="pt-20 pb-5 px-6 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-gold-400 text-[9px] font-bold tracking-[0.38em] uppercase block mb-2">
            Your Personal Connection
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="font-serif font-bold text-white text-2xl sm:text-3xl">
            Schedule a private showing.
          </motion.h2>
        </div>

        {/* Agent card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="px-4 mb-5">
          <AgentCard size="small" />
        </motion.div>

        {/* Share buttons row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="px-4 mb-4">
          <p className="text-white/45 text-[8px] font-bold tracking-[0.3em] uppercase mb-3">Share This Flyer</p>
          <div className="grid grid-cols-4 gap-2">
            {shareBtns.map(({ label, icon: Icon, href, gold }) => {
              const iconEl = Icon ? (
                <Icon size={17} style={{ color: gold ? '#e8c96a' : 'rgba(255,255,255,0.6)' }} />
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              )
              const inner = (
                <div className="flex flex-col items-center gap-1.5 py-3 rounded-2xl w-full"
                  style={{ background: 'rgba(6,14,30,0.65)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: gold ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.07)' }}>
                    {iconEl}
                  </div>
                  <span className="text-white/38 text-[8px] font-bold tracking-wide uppercase">{label}</span>
                </div>
              )
              return href ? (
                <a key={label} href={href} target={label === 'WhatsApp' ? '_blank' : undefined}
                  rel={label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  className="block">{inner}</a>
              ) : (
                <button key={label} onClick={handleShare} className="block w-full"
                  style={{ color: copied ? '#6ee7b7' : undefined }}>
                  {inner}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* QR + copy link */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mx-4 mb-5 rounded-2xl p-4 flex items-center gap-4"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.12)' }}>
          <QRPlaceholder />
          <div className="flex-1 min-w-0">
            <p className="text-white/50 text-[8px] tracking-[0.2em] uppercase mb-1.5">Flyer URL</p>
            <p className="text-white/45 text-[10px] font-mono truncate mb-3">{flyerUrl}</p>
            <button onClick={handleShare}
              className="w-full font-bold text-xs py-2.5 rounded-xl transition-all"
              style={copied
                ? { background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.35)', color: '#6ee7b7' }
                : { background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)', color: '#060e1e' }}>
              {copied ? 'Link Copied!' : 'Copy Flyer Link'}
            </button>
          </div>
        </motion.div>

        {/* Platform line */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
          className="text-white/38 text-[9px] tracking-wide text-center px-6 pb-4 leading-relaxed">
          Designed for Instagram, Facebook, TikTok, WhatsApp, QR codes, and direct sharing.
        </motion.p>

        {/* Back to site */}
        <div className="px-4 pb-8 text-center">
          <button onClick={onClose} className="text-white/40 text-xs hover:text-white/65 transition-colors tracking-wide">
            ← Back to Frontline Estates
          </button>
        </div>
      </div>

      <NavBar
        onPrev={onPrev}
        onNext={onClose}
        nextLabel="Finish"
        prevLabel="Back to Page 3"
        current={4}
        showPrev
      />
    </div>
  )
}

/* ─── Cinematic intro ────────────────────────────────── */
function CinematicIntro({ onEnter }) {
  return (
    <motion.div key="intro"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.65 }}
      className="fixed inset-0 z-[10003] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ background: '#030810' }}>
      <img src={droneImg} aria-hidden className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.38)', transform: 'scale(1.04)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(3,8,16,0.55) 0%, rgba(3,8,16,0.35) 45%, rgba(3,8,16,0.75) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 42%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="w-12 h-px mb-7"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)' }} />
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-gold-400 text-[10px] font-bold tracking-[0.42em] uppercase mb-6">
          Interactive Property Experience
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.58 }}
          className="font-serif font-bold text-white leading-[1.04] mb-4"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 5rem)', textShadow: '0 4px 48px rgba(0,0,0,0.6)' }}>
          The Harbor House
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-white/45 text-sm tracking-widest uppercase mb-12">
          Port Jefferson Waterfront Residence
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.88 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="font-bold text-sm tracking-[0.18em] uppercase rounded-full px-10 py-4 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)', color: '#060e1e',
            boxShadow: '0 0 40px rgba(201,168,76,0.25)' }}>
          Tap to Explore
        </motion.button>
        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="w-12 h-px mt-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)' }} />
      </div>
    </motion.div>
  )
}

/* ─── Agent identity badge (global overlay) ─────────── */
function AgentBadge() {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl px-3 py-2"
      style={{
        background: 'rgba(6,14,30,0.84)',
        border: '1px solid rgba(201,168,76,0.22)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
        maxWidth: 210,
      }}>
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
        style={{ border: '1.5px solid rgba(201,168,76,0.45)' }}>
        <img src={advisorImg} alt="Daniel Foley" className="w-full h-full object-cover object-top" />
      </div>
      <div className="min-w-0">
        <p className="font-serif font-bold text-white text-[11px] leading-tight">Daniel Foley</p>
        <p className="text-gold-400 text-[8px] tracking-widest uppercase leading-tight mt-px">Licensed Real Estate Agent</p>
        <p className="text-white/30 text-[8px] leading-tight mt-0.5">Your personal property guide</p>
      </div>
    </div>
  )
}

/* ─── Page transition variants ───────────────────────── */
const PAGE_VARIANTS = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ?  40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -40 :  40 }),
}

/* ─── Main ───────────────────────────────────────────── */
export default function PropertyFlyer() {
  const navigate = useNavigate()
  const [introGone, setIntroGone]     = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [direction, setDirection]     = useState(1)

  function goNext() { setDirection(1);  setCurrentPage(p => Math.min(p + 1, 4)) }
  function goPrev() { setDirection(-1); setCurrentPage(p => Math.max(p - 1, 1)) }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.title = 'The Harbor House — Interactive Property Flyer'
    return () => {
      document.body.style.overflow = ''
      document.title = 'Frontline Estates | Real Estate for Frontline Families'
    }
  }, [])

  const pages = {
    1: <Page1 onNext={goNext} />,
    2: <Page2 onNext={goNext} onPrev={goPrev} />,
    3: <Page3 onNext={goNext} onPrev={goPrev} />,
    4: <Page4 onClose={() => navigate('/')} onPrev={goPrev} />,
  }

  return (
    <>
      <AnimatePresence>
        {!introGone && <CinematicIntro onEnter={() => setIntroGone(true)} />}
      </AnimatePresence>

      <motion.div
        animate={{ opacity: introGone ? 1 : 0 }}
        transition={{ duration: 0.5, delay: introGone ? 0.15 : 0 }}
        className="fixed inset-0 z-[9999] overflow-hidden"
        style={{ background: '#030810', pointerEvents: introGone ? 'all' : 'none' }}
      >
        {/* Close button */}
        <button onClick={() => navigate('/')}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: 'rgba(6,14,30,0.85)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
          aria-label="Close">
          <X size={16} className="text-white/65" />
        </button>

        {/* Agent identity badge — top-left, persists across all pages */}
        <div className="absolute top-5 left-5 z-20">
          <AgentBadge />
        </div>

        {/* Page slider */}
        <div className="absolute inset-0">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div key={currentPage} custom={direction}
              variants={PAGE_VARIANTS} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 overflow-y-auto">
              {pages[currentPage]}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
