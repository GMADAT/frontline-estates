import { motion } from 'framer-motion'
import { Search, FileText, BadgeCheck, Handshake, BarChart2, Camera, MessageSquare, ShieldCheck } from 'lucide-react'

const buyers = [
  { icon: Search, title: 'Home Search Strategy', desc: 'Curated property searches aligned with your lifestyle and budget.' },
  { icon: FileText, title: 'Offer Guidance', desc: 'Expert advice on crafting competitive offers in any market.' },
  { icon: BadgeCheck, title: 'Incentive Review', desc: 'Full review of first responder credits and down payment programs.' },
  { icon: Handshake, title: 'Closing Coordination', desc: 'Seamless management from accepted offer to keys in hand.' },
]
const sellers = [
  { icon: BarChart2, title: 'Pricing Strategy', desc: 'Data-driven pricing to maximize your sale price and timeline.' },
  { icon: Camera, title: 'Listing Preparation', desc: 'Professional staging guidance and cinematic photography.' },
  { icon: MessageSquare, title: 'Cinematic Marketing', desc: 'Premium digital marketing that attracts serious buyers.' },
  { icon: ShieldCheck, title: 'Negotiation Support', desc: 'Disciplined representation to protect your interests.' },
]

export default function Services() {
  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Full-Service Representation</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy-900 mt-3">Buyer &amp; Seller Services</h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-ivory-50 rounded-3xl p-8 lg:p-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h3 className="font-serif text-3xl font-bold mb-8 text-navy-900">For Buyers</h3>
              <div className="space-y-5">
                {buyers.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-ivory-200 flex items-center justify-center flex-shrink-0 group-hover:bg-navy-900 transition-colors duration-300">
                      <item.icon size={20} className="text-navy-700 group-hover:text-gold-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 mb-0.5">{item.title}</p>
                      <p className="text-charcoal-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="bg-navy-900 rounded-3xl p-8 lg:p-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h3 className="font-serif text-3xl font-bold mb-8 text-white">For Sellers</h3>
              <div className="space-y-5">
                {sellers.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors duration-300">
                      <item.icon size={20} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-0.5">{item.title}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
