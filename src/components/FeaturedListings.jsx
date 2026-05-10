import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bed, Bath, Maximize, MapPin, ArrowRight } from 'lucide-react'

import img1 from '../assets/hero/mansion-1.jpg.jpg'
import img2 from '../assets/hero/mansion-2.jpg.jpg'
import img3 from '../assets/hero/kitchen-1.jpg.jpg'
import img4 from '../assets/listings/exterior-1.jpg'

const listings = [
  {
    city: 'East Moriches', price: '$769,000', beds: 5, baths: 2, sqft: '1,776',
    type: 'Single Family', status: 'Just Listed',
    gradient: 'from-slate-700 via-slate-800 to-[#0a1628]',
    img: img1,
    desc: 'Spacious colonial on a private lot with mature landscaping, updated kitchen, and large backyard.',
  },
  {
    city: 'East Islip', price: '$839,000', beds: 4, baths: 2.5, sqft: '1,967',
    type: 'Single Family', status: 'Open House',
    gradient: 'from-[#1e3a5f] via-[#0d1f3c] to-[#1a1a1a]',
    img: img2,
    desc: 'Elegant center-hall layout, sun-drenched living spaces, and walking distance to waterfront parks.',
  },
  {
    city: 'Commack', price: '$899,000', beds: 4, baths: 2.5, sqft: '2,206',
    type: 'Single Family', status: 'Just Listed',
    gradient: 'from-[#2d2d2d] via-[#1a2f50] to-[#060e1e]',
    img: img3,
    desc: 'Newly renovated chef\'s kitchen, open floor plan, premium finishes, and top-rated school district.',
  },
  {
    city: 'Port Jefferson', price: '$779,000', beds: 4, baths: 3, sqft: '1,800',
    type: 'Single Family', status: 'Open House',
    gradient: 'from-[#1a2f50] via-[#0d1f3c] to-[#1a1a1a]',
    img: img4,
    desc: 'Timeless curb appeal, generous primary suite, and steps from the vibrant village and harbor.',
  },
]

function ListingImage({ src, gradient, alt, zoom, lightPos }) {
  const [err, setErr] = useState(false)
  const lx = lightPos ? lightPos.x * 100 : 50
  const ly = lightPos ? lightPos.y * 100 : 30
  return (
    <div className="absolute inset-0 overflow-hidden">
      {!err && src ? (
        <motion.img
          src={src} alt={alt}
          onError={() => setErr(true)}
          animate={{
            scale: zoom ? 1.09 : 1,
            x: zoom ? (lightPos ? (lightPos.x - 0.5) * -8 : 0) : 0,
            y: zoom ? (lightPos ? (lightPos.y - 0.5) * -5 : 0) : 0,
          }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      )}
      {/* Base cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent" />
      {/* Mouse-tracking directional light */}
      {zoom && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse 55% 45% at ${lx}% ${ly}%, rgba(201,168,76,0.14) 0%, transparent 70%)`,
            opacity: 1,
          }}
        />
      )}
      {/* Glass reflection highlight strip at top */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '38%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, transparent 100%)',
        }}
      />
      {/* Thin diagonal gloss line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.035) 50%, transparent 58%)',
        }}
      />
    </div>
  )
}

function PreviewPanel({ listing }) {
  const [err, setErr] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-72 z-50
                 bg-[#0d1f3c]/95 backdrop-blur-xl border border-white/10 rounded-2xl
                 shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-none"
    >
      {/* Preview image */}
      <div className="h-36 relative overflow-hidden">
        {!err && listing.img ? (
          <img src={listing.img} alt={listing.city} onError={() => setErr(true)} className="w-full h-full object-cover scale-105" />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${listing.gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c]/80 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="font-serif text-lg font-bold text-white">{listing.price}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full ${listing.status === 'Open House' ? 'bg-[#c9a84c] text-[#0a1628]' : 'bg-white text-[#0a1628]'}`}>
            {listing.status}
          </span>
        </div>
      </div>

      {/* Preview body */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <MapPin size={11} className="text-[#c9a84c]" />
          <span className="font-bold text-white text-sm">{listing.city}, NY</span>
        </div>
        <p className="text-white/50 text-xs mb-3 leading-relaxed">{listing.desc}</p>
        <div className="flex gap-4 text-white/70 text-xs mb-4 border-t border-white/10 pt-3">
          <span className="flex items-center gap-1"><Bed size={11} /> {listing.beds} bd</span>
          <span className="flex items-center gap-1"><Bath size={11} /> {listing.baths} ba</span>
          <span className="flex items-center gap-1"><Maximize size={11} /> {listing.sqft} sf</span>
        </div>
        <div className="flex items-center gap-2 text-[#c9a84c] text-xs font-bold tracking-wide">
          View Private Details <ArrowRight size={12} />
        </div>
      </div>

      {/* Arrow pointer */}
      <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0d1f3c] border-r border-b border-white/10 rotate-45" />
    </motion.div>
  )
}

export default function FeaturedListings() {
  const [hovered, setHovered] = useState(null)
  const [lightPos, setLightPos] = useState({})

  const handleMouseMove = (e, i) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setLightPos(prev => ({
      ...prev,
      [i]: {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }))
  }

  return (
    <section className="bg-white py-24 px-4 overflow-visible">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Featured Properties</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy-900 mt-2 leading-tight">Current Listings</h2>
          </div>
          <a href="#" className="text-navy-700 text-sm font-semibold border-b border-navy-300 hover:border-gold-500 hover:text-gold-600 transition-colors pb-0.5 whitespace-nowrap self-start sm:self-auto">
            View All Properties →
          </a>
        </motion.div>

        {/* Grid — overflow visible so preview panels aren't clipped */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6" style={{ overflow: 'visible' }}>
          {listings.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative"
              style={{ overflow: 'visible' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onMouseMove={(e) => handleMouseMove(e, i)}
            >
              {/* Hover preview — desktop only */}
              <div className="hidden md:block">
                <AnimatePresence>
                  {hovered === i && <PreviewPanel listing={l} />}
                </AnimatePresence>
              </div>

              {/* Card */}
              <motion.div
                animate={hovered === i
                  ? { y: -10, rotateX: 3, rotateY: -2, scale: 1.02 }
                  : { y: 0, rotateX: 0, rotateY: 0, scale: 1 }
                }
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                  boxShadow: hovered === i
                    ? '0 28px 72px rgba(0,0,0,0.28), 0 6px 20px rgba(0,0,0,0.16), 0 0 40px rgba(201,168,76,0.10)'
                    : '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.35s ease',
                }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer"
              >
                {/* Image area */}
                <div className="h-52 relative">
                  <ListingImage src={l.img} gradient={l.gradient} alt={l.city} zoom={hovered === i} lightPos={lightPos[i]} />

                  {/* Status badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`text-xs font-bold tracking-wide px-3 py-1.5 rounded-full shadow-md ${l.status === 'Open House' ? 'bg-[#c9a84c] text-[#0a1628]' : 'bg-white text-[#0a1628]'}`}>
                      {l.status}
                    </span>
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="font-serif text-2xl font-bold text-white" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
                      {l.price}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <MapPin size={13} className="text-gold-500" />
                    <span className="font-semibold text-navy-900 text-sm">{l.city}, NY</span>
                  </div>
                  <p className="text-charcoal-400 text-xs mb-4">{l.type}</p>
                  <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-4">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-navy-700">
                        <Bed size={13} /><span className="font-bold text-sm">{l.beds}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">Beds</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-navy-700">
                        <Bath size={13} /><span className="font-bold text-sm">{l.baths}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">Baths</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-navy-700">
                        <Maximize size={13} /><span className="font-bold text-sm">{l.sqft}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">Sq Ft</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full border border-navy-800 text-navy-900 text-sm font-semibold py-2.5 rounded-lg transition-colors duration-200 hover:bg-navy-900 hover:text-white">
                    View Details
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
