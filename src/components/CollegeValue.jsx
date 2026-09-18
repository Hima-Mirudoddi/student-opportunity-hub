import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  GraduationCap,
  Building,
  TrendingUp,
  BarChart3,
  Calendar,
  Users,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react'
import { CONCEPTUAL_CAMPUS_METRICS } from '../data/adminMetricsData'

function AnimatedNumber({ value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayVal, setDisplayVal] = useState('0')

  useEffect(() => {
    if (!isInView) return

    // Extract raw number, e.g. "3,420" -> 3420, "148" -> 148
    const rawNumber = parseInt(value.replace(/[^0-9]/g, ''), 10)
    if (isNaN(rawNumber)) {
      setDisplayVal(value)
      return
    }

    const hasComma = value.includes(',')
    const duration = 1200 // ms
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(rawNumber * ease)

      setDisplayVal(hasComma ? current.toLocaleString() : current.toString())

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setDisplayVal(value)
      }
    }

    requestAnimationFrame(updateCounter)
  }, [isInView, value])

  return <span ref={ref}>{displayVal}</span>
}

export default function CollegeValue() {
  const { summaryCards, popularCategories, topStudentInterests, recentCampusDistributions } =
    CONCEPTUAL_CAMPUS_METRICS

  return (
    <section id="colleges" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl mb-14"
        >
          <div className="flex items-center gap-2 text-indigo-400 text-sm sm:text-base font-bold tracking-wider uppercase mb-3">
            <Building className="w-4 h-4 text-indigo-400" />
            <span>Campus Ecosystem</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            Make opportunity discovery part of the student experience.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Placement departments and faculty cells often struggle with fragmented email lists and unread PDF notices. OpportunityHub enables institutions to centralize and observe what students are exploring.
          </p>
        </motion.div>

        {/* Conceptual Ecosystem Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-[#0B101D] border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden"
          data-cursor="inspect"
        >
          {/* Ecosystem Header Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-8">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Institutional Ecosystem Portal
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              University partner administrative overview
            </span>
          </div>

          {/* Metric Summary Cards with Number Interpolation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {summaryCards.map((metric, idx) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                data-cursor="inspect"
                className="p-4 rounded-xl bg-[#0F1524] border border-slate-800/90 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5 group"
              >
                <p className="text-xs text-slate-400 mb-1 group-hover:text-slate-300 transition-colors">
                  {metric.title}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold text-white font-mono">
                    <AnimatedNumber value={metric.value} />
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400">
                    {metric.change}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">{metric.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* Dual Panel: Category Distribution + Top Interests */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left: Category Volume Distribution with Scrub State */}
            <div
              className="lg:col-span-7 p-5 rounded-xl bg-[#0F1524] border border-slate-800"
              data-cursor="scrub"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  Ecosystem Category Breakdown
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">Simulated Campus Sample</span>
              </div>

              <div className="space-y-3">
                {popularCategories.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{cat.name}</span>
                      <span className="text-slate-400 font-mono">{cat.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cat.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Student Interest Affinity */}
            <div
              className="lg:col-span-5 p-5 rounded-xl bg-[#0F1524] border border-slate-800 flex flex-col justify-between"
              data-cursor="inspect"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Student Career Interests
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">Current Cohort</span>
                </div>

                <div className="space-y-2.5">
                  {topStudentInterests.map((interest) => (
                    <div
                      key={interest.field}
                      className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                    >
                      <span className="text-slate-300 font-medium">{interest.field}</span>
                      <span className="text-indigo-300 font-semibold bg-indigo-950/40 px-2 py-0.5 rounded text-[11px] border border-indigo-500/20 font-mono">
                        {interest.engagement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Enables department mentors to tailor hackathon grants and industry referrals.
              </div>
            </div>
          </div>

          {/* Recent Campus Feed */}
          <div className="p-5 rounded-xl bg-[#0F1524] border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Recent Verified Program Broadcasts
              </h4>
              <span className="text-[11px] text-slate-500">Live feed preview</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {recentCampusDistributions.map((item) => (
                <div
                  key={item.title}
                  data-cursor="inspect"
                  className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-white block mb-0.5">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block mb-2">
                      {item.department}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px]">
                    <span className="text-emerald-400 font-medium">{item.status}</span>
                    <span className="text-amber-400 font-mono">{item.daysLeft}d left</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
