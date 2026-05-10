import { motion } from 'framer-motion'
import { TrendingUp, User, BadgeCheck } from 'lucide-react'

const cards = [
  { icon: TrendingUp, title: "What Is My\nHome Worth?", sub: "Get an instant market valuation backed by local data.", gradient: 'from-navy-700 to-navy-900', accent: 'text-gold-400', href: '#valuation' },
  { icon: User, title: "Meet the\nAgent", sub: "Discover how Daniel Foley advocates for frontline families.", gradient: 'from-navy-800 to-navy-950', accent: 'text-gold-300', href: '#about' },
  { icon: BadgeCheck, title: "Get\nPre-Approved", sub: "Connect with trusted lenders who understand your mission.", gradient: 'from-charcoal-700 to-charcoal-800', accent: 'text-gold-400', href: '#contact' },
]

export default function QuickActions() {
  return (
    <section className="bg-ivory-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.a key={i} href={c.href}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -8, rotateX: 3, scale: 1.02 }} style={{ transformStyle: 'preserve-3d' }}
              className={`block bg-gradient-to-br ${c.gradient} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer group`}>
              <div className={`w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/15 transition-colors`}>
                <c.icon className={c.accent} size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3 whitespace-pre-line">{c.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{c.sub}</p>
              <div className={`mt-6 text-sm font-semibold ${c.accent} flex items-center gap-2`}>
                Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
