import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Bookmark,
  Clock,
  Sparkles,
  ExternalLink,
  MapPin,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react'
import { getDeadlineInfo } from '../utils/deadlineUtils'

export default function InteractivePreview({
  previewOpportunities = [],
  savedIds = new Set(),
  onToggleBookmark,
  onSelectOpportunity,
}) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['All', 'Internships', 'Hackathons', 'Research']

  const filteredPreview = previewOpportunities
    .filter((opp) => {
      if (activeCategory === 'All') return true
      return opp.category === activeCategory
    })
    .filter((opp) => {
      if (!searchTerm) return true
      return (
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })
    .slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#0B101D] border border-slate-700/60 shadow-2xl shadow-indigo-950/40 p-4 sm:p-6 backdrop-blur-xl"
    >
      {/* Window Controls & Recommendation Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400 font-medium">
            hub-discovery.preview
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Curated for College Builders</span>
        </div>
      </div>

      {/* Mini Search Bar + Filter Bar */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Quick preview search (e.g. React, ML, Hackathon)..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap text-[11px] ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Opportunity Preview Cards */}
      <div className="space-y-3">
        {filteredPreview.length > 0 ? (
          filteredPreview.map((opp) => {
            const isBookmarked = savedIds.has(opp.id)
            const deadline = getDeadlineInfo(opp.deadline)

            return (
              <motion.div
                key={opp.id}
                layout
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-indigo-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0">
                    {opp.organizationLogo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {opp.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                        {opp.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>{opp.organization}</span>
                      <span>•</span>
                      <span className="text-indigo-400/90">{opp.perks}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                  {/* Dynamic deadline pill */}
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${deadline.badgeColor} flex items-center gap-1 shrink-0`}
                  >
                    <Clock className="w-3 h-3" />
                    {deadline.label}
                  </span>

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

                  <button
                    type="button"
                    onClick={() => onSelectOpportunity(opp)}
                    className="p-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs"
                    title="View details"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )
          })
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            No preview opportunities match this filter.
          </div>
        )}
      </div>

      {/* Interactive Teaser Footnote */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live interactive stream
        </span>
        <a
          href="#catalog"
          className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline flex items-center gap-1"
        >
          View all 12 opportunities →
        </a>
      </div>
    </motion.div>
  )
}
