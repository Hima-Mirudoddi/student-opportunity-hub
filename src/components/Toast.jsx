import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Bookmark, Info, X } from 'lucide-react'

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md text-sm text-slate-200"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'bookmark' ? (
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Bookmark className="w-4 h-4 fill-indigo-400" />
                </div>
              ) : toast.type === 'success' ? (
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <Info className="w-4 h-4" />
                </div>
              )}
              <div>
                <p className="font-semibold text-white text-xs tracking-wide uppercase">
                  {toast.title}
                </p>
                <p className="text-slate-300 text-xs mt-0.5">{toast.message}</p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
