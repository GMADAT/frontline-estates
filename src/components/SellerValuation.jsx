import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Users, BarChart3 } from 'lucide-react'

const benefits = [
  { icon: TrendingUp, text: 'Multiple estimates from trusted sources' },
  { icon: DollarSign, text: 'Recent sold prices in your neighborhood' },
  { icon: Users, text: 'See potential buyers actively searching' },
  { icon: BarChart3, text: 'Local market trends and insight' },
]

export default function SellerValuation() {
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')

  return (
    <section id="valuation" className="bg-navy-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase">Instant Valuation</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
              See what your home<br /><em className="text-gold-400 not-italic">could be worth.</em>
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">Get a comprehensive view of your home&apos;s market value using real-time data, recent comparable sales, and deep local expertise.</p>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center flex-shrink-0">
                    <b.icon size={18} className="text-gold-400" />
                  </div>
                  <p className="text-white/70">{b.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl p-8 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-bold mb-2">Get My Estimate</h3>
            <p className="text-white/50 text-sm mb-8">Enter your address for a free, no-obligation home value report.</p>
            <div className="space-y-4">
              <div>
                <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">Street Address</label>
                <input value={address} onChange={e => setAddress(e.target.value)}
                  placeholder="123 Main Street, Levittown, NY"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-400 transition-colors text-sm" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">Unit / Apt (Optional)</label>
                <input value={unit} onChange={e => setUnit(e.target.value)}
                  placeholder="Unit 4B"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold-400 transition-colors text-sm" />
              </div>
              <button className="w-full bg-gold-gradient text-navy-900 font-bold py-4 rounded-xl text-base hover:opacity-90 transition-opacity shadow-lg mt-2">
                Get My Estimate →
              </button>
            </div>
            <p className="text-white/25 text-xs mt-5 text-center">No obligation. Your information is kept private.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
