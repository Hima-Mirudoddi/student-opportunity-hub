import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2, Mail } from 'lucide-react'

export default function FinalCTA({ onExploreClick, onSubscribeSuccess }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSubscribed(true)
    if (onSubscribeSuccess) {
      onSubscribeSuccess('Subscribed to opportunity radar alerts!')
    }
  }

  return (
    <section id="cta" className="py-24 relative bg-gradient-to-b from-[#090D16] via-[#0C1222] to-[#090D16] border-t border-slate-800/80 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA Heading */}
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-5">
          Your next opportunity is out there.
        </h2>

        {/* Supporting text */}
        <p className="text-xl sm:text-2xl text-slate-300 max-w-xl mx-auto font-normal mb-8">
          Make it easier to find what’s next.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/45 transition-all duration-200 flex items-center justify-center gap-2 group transform active:scale-95"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Student Weekly Digest Box */}
        <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#0F1524]/90 border border-slate-800/90 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Weekly Opportunity Radar</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Get curated alerts for opportunities closing in the upcoming 7 days.
          </p>

          {subscribed ? (
            <div className="py-2.5 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>You’re on the priority radar!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
