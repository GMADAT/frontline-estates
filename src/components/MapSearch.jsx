import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'

const previewListings = [
  { city: 'Levittown', price: '$799,000', beds: 4, baths: 2, status: 'Open House' },
  { city: 'Commack', price: '$899,000', beds: 4, baths: 2.5, status: 'Just Listed' },
  { city: 'Babylon', price: '$649,000', beds: 3, baths: 2, status: 'New Price' },
]

export default function MapSearch() {
  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Interactive Search</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy-900 mt-3">Explore by Map</h2>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Map placeholder */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 bg-gradient-to-br from-navy-800 to-navy-950 rounded-3xl overflow-hidden relative min-h-80 flex flex-col items-center justify-center shadow-2xl">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `
                radial-gradient(circle at 30% 40%, rgba(201,168,76,0.3) 0%, transparent 30%),
                radial-gradient(circle at 70% 60%, rgba(42,74,127,0.5) 0%, transparent 40%)
              `
            }} />
            {/* Stylized map grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 60px)' }} />

            {/* Map pins */}
            {[
              { top: '35%', left: '25%', label: 'Levittown' },
              { top: '25%', left: '55%', label: 'Commack' },
              { top: '55%', left: '45%', label: 'Bay Shore' },
              { top: '40%', left: '70%', label: 'Port Jefferson' },
            ].map((pin, i) => (
              <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                className="absolute" style={{ top: pin.top, left: pin.left }}>
                <div className="relative">
                  <div className="w-4 h-4 bg-gold-400 rounded-full border-2 border-white shadow-lg" />
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-navy-900 text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap shadow">
                    {pin.label}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="relative z-10 text-center px-8">
              <p className="text-white/40 text-sm font-medium tracking-wide mb-2">Long Island, NY</p>
              <h3 className="font-serif text-3xl text-white font-bold mb-6">Find Homes<br />Near You</h3>
              <a href="#" className="inline-flex items-center gap-2 bg-gold-gradient text-navy-900 font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                <MapPin size={16} /> Explore Map Search
              </a>
            </div>
          </motion.div>

          {/* Listing preview cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-4">
            {previewListings.map((l, i) => (
              <motion.div key={i} whileHover={{ x: 4 }} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin size={12} className="text-gold-500" />
                      <span className="font-bold text-navy-900 text-sm">{l.city}, NY</span>
                    </div>
                    <span className="font-serif text-xl font-bold text-navy-900">{l.price}</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${l.status === 'Open House' ? 'bg-gold-500/15 text-gold-600' : l.status === 'Just Listed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {l.status}
                  </span>
                </div>
                <p className="text-charcoal-400 text-xs">{l.beds} bd · {l.baths} ba</p>
                <div className="mt-3 flex items-center gap-1 text-navy-700 text-xs font-semibold group-hover:text-gold-600 transition-colors">
                  View Details <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
            <a href="#" className="border-2 border-dashed border-gray-200 rounded-2xl p-5 flex items-center justify-center gap-2 text-charcoal-400 hover:border-gold-400 hover:text-gold-600 transition-colors text-sm font-semibold">
              View All Listings →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
