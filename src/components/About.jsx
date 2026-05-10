import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Award } from 'lucide-react'
import advisorPortrait from '../assets/hero/advisor.jpg.png'

export default function About() {
  const [portraitErr, setPortraitErr] = useState(false)
  return (
    <section id="about" className="bg-ivory-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-center lg:items-start">
            <motion.div whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }} style={{ transformStyle: 'preserve-3d' }}
              className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl shadow-2xl border-4 border-white mb-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)' }}>
              {/* Advisor portrait */}
              {!portraitErr ? (
                <img
                  src={advisorPortrait}
                  alt="Daniel Foley"
                  onError={() => setPortraitErr(true)}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              ) : null}
              {/* Dark overlay so badge remains legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-navy-950/10" />
              {/* Credential badge */}
              <div className="absolute bottom-4 right-4 bg-gold-gradient rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                <Award size={14} className="text-navy-900" />
                <span className="text-navy-900 text-xs font-bold">Licensed Salesperson</span>
              </div>
            </motion.div>

            {/* Contact details */}
            <div className="space-y-3 w-full max-w-xs">
              {[
                { icon: Phone, text: '631-672-9013', href: 'tel:6316729013' },
                { icon: Mail, text: 'agent@example.com', href: 'mailto:agent@example.com' },
                { icon: MapPin, text: '128 Main St, Port Jefferson, NY', href: '#' },
              ].map((c, i) => (
                <a key={i} href={c.href} className="flex items-center gap-3 text-navy-800 hover:text-gold-600 transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-navy-900 transition-colors">
                    <c.icon size={15} className="text-navy-700 group-hover:text-gold-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium">{c.text}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Your Agent</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy-900 mt-3 mb-2">Daniel Foley</h2>
            <p className="text-charcoal-400 text-sm font-medium tracking-wide mb-6">Licensed Real Estate Salesperson · Frontline Realty Group</p>
            <div className="h-0.5 w-16 bg-gold-gradient mb-8 rounded-full" />
            <p className="text-charcoal-600 text-lg leading-relaxed mb-6">
              Daniel helps buyers, sellers, and frontline families navigate real estate with clarity, calm communication, and disciplined market strategy.
            </p>
            <p className="text-charcoal-400 leading-relaxed mb-10">
              With deep roots on Long Island and a commitment to serving those who serve our communities, Daniel brings a no-pressure, client-first approach to every transaction — from first-time buyers to seasoned sellers.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {['First Responder Specialist', 'Long Island Expert', 'Buyer Representation', 'Seller Strategy'].map(tag => (
                <span key={tag} className="bg-navy-900 text-white text-xs font-semibold px-4 py-2 rounded-full">{tag}</span>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-3 bg-gold-gradient text-navy-900 font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              Work With Daniel →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
