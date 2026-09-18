import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Compass, TrendingUp, Zap } from 'lucide-react'

export default function WhyNowSection() {
  const shifts = [
    {
      title: 'Diverse Pathways',
      desc: 'Careers are no longer defined solely by traditional campus placements. Open-source fellowships, hackathons, and research grants accelerate early student trajectories.',
    },
    {
      title: 'Time Compression',
      desc: 'Top programs open and close application windows within days. Discovering an opportunity late is effectively the same as never discovering it at all.',
    },
    {
      title: 'Fragmented Ecosystems',
      desc: 'When high-value opportunities reside across dozens of private channels and notice boards, the students who succeed are the ones with access to centralized discovery.',
    },
  ]

  return (
    <section className="py-20 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Unenclosed Kicker */}
        <div className="flex items-center gap-2 text-amber-400 text-sm sm:text-base font-bold tracking-wider uppercase mb-3">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>The Modern Student Landscape</span>
        </div>

        {/* Headline strictly following the prompt */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
          There are more ways to build a career than ever.
        </h2>

        {/* Supporting text strictly following the prompt */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-12">
          Internships, open-source programs, hackathons, research, competitions and fellowships can all become part of a student’s journey. The challenge is knowing where to find them — and finding them in time.
        </p>

        {/* 3 Modern Realities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {shifts.map((shift, i) => (
            <div
              key={shift.title}
              className="p-5 rounded-2xl bg-[#0E1322] border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <span className="text-indigo-400 font-mono text-xs font-bold block mb-2">
                0{i + 1}
              </span>
              <h3 className="text-base font-bold text-white mb-2">{shift.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{shift.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
