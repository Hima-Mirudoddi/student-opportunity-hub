import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  Filter,
  Bookmark,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
  ArrowUpDown,
  Check,
  ChevronDown,
} from 'lucide-react'
import OpportunityCard from './OpportunityCard'
import { getDeadlineInfo } from '../utils/deadlineUtils.js'

export default function ProductExperience({
  opportunities = [],
  savedIds = new Set(),
  onToggleBookmark,
  onSelectOpportunity,
  showSavedOnly = false,
  setShowSavedOnly,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedWorkType, setSelectedWorkType] = useState('All')
  const [sortBy, setSortBy] = useState('deadline') // 'deadline' | 'alpha' | 'popular'
  const searchInputRef = useRef(null)

  const categories = [
    'All',
    'Internships',
    'Hackathons',
    'Scholarships',
    'Research',
    'Competitions',
    'Workshops',
  ]

  const workTypes = ['All', 'Remote', 'Hybrid', 'On-site']

  // Keyboard shortcut: Ctrl+K or / focuses search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
          e.preventDefault()
          searchInputRef.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Multi-facet filtering and sorting logic
  const filteredOpportunities = useMemo(() => {
    let result = opportunities.filter((opp) => {
      // 1. Saved-only filter
      if (showSavedOnly && !savedIds.has(opp.id)) {
        return false
      }

      // 2. Category filter
      if (selectedCategory !== 'All' && opp.category !== selectedCategory) {
        return false
      }

      // 3. Work type filter
      if (selectedWorkType !== 'All' && opp.workType !== selectedWorkType) {
        return false
      }

      // 4. Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim()
        const titleMatch = opp.title.toLowerCase().includes(query)
        const orgMatch = opp.organization.toLowerCase().includes(query)
        const skillMatch = opp.skills.some((s) => s.toLowerCase().includes(query))
        const categoryMatch = opp.category.toLowerCase().includes(query)
        const locationMatch = opp.location.toLowerCase().includes(query)

        if (!titleMatch && !orgMatch && !skillMatch && !categoryMatch && !locationMatch) {
          return false
        }
      }

      return true
    })

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'deadline') {
        const aDeadline = getDeadlineInfo(a.deadline).daysRemaining
        const bDeadline = getDeadlineInfo(b.deadline).daysRemaining
        return aDeadline - bDeadline
      }
      if (sortBy === 'alpha') {
        return a.title.localeCompare(b.title)
      }
      if (sortBy === 'popular') {
        return (b.applicantsCount || 0) - (a.applicantsCount || 0)
      }
      return 0
    })
  }, [
    opportunities,
    searchQuery,
    selectedCategory,
    selectedWorkType,
    showSavedOnly,
    savedIds,
    sortBy,
  ])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedWorkType('All')
    setSortBy('deadline')
    if (setShowSavedOnly) setShowSavedOnly(false)
  }

  // Count items per category for nice badge counts
  const categoryCounts = useMemo(() => {
    const counts = { All: opportunities.length }
    categories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = opportunities.filter((o) => o.category === cat).length
      }
    })
    return counts
  }, [opportunities])

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedWorkType !== 'All' ||
    showSavedOnly

  return (
    <section id="catalog" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-indigo-400 text-sm sm:text-base font-bold tracking-wider uppercase mb-3">
            <span className="w-2.5 h-0.5 bg-indigo-500 rounded-full inline-block" />
            <span>Explore Opportunities</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            Everything worth discovering, in one place.
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Search by skills or keywords, filter across six opportunity categories, and track dynamic deadlines in real time.
          </p>
        </div>

        {/* Dashboard Control Panel */}
        <div className="bg-[#0C111E]/90 border border-slate-800/90 rounded-2xl p-4 sm:p-6 mb-8 shadow-xl backdrop-blur-md">
          {/* Top row: Search input & quick toggles */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5">
            {/* Live Search Input with shortcut */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, keyword, or skill (e.g., 'Frontend', 'AI', 'React', 'Remote')..."
                className="w-full pl-10 pr-24 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-white rounded-md"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700/80 rounded-md">
                    Ctrl K
                  </kbd>
                )}
              </div>
            </div>

            {/* Controls: Category + Work Type + Saved + Sort */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`appearance-none bg-slate-900 border hover:border-slate-700 rounded-xl pl-3 pr-8 py-3 text-xs font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors ${
                    selectedCategory !== 'All'
                      ? 'border-indigo-500/60 text-indigo-300 bg-indigo-500/10'
                      : 'border-slate-800 text-slate-300'
                  }`}
                >
                  <option value="All" className="bg-slate-900 text-slate-200">
                    Category: All ({opportunities.length})
                  </option>
                  {categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                        {cat} ({categoryCounts[cat] || 0})
                      </option>
                    ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Work Type Dropdown */}
              <div className="relative">
                <select
                  value={selectedWorkType}
                  onChange={(e) => setSelectedWorkType(e.target.value)}
                  className={`appearance-none bg-slate-900 border hover:border-slate-700 rounded-xl pl-3 pr-8 py-3 text-xs font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors ${
                    selectedWorkType !== 'All'
                      ? 'border-indigo-500/60 text-indigo-300 bg-indigo-500/10'
                      : 'border-slate-800 text-slate-300'
                  }`}
                >
                  <option value="All" className="bg-slate-900 text-slate-200">
                    Work Type: All
                  </option>
                  <option value="Remote" className="bg-slate-900 text-slate-200">Remote</option>
                  <option value="Hybrid" className="bg-slate-900 text-slate-200">Hybrid</option>
                  <option value="On-site" className="bg-slate-900 text-slate-200">On-site</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Saved only toggle button */}
              <button
                type="button"
                onClick={() => setShowSavedOnly && setShowSavedOnly(!showSavedOnly)}
                className={`px-3.5 py-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  showSavedOnly
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
                <span>Saved Only</span>
                {savedIds.size > 0 && (
                  <span
                    className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                      showSavedOnly ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {savedIds.size}
                  </span>
                )}
              </button>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl pl-3 pr-8 py-3 text-xs font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors"
                >
                  <option value="deadline" className="bg-slate-900 text-slate-200">Closing Soonest</option>
                  <option value="popular" className="bg-slate-900 text-slate-200">Most Popular</option>
                  <option value="alpha" className="bg-slate-900 text-slate-200">Alphabetical</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Metadata & Active Filter Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 mb-6 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Showing <strong className="text-white font-semibold">{filteredOpportunities.length}</strong>{' '}
              {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
            </span>

            {/* Active filter badges */}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <span>Query: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <span>{selectedCategory}</span>
                <button onClick={() => setSelectedCategory('All')} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedWorkType !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <span>{selectedWorkType}</span>
                <button onClick={() => setSelectedWorkType('All')} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {showSavedOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <span>Bookmarked only</span>
                <button
                  onClick={() => setShowSavedOnly && setShowSavedOnly(false)}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline self-start sm:self-auto"
            >
              <RefreshCw className="w-3 h-3" />
              Reset all filters
            </button>
          )}
        </div>

        {/* Cards Grid with layout animations */}
        {filteredOpportunities.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                isBookmarked={savedIds.has(opportunity.id)}
                onToggleBookmark={onToggleBookmark}
                onSelect={onSelectOpportunity}
              />
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 p-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              No matching opportunities found
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-5">
              We couldn’t find anything matching your current search criteria. Try modifying your search query or clear filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
