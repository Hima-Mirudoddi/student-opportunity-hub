import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Code2,
  Cpu,
  Palette,
  BarChart3,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Bookmark,
  ExternalLink,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { INTEREST_CATEGORIES } from '../data/interestsData'
import { getDeadlineInfo, formatDeadlineDate } from '../utils/deadlineUtils'

export default function Personalization({
  opportunities = [],
  savedIds = new Set(),
  onToggleBookmark,
  onSelectOpportunity,
}) {
  const [selectedInterest, setSelectedInterest] = useState('Web Development')

  const iconMap = {
    Code2,
    Sparkles: Cpu,
    Palette,
    BarChart3,
    ShieldCheck,
    Briefcase,
    GraduationCap,
  }

  // Filter opportunities matching selected interest
  const recommendedOpportunities = opportunities.filter((opp) =>
    opp.matchInterests.includes(selectedInterest)
  )

  return (
    <section id="personalization" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-indigo-400 text-sm sm:text-base font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Targeted Recommendations</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            Built around what you want to do next.
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Select your focus areas below to preview how OpportunityHub surfaces high-relevance collegiate programs tailored to your goals.
          </p>
        </div>

        {/* Interactive Interest Selector Chips */}
        <div className="flex flex-wrap items-center justify-start gap-2.5 mb-10 max-w-4xl">
          {INTEREST_CATEGORIES.map((cat) => {
            const isSelected = selectedInterest === cat.tag
            const Icon = iconMap[cat.icon] || Sparkles

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedInterest(cat.tag)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30 scale-105'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 hover:bg-slate-800/90'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-200 ml-0.5" />
                )}
              </button>
            )
          })}
        </div>

        {/* Dynamic Context Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-300">
              Because you’re interested in{' '}
              <strong className="text-indigo-300 font-bold">{selectedInterest}</strong>
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {recommendedOpportunities.length} matched recommendations
          </span>
        </div>

        {/* Animated Recommendations Feed */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedInterest}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {recommendedOpportunities.map((opp) => {
              const isBookmarked = savedIds.has(opp.id)
              const deadlineInfo = getDeadlineInfo(opp.deadline)

              return (
                <div
                  key={opp.id}
                  className="rounded-2xl bg-[#0F1523]/90 border border-slate-800 hover:border-indigo-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-300 text-xs">
                          {opp.organizationLogo}
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium">
                            {opp.organization}
                          </p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                            {opp.category}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleBookmark(opp.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                        aria-label="Save opportunity"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isBookmarked ? 'fill-indigo-400 text-indigo-400' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <h4
                      onClick={() => onSelectOpportunity(opp)}
                      className="text-base font-bold text-white hover:text-indigo-300 cursor-pointer transition-colors mb-2 line-clamp-1"
                    >
                      {opp.title}
                    </h4>

                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                      {opp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {opp.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${deadlineInfo.badgeColor} flex items-center gap-1`}
                    >
                      <Clock className="w-3 h-3" />
                      {deadlineInfo.label}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectOpportunity(opp)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
