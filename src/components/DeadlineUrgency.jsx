import React from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertCircle, ArrowRight, ShieldAlert, Sparkles, Calendar, Bookmark } from 'lucide-react'
import { getDeadlineInfo, formatDeadlineDate } from '../utils/deadlineUtils'

export default function DeadlineUrgency({
  opportunities = [],
  savedIds = new Set(),
  onToggleBookmark,
  onSelectOpportunity,
}) {
  // Sort opportunities by days remaining ascending
  const sortedByDeadline = [...opportunities]
    .map((opp) => ({
      ...opp,
      deadlineInfo: getDeadlineInfo(opp.deadline),
    }))
    .filter((opp) => !opp.deadlineInfo.isExpired)
    .sort((a, b) => a.deadlineInfo.daysRemaining - b.deadlineInfo.daysRemaining)
    .slice(0, 4)

  return (
    <section id="urgency" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-rose-400 text-sm sm:text-base font-bold tracking-wider uppercase mb-3">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Time-Sensitive Opportunities</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            Don’t discover it after the deadline.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Most students find out about top internships and hackathons after applications close. OpportunityHub visualizes approaching deadlines so you act in time.
          </p>
        </div>

        {/* Dynamic Deadline Radar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sortedByDeadline.map((opp, idx) => {
            const isBookmarked = savedIds.has(opp.id)
            const isCritical = opp.deadlineInfo.daysRemaining <= 1

            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                data-cursor="scrub"
                className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 backdrop-blur-md hover:-translate-y-1 ${
                  isCritical
                    ? 'bg-gradient-to-b from-rose-950/20 to-[#0F1424] border border-rose-500/40 shadow-lg shadow-rose-950/20'
                    : 'bg-[#0F1523]/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Urgency Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${opp.deadlineInfo.badgeColor}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          opp.deadlineInfo.urgency === 'critical'
                            ? 'bg-rose-400 animate-ping'
                            : 'bg-amber-400'
                        }`}
                      />
                      {opp.deadlineInfo.label}
                    </span>

                    <button
                      type="button"
                      onClick={() => onToggleBookmark(opp.id)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isBookmarked
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                      aria-label="Bookmark"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isBookmarked ? 'fill-indigo-400 text-indigo-400' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title & Organization */}
                  <h3
                    onClick={() => onSelectOpportunity(opp)}
                    className="text-base font-bold text-white hover:text-indigo-300 cursor-pointer transition-colors mb-1 line-clamp-1"
                  >
                    {opp.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">{opp.organization}</p>

                  <div className="text-[11px] text-indigo-300/90 font-medium mb-4 bg-indigo-950/30 px-2.5 py-1.5 rounded-lg border border-indigo-500/20">
                    {opp.perks}
                  </div>
                </div>

                <div>
                  {/* Progress Indicator */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {formatDeadlineDate(opp.deadline)}
                      </span>
                      <span className="font-mono text-slate-300 text-[10px]">
                        {opp.deadlineInfo.daysRemaining === 0 ? 'Today' : `${opp.deadlineInfo.daysRemaining}d left`}
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${opp.deadlineInfo.barColor}`}
                        style={{ width: `${Math.max(10, opp.deadlineInfo.percentRemaining)}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    data-cursor="cta"
                    onClick={() => onSelectOpportunity(opp)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Before It Closes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
