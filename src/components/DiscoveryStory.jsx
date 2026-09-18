import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  Mail,
  MessageSquare,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

export default function DiscoveryStory() {
  const [activeMode, setActiveMode] = useState('organized') // 'scattered' or 'organized'

  const scatteredSources = [
    {
      name: 'LinkedIn Feeds',
      category: 'Social Noise',
      icon: Briefcase,
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      issue: 'Buried under algorithm posts',
    },
    {
      name: 'College Notices',
      category: 'Department Portals',
      icon: GraduationCap,
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      issue: 'Outdated PDF notice boards',
    },
    {
      name: 'Job Boards',
      category: 'General Portals',
      icon: Globe,
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
      issue: 'Spammed with senior-only roles',
    },
    {
      name: 'Student WhatsApp Groups',
      category: 'Chat Apps',
      icon: MessageSquare,
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      issue: 'Forwarded links without deadlines',
    },
    {
      name: 'Scholarship Sites',
      category: 'External Portals',
      icon: FileText,
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      issue: 'Complex forms & missed closing dates',
    },
    {
      name: 'Research Lab Pages',
      category: 'Faculty Inboxes',
      icon: Sparkles,
      color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
      issue: 'Unlisted fellowships & cold emails',
    },
    {
      name: 'Spammy Inboxes',
      category: 'Direct Mail',
      icon: Mail,
      color: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
      issue: 'Lost newsletters & promotional clutter',
    },
  ]

  return (
    <section id="discovery" className="py-24 relative border-t border-slate-800/80 bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl mb-14"
        >
          {/* Unenclosed Kicker */}
          <div className="flex items-center gap-2 text-indigo-400 text-sm sm:text-base font-bold tracking-wider uppercase mb-3">
            <span className="w-2.5 h-0.5 bg-indigo-500 rounded-full inline-block" />
            <span>Fragmented vs Centralized</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-5">
            You shouldn’t have to look everywhere.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Great opportunities are scattered across websites, communities, college notices and inboxes. Finding the right one often becomes a search of its own.
          </p>

          {/* Interactive State Toggle with physical transition */}
          <div
            className="mt-8 inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner"
            data-cursor="scrub"
          >
            <button
              type="button"
              onClick={() => setActiveMode('scattered')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeMode === 'scattered'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm scale-102'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              The Scattered Reality
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('organized')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeMode === 'organized'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 scale-102'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>With OpportunityHub</span>
            </button>
          </div>
        </motion.div>

        {/* Visual Transformation Container */}
        <div className="relative rounded-3xl bg-slate-900/40 border border-slate-800/80 p-6 sm:p-10 overflow-hidden">
          {activeMode === 'scattered' ? (
            /* SCATTERED STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between text-xs text-rose-400/90 font-medium px-2">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                  7 separate sources · Zero synchronization · High risk of expired deadlines
                </span>
                <span className="text-slate-500 hidden sm:inline font-mono">Chaos State</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {scatteredSources.map((source, idx) => {
                  const Icon = source.icon
                  return (
                    <motion.div
                      key={source.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      data-cursor="inspect"
                      className="p-4 rounded-xl bg-[#0F1422] border border-slate-800 relative hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg border ${source.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{source.name}</h4>
                          <span className="text-[10px] text-slate-500">{source.category}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                        ⚠️ {source.issue}
                      </p>
                    </motion.div>
                  )
                })}

                <div className="p-4 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
                  <p className="text-xs text-slate-500 mb-2">Result: Lost opportunities & cognitive overload</p>
                  <button
                    onClick={() => setActiveMode('organized')}
                    data-cursor="cta"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 underline underline-offset-4"
                  >
                    See how OpportunityHub unifies this →
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ORGANIZED STATE (Scattered -> Organized) */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Scattered inputs funneling */}
                <div className="lg:col-span-5 space-y-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                    Aggregated Sources & Channels
                  </span>
                  <div className="space-y-2">
                    {scatteredSources.slice(0, 5).map((source) => {
                      const Icon = source.icon
                      return (
                        <div
                          key={source.name}
                          data-cursor="inspect"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0F1523] border border-slate-800/90 text-xs text-slate-300 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-3.5 h-3.5 text-indigo-400" />
                            <span className="font-medium text-slate-200">{source.name}</span>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Ingested
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Center: Conduit / Funnel Arrow with line drawing node pulse */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0 relative">
                  {/* Subtle animated connecting path */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shadow-xl shadow-indigo-600/25 relative group">
                    <span className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping pointer-events-none" />
                    <ArrowRight className="w-5 h-5 rotate-90 lg:rotate-0 relative z-10 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <span className="text-[11px] text-indigo-300 font-medium font-mono mt-2.5 text-center">
                    Unified & Normalized
                  </span>
                </div>

                {/* Right: The OpportunityHub Centralized Hub */}
                <div
                  data-cursor="inspect"
                  className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#121A2E] to-[#0A0F1D] border border-indigo-500/40 shadow-2xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                        OH
                      </div>
                      <span className="font-bold text-white text-sm">
                        OpportunityHub
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                      Single Stream
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    All collegiate programs mapped to a standardized format: verified deadlines, direct application routes, skill requirements, and student eligibility criteria.
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">Normalized Deadlines</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Dynamic Tracking
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">Category Tagging</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 6 Dedicated Types
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">Search & Filtering</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Real-time Filter
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
