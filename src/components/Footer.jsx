import React from 'react'
import { Compass } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 bg-[#060910] border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-white text-sm">
              Opportunity<span className="text-indigo-400">Hub</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="#discovery" className="hover:text-white transition-colors">
              Discover
            </a>
            <a href="#catalog" className="hover:text-white transition-colors">
              Opportunities
            </a>
            <a href="#personalization" className="hover:text-white transition-colors">
              Personalize
            </a>
            <a href="#urgency" className="hover:text-white transition-colors">
              Deadlines
            </a>
            <a href="#colleges" className="hover:text-white transition-colors">
              For Colleges
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} OpportunityHub. All rights reserved.</p>
          <p>The centralized discovery platform for student opportunities.</p>
        </div>
      </div>
    </footer>
  )
}
