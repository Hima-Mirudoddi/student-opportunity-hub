import React from 'react'
import { Bookmark, Clock, MapPin, ExternalLink, Sparkles, Building2 } from 'lucide-react'
import { getDeadlineInfo, formatDeadlineDate } from '../utils/deadlineUtils'

export default function OpportunityCard({
  opportunity,
  isBookmarked,
  onToggleBookmark,
  onSelect,
}) {
  const deadlineInfo = getDeadlineInfo(opportunity.deadline)

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Internships':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'Hackathons':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'Scholarships':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'Research':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'Competitions':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      case 'Workshops':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  return (
    <div
      data-cursor="inspect"
      className="group relative flex flex-col justify-between rounded-2xl bg-[#0F1523]/80 border border-slate-800/90 hover:border-indigo-500/40 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 backdrop-blur-sm hover:-translate-y-1"
    >
      {/* Top row: Organization + Category + Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-sm tracking-wider">
              {opportunity.organizationLogo || 'OH'}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-slate-500" />
                {opportunity.organization}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getCategoryBadgeClass(
                    opportunity.category
                  )}`}
                >
                  {opportunity.category}
                </span>
                {opportunity.trending && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                    <Sparkles className="w-2.5 h-2.5" />
                    Trending
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark(opportunity.id)
            }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark opportunity'}
            className={`p-2 rounded-xl transition-all duration-200 border ${
              isBookmarked
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 ring-2 ring-indigo-500/20'
                : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 transition-transform active:scale-90 ${
                isBookmarked ? 'fill-indigo-400 text-indigo-400' : ''
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(opportunity)}
          className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1 mb-2"
        >
          {opportunity.title}
        </h3>

        {/* Location & Perks */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            {opportunity.location}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-indigo-400/90 font-medium">{opportunity.perks}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {opportunity.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-300 text-[11px] font-mono border border-slate-700/50"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row: Dynamic Deadline + View Details CTA */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">
              {formatDeadlineDate(opportunity.deadline)}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${deadlineInfo.badgeColor}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                deadlineInfo.urgency === 'critical'
                  ? 'bg-rose-400 animate-pulse'
                  : deadlineInfo.urgency === 'urgent'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
            />
            {deadlineInfo.label}
          </span>
        </div>

        {/* Deadline urgency progress bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-1 mb-4 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${deadlineInfo.barColor}`}
            style={{ width: `${deadlineInfo.percentRemaining}%` }}
          />
        </div>

        <button
          type="button"
          data-cursor="cta"
          onClick={() => onSelect(opportunity)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800/70 hover:bg-indigo-600/90 text-slate-200 hover:text-white text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 border border-slate-700/70 hover:border-indigo-500/50 shadow-sm"
        >
          <span>View Opportunity</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
