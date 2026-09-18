import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import InteractivePreview from './InteractivePreview'

export default function Hero({
  opportunities = [],
  savedIds = new Set(),
  onToggleBookmark,
  onSelectOpportunity,
  onExploreClick,
  onHowItWorksClick,
}) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Story Pitch & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Unenclosed Status Kicker */}
            <div className="flex items-center gap-2 text-indigo-400 text-sm sm:text-base font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Unified Opportunity Discovery for Students</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Your next opportunity <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-purple-300">
                shouldn’t be hiding.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl font-normal leading-relaxed">
              Internships, hackathons, scholarships and more — discover opportunities that match what you want to do next.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onHowItWorksClick}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-slate-400" />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Value Signals */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Single Source</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dynamic Deadlines</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Zero Clutter</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Product Dashboard Preview */}
          <div className="lg:col-span-6">
            <InteractivePreview
              previewOpportunities={opportunities}
              savedIds={savedIds}
              onToggleBookmark={onToggleBookmark}
              onSelectOpportunity={onSelectOpportunity}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
