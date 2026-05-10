import { motion } from 'framer-motion'
import { Shield, Heart, AlertTriangle, Flame, Lock, Star, Stethoscope, GraduationCap } from 'lucide-react'
import heroVideo from '../assets/videos/frontline-heroes.mp4.mp4'

const groups = [
  { icon: Shield, label: 'Police Officers' },
  { icon: Heart, label: 'Nurses & Healthcare' },
  { icon: AlertTriangle, label: 'EMTs & Paramedics' },
  { icon: Flame, label: 'Firefighters' },
  { icon: Lock, label: 'Corrections Officers' },
  { icon: Star, label: 'Veterans' },
  { icon: Stethoscope, label: 'Healthcare Workers' },
  { icon: GraduationCap, label: 'Teachers' },
]

export default function FirstResponder() {
  return (
    <section className="bg-navy-900 py-24 px-4 overflow-hidden relative">

      {/* ── VIDEO BACKGROUND ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      >
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'blur(0.8px) brightness(0.45)',
            opacity: 0.72,
          }}
        />
      </motion.div>

      {/* Dark navy overlay — keeps text fully readable */}
      <div className="absolute inset-0 z-[1] bg-navy-950/60" />

      {/* Existing ambient decorations — sit above video */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_0%_100%,rgba(201,168,76,0.06),transparent_60%)]" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_100%_0%,rgba(42,74,127,0.3),transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block border border-gold-400/30 text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase px-5 py-2 rounded-full mb-6">
              First Responder Program
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Exclusive savings for<br /><em className="text-gold-400 not-italic">those who serve.</em>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Eligible buyers and sellers may receive a closing credit or rebate where permitted by law — as our way of honoring your service.
            </p>
          </motion.div>
        </div>

        {/* Groups grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {groups.map((g, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/12 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold-500/25 transition-colors">
                <g.icon className="text-gold-400" size={22} />
              </div>
              <p className="text-white/80 text-sm font-medium">{g.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Example savings card */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-gold-500/15 to-gold-600/5 border border-gold-400/20 rounded-3xl p-8">
            <p className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4">Example Savings</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-serif text-5xl font-bold text-white">$1,250</span>
              <span className="text-white/40 text-sm">back at closing</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              On a <strong className="text-white">$500,000 purchase</strong>, a 0.25% incentive may equal $1,250 back at closing.*
            </p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
              <motion.div initial={{ width: 0 }} whileInView={{ width: '25%' }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
                className="h-full bg-gold-gradient rounded-full" />
            </div>
            <p className="text-white/30 text-xs leading-relaxed italic">
              *Incentives subject to brokerage approval, lender rules, state law, and transaction eligibility.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-5">
            <h3 className="font-serif text-3xl text-white font-bold">You serve every day.<br /><span className="text-gold-400">Let us serve you.</span></h3>
            <p className="text-white/60 leading-relaxed">Our First Responder Incentive Program is designed to recognize the sacrifices made by those who protect, heal, and educate our communities — by helping them achieve homeownership with less out-of-pocket cost.</p>
            <a href="#contact" className="inline-flex items-center gap-3 bg-gold-gradient text-navy-900 font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              See If You Qualify →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
