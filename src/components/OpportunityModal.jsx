import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Clock,
  MapPin,
  Building2,
  Bookmark,
  Share2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Award,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { getDeadlineInfo, formatDeadlineDate } from '../utils/deadlineUtils'

export default function OpportunityModal({
  opportunity,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onApplySuccess,
}) {
  const [applied, setApplied] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  useEffect(() => {
    setApplied(false)
    setCopied(false)
  }, [opportunity])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !opportunity) return null

  const deadlineInfo = getDeadlineInfo(opportunity.deadline)

  const handleApply = () => {
    setApplied(true)
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      })
    } catch {
      // fallback
    }
    if (onApplySuccess) {
      onApplySuccess(opportunity.title)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0C111D] border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-slate-100 z-10"
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-300 text-base">
                {opportunity.organizationLogo || 'OH'}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {opportunity.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    {opportunity.organization}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {opportunity.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Deadline Notice Banner */}
          <div className="my-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Application Deadline</p>
                <p className="text-sm font-semibold text-white">
                  {formatDeadlineDate(opportunity.deadline)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${deadlineInfo.badgeColor}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    deadlineInfo.urgency === 'critical'
                      ? 'bg-rose-400 animate-ping'
                      : 'bg-emerald-400'
                  }`}
                />
                {deadlineInfo.label}
              </span>
            </div>
          </div>

          {/* Key Attributes Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/70">
              <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Location & Mode
              </span>
              <span className="text-sm font-semibold text-slate-200">
                {opportunity.location} ({opportunity.workType})
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/70">
              <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Compensation / Grants
              </span>
              <span className="text-sm font-semibold text-indigo-300">
                {opportunity.perks}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Opportunity Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {/* Eligibility */}
          <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Eligibility Criteria
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {opportunity.eligibility}
            </p>
          </div>

          {/* Target Skills */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Relevant Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {opportunity.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-200 text-xs font-mono border border-slate-700/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onToggleBookmark(opportunity.id)}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isBookmarked
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                    : 'bg-slate-800/50 text-slate-300 border-slate-700/80 hover:bg-slate-800'
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    isBookmarked ? 'fill-indigo-400 text-indigo-400' : ''
                  }`}
                />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              {applied ? (
                <div className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Application Submitted Successfully!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
