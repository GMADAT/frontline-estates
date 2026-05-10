import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
import ohImg1 from '../assets/hero/open-house-1.jpg.jpg'
import ohImg2 from '../assets/hero/open-house-2.jpg.jpg'
import ohImg3 from '../assets/hero/mansion-2.jpg.jpg'

const openHouses = [
  { city: 'Levittown', price: '$799,000', date: 'Sun, May 18', time: '12:00–3:00 PM', beds: 4, baths: 2,   gradient: 'from-navy-700 to-navy-900',     img: ohImg1 },
  { city: 'Plainview', price: '$699,999', date: 'Sat, May 17', time: '11:00–2:00 PM', beds: 3, baths: 2,   gradient: 'from-charcoal-700 to-navy-800', img: ohImg2 },
  { city: 'East Islip', price: '$839,000', date: 'Sun, May 18', time: '1:00–4:00 PM', beds: 4, baths: 2.5, gradient: 'from-navy-600 to-charcoal-800', img: ohImg3 },
]

export default function OpenHouses() {
  const [imgErrors, setImgErrors] = useState({})

  return (
    <section className="bg-ivory-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">This Weekend</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy-900 mt-2">Open Houses</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {openHouses.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              {/* Image area */}
              <div className={`h-44 bg-gradient-to-br ${h.gradient} relative overflow-hidden`}>
                {!imgErrors[i] && h.img && (
                  <img
                    src={h.img}
                    alt={`${h.city} open house`}
                    onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute top-4 left-4 bg-gold-gradient text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full">
                  Open House
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin size={13} className="text-gold-500" />
                      <span className="font-bold text-navy-900">{h.city}, NY</span>
                    </div>
                    <span className="font-serif text-2xl font-bold text-navy-900">{h.price}</span>
                  </div>
                  <span className="text-sm text-charcoal-400">{h.beds}bd / {h.baths}ba</span>
                </div>
                <div className="flex gap-4 text-sm text-charcoal-400 mt-4 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gold-400" /> {h.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} className="text-gold-400" /> {h.time}</span>
                </div>
                <button className="mt-4 w-full bg-navy-900 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-navy-700 transition-colors">
                  Get Directions
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
