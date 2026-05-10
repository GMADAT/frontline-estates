import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bed, Bath, Maximize, MapPin, CheckCircle } from 'lucide-react'
import img1 from '../assets/hero/mansion-1.jpg.jpg'
import img2 from '../assets/hero/mansion-2.jpg.jpg'
import img3 from '../assets/hero/open-house-1.jpg.jpg'
import img4 from '../assets/hero/open-house-2.jpg.jpg'

const sold = [
  { city: 'Port Jefferson', price: '$825,000',   beds: 4, baths: 3,   sqft: '2,100', img: img1 },
  { city: 'Smithtown',      price: '$940,000',   beds: 5, baths: 4,   sqft: '3,200', img: img2 },
  { city: 'Huntington',     price: '$1,250,000', beds: 5, baths: 4.5, sqft: '4,100', img: img3 },
  { city: 'Garden City',    price: '$1,475,000', beds: 6, baths: 5,   sqft: '4,800', img: img4 },
]

function SoldCard({ property, index }) {
  const [imgErr, setImgErr] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? '0 20px 52px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.10)'
          : '0 4px 18px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="h-52 relative overflow-hidden bg-gradient-to-br from-navy-700 to-navy-950">
        {!imgErr && (
          <motion.img
            src={property.img}
            alt={property.city}
            onError={() => setImgErr(true)}
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
        )}

        {/* Sold muted overlay — desaturates the image slightly */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(10,22,40,0.38)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Bottom scrim for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {/* SOLD badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          <CheckCircle size={12} className="text-emerald-500" />
          SOLD
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <span
            className="font-serif text-2xl font-bold text-white"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
          >
            {property.price}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Gold accent line */}
        <div
          className="w-8 h-0.5 mb-3 rounded-full"
          style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c96a)' }}
        />

        <div className="flex items-center gap-1.5 mb-4">
          <MapPin size={13} className="text-gold-500 flex-shrink-0" />
          <span className="font-semibold text-navy-900 text-sm">{property.city}, NY</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-4">
          <div>
            <div className="flex items-center justify-center gap-1 text-navy-700">
              <Bed size={13} /><span className="font-bold text-sm">{property.beds}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Beds</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-navy-700">
              <Bath size={13} /><span className="font-bold text-sm">{property.baths}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Baths</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-navy-700">
              <Maximize size={13} /><span className="font-bold text-sm">{property.sqft}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Sq Ft</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function RecentlySold() {
  return (
    <section className="bg-ivory-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Recent Success</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy-900 mt-2 leading-tight">
              Recently Sold Homes
            </h2>
            <p className="text-charcoal-400 mt-3 max-w-md leading-relaxed">
              A selection of recent client results across Long Island.
            </p>
          </div>

          {/* Decorative gold rule */}
          <div
            className="hidden sm:block flex-shrink-0 w-24 h-px self-center mb-2"
            style={{ background: 'linear-gradient(90deg, transparent, #c9a84c)' }}
          />
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {sold.map((property, i) => (
            <SoldCard key={i} property={property} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
