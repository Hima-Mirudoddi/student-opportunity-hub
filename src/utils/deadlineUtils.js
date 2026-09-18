/**
 * Dynamic Deadline Utility
 * Computes live remaining days and urgency status from ISO deadline strings.
 */

// Generates an ISO date string offset from today's date in local time
export function getRelativeIsoDate(daysOffset = 0) {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDeadlineInfo(deadlineString) {
  if (!deadlineString) {
    return {
      daysRemaining: 0,
      label: 'No deadline',
      urgency: 'normal',
      isExpired: false,
      isToday: false,
      badgeColor: 'bg-slate-800 text-slate-400 border-slate-700',
      barColor: 'bg-slate-500',
      percentRemaining: 100,
    }
  }

  const now = new Date()
  // Reset time to start of day for clean day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  const [year, month, day] = deadlineString.split('-').map(Number)
  const targetDate = new Date(year, month - 1, day)
  
  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return {
      daysRemaining: diffDays,
      label: 'Expired',
      urgency: 'expired',
      isExpired: true,
      isToday: false,
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      barColor: 'bg-rose-500',
      percentRemaining: 0,
    }
  }

  if (diffDays === 0) {
    return {
      daysRemaining: 0,
      label: 'Deadline today',
      urgency: 'critical',
      isExpired: false,
      isToday: true,
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/40 ring-1 ring-rose-500/30',
      barColor: 'bg-rose-500',
      percentRemaining: 8,
    }
  }

  if (diffDays === 1) {
    return {
      daysRemaining: 1,
      label: '1 day left',
      urgency: 'critical',
      isExpired: false,
      isToday: false,
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/40 ring-1 ring-amber-500/20',
      barColor: 'bg-amber-500',
      percentRemaining: 18,
    }
  }

  if (diffDays <= 3) {
    return {
      daysRemaining: diffDays,
      label: `${diffDays} days left`,
      urgency: 'urgent',
      isExpired: false,
      isToday: false,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      barColor: 'bg-amber-400',
      percentRemaining: 35,
    }
  }

  if (diffDays <= 7) {
    return {
      daysRemaining: diffDays,
      label: `${diffDays} days left`,
      urgency: 'upcoming',
      isExpired: false,
      isToday: false,
      badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      barColor: 'bg-indigo-400',
      percentRemaining: 60,
    }
  }

  return {
    daysRemaining: diffDays,
    label: `${diffDays} days left`,
    urgency: 'normal',
    isExpired: false,
    isToday: false,
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    barColor: 'bg-emerald-400',
    percentRemaining: Math.min(100, Math.max(20, Math.round((diffDays / 30) * 100))),
  }
}

export function formatDeadlineDate(deadlineString) {
  if (!deadlineString) return ''
  const [year, month, day] = deadlineString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
