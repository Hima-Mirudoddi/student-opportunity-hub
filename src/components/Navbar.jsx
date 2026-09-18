import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  Bookmark,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

export default function Navbar({
  savedCount = 0,
  onOpenSaved,
  onExploreClick,
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Discover', href: '#discovery' },
    { label: 'Opportunities', href: '#catalog' },
    { label: 'Personalize', href: '#personalization' },
    { label: 'Journey', href: '#journey' },
    { label: 'For Colleges', href: '#colleges' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                  Opportunity<span className="text-indigo-400">Hub</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Student Edition
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/60 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Bookmarks Counter Button */}
            <button
              type="button"
              onClick={onOpenSaved}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                savedCount > 0
                  ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/25'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="View Bookmarked Opportunities"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  savedCount > 0 ? 'fill-indigo-400 text-indigo-400' : ''
                }`}
              />
              <span>Saved</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  savedCount > 0
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {savedCount}
              </span>
            </button>

            {/* Primary CTA */}
            <button
              type="button"
              onClick={onExploreClick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenSaved}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 relative"
              aria-label="View saved"
            >
              <Bookmark className={`w-4 h-4 ${savedCount > 0 ? 'fill-indigo-400 text-indigo-400' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-[#0C111D] border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                onExploreClick()
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
