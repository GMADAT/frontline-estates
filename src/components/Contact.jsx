import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import waterfrontVideo from '../assets/videos/waterfront-drone.mp4.mp4'

const info = [
  {
    icon: Mail,
    label: 'Email',
    value: 'daniel@frontlineestates.com',
    href: 'mailto:daniel@frontlineestates.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(631) 672-9013',
    href: 'tel:6316729013',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Port Jefferson, Long Island, NY',
    href: '#',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0  },
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-36 px-4 overflow-hidden"
      style={{ background: '#030810' }}
    >
      {/* ── WATERFRONT VIDEO BACKGROUND ── */}
      <video
        src={waterfrontVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.52)', opacity: 0.82 }}
      />

      {/* Dark navy overlay — keeps text legible while estate is visible */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(3,8,16,0.52) 0%, rgba(3,8,16,0.44) 50%, rgba(3,8,16,0.62) 100%)' }}
      />

      {/* Ambient gold bloom at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Eyebrow */}
        <motion.span
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="inline-block text-gold-400 text-xs font-semibold tracking-[0.38em] uppercase mb-10"
        >
          Private Consultation
        </motion.span>

        {/* Heading */}
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true }} transition={{ duration: 0.72, delay: 0.08 }}
          className="font-serif font-bold text-white leading-[1.06] mb-7"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', textShadow: '0 4px 48px rgba(0,0,0,0.55)' }}
        >
          Begin your<br />
          <em
            className="not-italic"
            style={{
              background: 'linear-gradient(135deg, #e8c96a 0%, #c9a84c 55%, #d4a843 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            next chapter.
          </em>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true }} transition={{ duration: 0.72, delay: 0.18 }}
          className="text-white/45 text-lg leading-relaxed max-w-lg mx-auto mb-14"
        >
          Whether you're buying, selling, or simply exploring your options — Daniel
          provides discreet, expert guidance tailored to your life and timeline.
        </motion.p>

        {/* Hairline divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.26 }}
          className="w-16 h-px mx-auto mb-14 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)' }}
        />

        {/* Contact info */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true }} transition={{ duration: 0.72, delay: 0.32 }}
          className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-16 mb-16"
        >
          {info.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="group flex flex-col items-center gap-3.5"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{
                  border: '1px solid rgba(201,168,76,0.22)',
                  background: 'rgba(201,168,76,0.07)',
                }}
              >
                <Icon size={17} className="text-gold-400" />
              </div>
              <div>
                <p className="text-white/25 text-[9px] tracking-[0.28em] uppercase mb-1">{label}</p>
                <p className="text-white/75 text-sm font-medium group-hover:text-gold-400 transition-colors duration-200">
                  {value}
                </p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true }} transition={{ duration: 0.72, delay: 0.42 }}
        >
          <a
            href="tel:6316729013"
            className="btn-shine inline-flex items-center gap-3 font-bold text-sm tracking-wide rounded-xl px-11 py-4 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)',
              color: '#060e1e',
            }}
          >
            Schedule Private Consultation
          </a>
          <p className="text-white/20 text-xs mt-5 tracking-wide">
            Confidential · No obligation · Responds within 2 hours
          </p>
        </motion.div>

      </div>
    </section>
  )
}
