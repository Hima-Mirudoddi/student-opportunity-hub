/**
 * Conceptual College Ecosystem Demo Data
 * Clearly labeled as conceptual demo metrics to illustrate platform capabilities.
 */

export const CONCEPTUAL_CAMPUS_METRICS = {
  isConceptualDemo: true,
  summaryCards: [
    {
      title: 'Active Opportunities Distributed',
      value: '148',
      change: '+24 this month',
      trend: 'up',
      subtitle: 'Across engineering, science & design',
    },
    {
      title: 'Student Discovery Sessions',
      value: '3,420',
      change: '88% monthly active',
      trend: 'up',
      subtitle: 'Students tracking upcoming deadlines',
    },
    {
      title: 'Upcoming Department Deadlines',
      value: '19',
      change: 'In the next 7 days',
      trend: 'neutral',
      subtitle: 'Automated campus alerts scheduled',
    },
    {
      title: 'Direct Verified Inquiries',
      value: '840',
      change: '+18% vs last semester',
      trend: 'up',
      subtitle: 'Applications logged into college portal',
    },
  ],
  popularCategories: [
    { name: 'Internships', percent: 42, count: 62 },
    { name: 'Hackathons', percent: 24, count: 35 },
    { name: 'Research Fellowships', percent: 16, count: 24 },
    { name: 'Scholarships & Grants', percent: 12, count: 18 },
    { name: 'Workshops', percent: 6, count: 9 },
  ],
  topStudentInterests: [
    { field: 'AI / Machine Learning', engagement: 'High (38%)' },
    { field: 'Web Development', engagement: 'High (32%)' },
    { field: 'Data Science', engagement: 'Medium (18%)' },
    { field: 'UI/UX & Product Design', engagement: 'Growing (12%)' },
  ],
  recentCampusDistributions: [
    { title: 'Summer Research Fellowship 2026', department: 'Computer Science & AI', status: 'Active', daysLeft: 2 },
    { title: 'National Student Hackathon', department: 'Student Technical Council', status: 'Broadcasting', daysLeft: 5 },
    { title: 'Women in Tech Merit Grant', department: 'Diversity in STEM Cell', status: 'Active', daysLeft: 12 },
  ]
}
