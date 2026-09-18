import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DiscoveryStory from './components/DiscoveryStory'
import ProductExperience from './components/ProductExperience'
import Personalization from './components/Personalization'
import DeadlineUrgency from './components/DeadlineUrgency'
import StudentJourney from './components/StudentJourney'
import CollegeValue from './components/CollegeValue'
import WhyNowSection from './components/WhyNowSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import OpportunityModal from './components/OpportunityModal'
import Toast from './components/Toast'
import { DEMO_OPPORTUNITIES } from './data/opportunitiesData'

export default function App() {
  const [opportunities] = useState(DEMO_OPPORTUNITIES)
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('opportunityhub_saved_ids')
      return stored ? new Set(JSON.parse(stored)) : new Set(['opp-1'])
    } catch {
      return new Set(['opp-1'])
    }
  })
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [toasts, setToasts] = useState([])

  // Toast dispatcher
  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, title, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Toggle bookmark with localStorage persistence
  const handleToggleBookmark = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      const targetOpp = opportunities.find((o) => o.id === id)
      const title = targetOpp ? targetOpp.title : 'Opportunity'

      if (next.has(id)) {
        next.delete(id)
        addToast('Removed', `Removed "${title}" from saved list`, 'info')
      } else {
        next.add(id)
        addToast('Saved', `Saved "${title}" to your tracker`, 'bookmark')
      }

      try {
        localStorage.setItem('opportunityhub_saved_ids', JSON.stringify([...next]))
      } catch {
        // LocalStorage fallback
      }
      return next
    })
  }

  const handleExploreClick = () => {
    setShowSavedOnly(false)
    const element = document.getElementById('catalog')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleHowItWorksClick = () => {
    const element = document.getElementById('journey')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleOpenSaved = () => {
    setShowSavedOnly(true)
    const element = document.getElementById('catalog')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    addToast('Filter Applied', 'Showing saved opportunities', 'bookmark')
  }

  const handleApplySuccess = (opportunityTitle) => {
    addToast('Application Recorded', `Simulated application submitted for "${opportunityTitle}"!`, 'success')
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sticky Top Navigation */}
      <Navbar
        savedCount={savedIds.size}
        onOpenSaved={handleOpenSaved}
        onExploreClick={handleExploreClick}
      />

      <main className="flex-grow">
        {/* 1. Hero + Product Preview */}
        <Hero
          opportunities={opportunities}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectOpportunity={setSelectedOpportunity}
          onExploreClick={handleExploreClick}
          onHowItWorksClick={handleHowItWorksClick}
        />

        {/* 2. Discovery / Pain Point Story (Scattered -> Organized) */}
        <DiscoveryStory />

        {/* 3. Product Experience (Interactive Search, Filters & Catalog) */}
        <ProductExperience
          opportunities={opportunities}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectOpportunity={setSelectedOpportunity}
          showSavedOnly={showSavedOnly}
          setShowSavedOnly={setShowSavedOnly}
        />

        {/* 4. Personalization (Interest Selector & Dynamic Recommendations) */}
        <Personalization
          opportunities={opportunities}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectOpportunity={setSelectedOpportunity}
        />

        {/* 5. Deadline / Urgency (Dynamic Deadlines & Radar) */}
        <DeadlineUrgency
          opportunities={opportunities}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectOpportunity={setSelectedOpportunity}
        />

        {/* 6. Student Journey (Discover -> Match -> Save -> Apply) */}
        <StudentJourney />

        {/* 7. College / Management Value (Conceptual Institutional Demo) */}
        <CollegeValue />

        {/* 8. Modern Career Reality ("There are more ways to build a career than ever") */}
        <WhyNowSection />

        {/* 9. Final CTA */}
        <FinalCTA
          onExploreClick={handleExploreClick}
          onSubscribeSuccess={(msg) => addToast('Subscribed', msg, 'success')}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Detail Modal */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        isOpen={Boolean(selectedOpportunity)}
        onClose={() => setSelectedOpportunity(null)}
        isBookmarked={selectedOpportunity ? savedIds.has(selectedOpportunity.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onApplySuccess={handleApplySuccess}
      />

      {/* Floating Animated Toasts */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
