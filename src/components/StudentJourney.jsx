import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Sliders,
  Bookmark,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

export default function StudentJourney() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 'discover',
      stepNumber: '01',
      title: 'Discover',
      tagline: 'Search the unified student stream',
      description:
        'Instead of hopping between WhatsApp groups, Telegram chats, and obscure college portals, browse one verified stream of collegiate internships, hackathons, and scholarships.',
      icon: Search,
      preview: {
        title: 'Unified Search Engine',
        metric: '12 Verified Active Roles',
        highlight: 'Instant keyword and skill indexing across all categories',
        chips: ['React', 'Remote', 'LLMs', 'Hackathons'],
      },
    },
    {
      id: 'match',
      stepNumber: '02',
      title: 'Match',
      tagline: 'Filter by stack and aspirations',
      description:
        'Set your technical domain or field of study. The catalog filters instantly by exact tech stack, work type (Remote/Hybrid/On-site), and program format.',
      icon: Sliders,
      preview: {
        title: 'Targeted Relevance Filter',
        metric: '7 Career Focus Areas',
        highlight: 'Filters out noise and senior roles irrelevant to undergrads',
        chips: ['Undergrad Eligible', 'Stipend Included', 'Mentorship'],
      },
    },
    {
      id: 'track',
      stepNumber: '03',
      title: 'Track',
      tagline: 'Dynamic deadline radar',
      description:
        'Bookmark interesting programs with one click. OpportunityHub continuously tracks time-to-close so you never miss an application deadline.',
      icon: Bookmark,
      preview: {
        title: 'Deadline Intelligence',
        metric: 'Dynamic Countdown',
        highlight: 'Color-coded urgency tiers (Critical, Urgent, Active)',
        chips: ['Deadline Today', '2 Days Left', '5 Days Left'],
      },
    },
    {
      id: 'apply',
      stepNumber: '04',
      title: 'Apply',
      tagline: 'Act with verified confidence',
      description:
        'Inspect full role requirements, stipend terms, and team criteria without third-party paywalls. Apply directly through the verified submission channel.',
      icon: Send,
      preview: {
        title: 'Direct Application Action',
        metric: 'Zero Clutter Submission',
        highlight: 'Direct checklist verification and application tracking',
        chips: ['Direct Link', 'Verified Partner', 'Free Forever'],
      },
    },
  ]

  const currentStep = steps[activeStep]
  const CurrentIcon = currentStep.icon

  return (
    <section id="journey" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-indigo-400 text-sm sm:text-base font-bold tracking-wider uppercase mb-3">
            <span className="w-2.5 h-0.5 bg-indigo-500 rounded-full inline-block" />
            <span>The Student Experience</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            From discovering to applying in four seamless steps.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            A friction-free loop designed specifically around student schedules, technical ambitions, and urgent timelines.
          </p>
        </div>

        {/* Step Navigation Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10 max-w-3xl">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx
            return (
              <button
                key={step.id}
                type="button"
                data-cursor="scrub"
                onClick={() => setActiveStep(idx)}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div>
                  <span className={`text-[10px] block ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                    STEP {step.stepNumber}
                  </span>
                  <span>{step.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600'}`} />
              </button>
            )
          })}
        </div>

        {/* Interactive Step Content Box */}
        <div className="rounded-3xl bg-[#0F1424] border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Narrative description */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold">
                  <span>STEP {currentStep.stepNumber} OF 04</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentStep.tagline}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {currentStep.description}
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Next step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="#catalog"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline px-2"
                  >
                    Try it live in the catalog →
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Component Sandbox preview */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <CurrentIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        {currentStep.preview.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {currentStep.preview.metric}
                      </p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <p className="text-xs text-slate-300 mb-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  {currentStep.preview.highlight}
                </p>

                <div className="space-y-2">
                  <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block">
                    Product Capabilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.preview.chips.map((chip) => (
                      <span
                        key={chip}
                        className="px-2.5 py-1 rounded-lg bg-indigo-950/30 text-indigo-300 text-xs font-medium border border-indigo-500/20 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
