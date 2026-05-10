import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import droneImg from '../assets/hero/estate-drone.jpg.jpg'

const areas = [
  'Long Island', 'Port Jefferson', 'East Islip', 'Commack', 'Bethpage',
  'Levittown', 'Plainview', 'Bay Shore', 'Babylon', 'Huntington',
  'Smithtown', 'Merrick', 'Amityville', 'Massapequa', 'Garden City',
]

export default function Areas() {
  const [droneErr, setDroneErr] = useState(false)

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Drone image background */}
      {!droneErr ? (
        <img
          src={droneImg}
          alt="Long Island aerial view"
          onError={() => setDroneErr(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
      )}

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-navy-950/68" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_25%,rgba(6,14,30,0.55)_100%)]" />
      {/* Gold atmospheric tint — upper area */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,168,76,0.06),transparent_70%)]" />
      {/* Bottom shadow for flow into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fdfbf7] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-gold-400 text-xs font-bold tracking-widest uppercase">Service Area</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3 mb-4"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            Areas We Cover
          </h2>
          <p className="text-white/55 max-w-xl mx-auto leading-relaxed">
            From the North Shore to the South Shore, we serve communities across Long Island with deep local knowledge.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {areas.map((area, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border cursor-pointer transition-all duration-200 ${
                i === 0
                  ? 'border-gold-400/60 text-[#0a1628] font-semibold'
                  : 'bg-white/[0.07] border-white/20 text-white/80 hover:border-gold-400/55 hover:bg-white/12 hover:text-white'
              }`}
              style={i === 0 ? {
                background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)',
              } : {
                backdropFilter: 'blur(12px)',
              }}
            >
              <MapPin size={13} className={i === 0 ? 'text-[#0a1628]' : 'text-gold-400'} />
              <span className="text-sm font-medium">{area}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
