import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getDeadlineInfo, formatDeadlineDate, getRelativeIsoDate } from './src/utils/deadlineUtils.js'
import { DEMO_OPPORTUNITIES } from './src/data/opportunitiesData.js'
import { INTEREST_CATEGORIES } from './src/data/interestsData.js'
import { CONCEPTUAL_CAMPUS_METRICS } from './src/data/adminMetricsData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('\n--- 1. VERIFYING COMPONENTS EXISTENCE ---')
const components = [
  'Navbar.jsx',
  'Hero.jsx',
  'InteractivePreview.jsx',
  'DiscoveryStory.jsx',
  'ProductExperience.jsx',
  'OpportunityCard.jsx',
  'OpportunityModal.jsx',
  'Personalization.jsx',
  'DeadlineUrgency.jsx',
  'StudentJourney.jsx',
  'CollegeValue.jsx',
  'WhyNowSection.jsx',
  'FinalCTA.jsx',
  'Footer.jsx',
  'Toast.jsx',
]

components.forEach((comp) => {
  const compPath = path.join(__dirname, 'src', 'components', comp)
  if (!fs.existsSync(compPath)) {
    throw new Error(`Missing component: ${comp}`)
  }
  console.log(`  ✓ ${comp} verified`)
})

console.log('\n--- 2. VERIFYING STRICT HEADING CONSTRAINTS (NO FORBIDDEN HEADINGS) ---')
const forbiddenHeadingRegexes = [
  /<h[1-6][^>]*>\s*Problem\s*<\/h[1-6]>/i,
  /<h[1-6][^>]*>\s*Solution\s*<\/h[1-6]>/i,
  /<h[1-6][^>]*>\s*How It Works\s*<\/h[1-6]>/i,
  /<h[1-6][^>]*>\s*Why Now\s*<\/h[1-6]>/i,
  /<h[1-6][^>]*>\s*Impact\s*<\/h[1-6]>/i,
]

const componentDir = path.join(__dirname, 'src', 'components')
fs.readdirSync(componentDir).forEach((file) => {
  const content = fs.readFileSync(path.join(componentDir, file), 'utf8')
  forbiddenHeadingRegexes.forEach((regex) => {
    if (regex.test(content)) {
      throw new Error(`Found forbidden heading matching ${regex} in ${file}`)
    }
  })
})
console.log('  ✓ Zero forbidden headings found in any component!')

console.log('\n--- 3. TESTING DYNAMIC DEADLINE ENGINE ---')
// Test today
const todayIso = getRelativeIsoDate(0)
const todayInfo = getDeadlineInfo(todayIso)
console.log(`  Today (${todayIso}): "${todayInfo.label}", urgency: ${todayInfo.urgency}`)
if (todayInfo.label !== 'Deadline today' || todayInfo.urgency !== 'critical') {
  throw new Error('Deadline today test failed')
}

// Test 1 day left
const tomorrowIso = getRelativeIsoDate(1)
const tomorrowInfo = getDeadlineInfo(tomorrowIso)
console.log(`  1 Day ahead (${tomorrowIso}): "${tomorrowInfo.label}", urgency: ${tomorrowInfo.urgency}`)
if (tomorrowInfo.label !== '1 day left' || tomorrowInfo.urgency !== 'critical') {
  throw new Error('1 day left test failed')
}

// Test 5 days left
const fiveDaysIso = getRelativeIsoDate(5)
const fiveDaysInfo = getDeadlineInfo(fiveDaysIso)
console.log(`  5 Days ahead (${fiveDaysIso}): "${fiveDaysInfo.label}", urgency: ${fiveDaysInfo.urgency}`)
if (fiveDaysInfo.label !== '5 days left') {
  throw new Error('5 days left test failed')
}

// Test expired
const pastIso = getRelativeIsoDate(-2)
const pastInfo = getDeadlineInfo(pastIso)
console.log(`  Past date (${pastIso}): "${pastInfo.label}", isExpired: ${pastInfo.isExpired}`)
if (pastInfo.label !== 'Expired' || !pastInfo.isExpired) {
  throw new Error('Expired test failed')
}
console.log('  ✓ All deadline calculation tiers operating accurately!')

console.log('\n--- 4. TESTING DEMO OPPORTUNITIES DATASET ---')
console.log(`  Total demo opportunities: ${DEMO_OPPORTUNITIES.length}`)
if (DEMO_OPPORTUNITIES.length < 10) {
  throw new Error('Must have at least 10 demo opportunities')
}

const requiredCategories = ['Internships', 'Hackathons', 'Scholarships', 'Research', 'Competitions', 'Workshops']
requiredCategories.forEach((cat) => {
  const count = DEMO_OPPORTUNITIES.filter((o) => o.category === cat).length
  console.log(`  Category [${cat}]: ${count} opportunities`)
  if (count === 0) {
    throw new Error(`Category ${cat} has zero opportunities`)
  }
})

console.log('\n--- 5. TESTING PERSONALIZATION MATCHING ---')
INTEREST_CATEGORIES.forEach((interest) => {
  const matched = DEMO_OPPORTUNITIES.filter((o) => o.matchInterests.includes(interest.tag))
  console.log(`  Interest "${interest.label}": ${matched.length} recommendations matched`)
  if (matched.length === 0) {
    throw new Error(`No opportunities matched for interest: ${interest.label}`)
  }
})
console.log('  ✓ All user interests map to rich recommendation cards!')

console.log('\n--- 6. VERIFYING CONCEPTUAL ADMIN METRICS ---')
if (!CONCEPTUAL_CAMPUS_METRICS.isConceptualDemo) {
  throw new Error('Conceptual flag must be present')
}
console.log(`  Summary KPI Cards: ${CONCEPTUAL_CAMPUS_METRICS.summaryCards.length}`)
console.log(`  Category breakdown items: ${CONCEPTUAL_CAMPUS_METRICS.popularCategories.length}`)
console.log('  ✓ Conceptual admin structure intact!')

console.log('\n✨ ALL SUITE TESTS PASSED WITH 100% SUCCESS!\n')
