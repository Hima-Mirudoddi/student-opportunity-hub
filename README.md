# Student Opportunity Hub

A centralized discovery platform built for college students to track internships, hackathons, research fellowships, and scholarships in one place.

## Problem Context

Opportunities for college students are currently fragmented across college noticeboards, forwarded WhatsApp messages, Discord servers, and scattered job portals. Many high-value applications open and close quickly, leaving students to discover programs only after deadlines have passed.

Student Opportunity Hub consolidates these sources into a single stream with dynamic deadline tracking, multi-facet filtering, and role personalization.

## Key Features

- **Dynamic Deadlines:** Calculates real-time time-to-close against the current clock, highlighting roles that are closing today, within 24–48 hours, or later in the week.
- **Unified Catalog & Filters:** Live search across titles, skills, and companies with dropdown filters for opportunity categories and work arrangements (remote, hybrid, on-site).
- **Personalized Recommendations:** Focus area selector that tailors opportunity feeds based on technical interests (Web Development, AI/ML, UI/UX, Cybersecurity, etc.).
- **Local Bookmarking:** Save opportunities to an application tracker stored in browser `localStorage`.
- **Application Flow:** Role detail modal with full requirements, shareable links, and application status tracking.
- **Institutional View:** Dashboard layout showing how universities and department placement cells can observe student interest trends and aggregate campus opportunities.

## Where AI Output Was Weak or Incorrect (and How It Was Fixed)

During development, relying purely on default AI generation produced several technical and design failures that had to be identified, caught, and re-engineered manually:

1. **The Hardcoded Deadline Trap**
   - **Weak/Incorrect Output:** When asked to generate mock opportunity listings, AI models routinely hardcoded static strings (e.g., `"3 days left"`) or fixed calendar dates (e.g., `"2024-05-15"`).
   - **The Problem:** A static string cannot be sorted or filtered by urgency. Fixed past dates immediately render as "Expired" when evaluated on subsequent days.
   - **How It Was Fixed:** Built a custom date utility in `src/utils/deadlineUtils.js` that computes remaining time dynamically from `new Date()` at runtime. This ensures that urgency tiers ("Deadline today", "1 day left", etc.), progress percentages, and sorting remain accurate whenever an evaluator tests the project.

2. **Defaulting to Academic Slide Presentation Headings**
   - **Weak/Incorrect Output:** Left unconstrained, AI prompts reflexively generate generic landing page blocks explicitly titled `Problem`, `Solution`, `Why Us`, and `Impact`.
   - **The Problem:** This produces the visual texture of an uninspired classroom presentation rather than a modern, venture-scale product.
   - **How It Was Fixed:** Re-architected the entire page around product outcomes and user actions (e.g., *"You shouldn't have to look everywhere"*, *"Built around what you want to do next"*). In addition, wrote automated regex test assertions in `test-suite.mjs` to systematically verify that no generic heading titles exist anywhere in the component tree.

3. **Timezone Offset Bugs in Date Math**
   - **Weak/Incorrect Output:** The initial AI-generated date logic converted date strings into day offsets using naive day-of-month subtraction (`new Date(isoString).getDate() - new Date().getDate()`).
   - **The Problem:** This broke at month boundaries and produced off-by-one day calculation errors around midnight depending on local system timezones.
   - **How It Was Fixed:** Refactored the calculation to explicitly parse year, month, and day components, normalizing them to local start-of-day midnights before computing integer day deltas.

## Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites

Node.js (v18 or newer) and npm.

### Installation

```bash
git clone https://github.com/Hima-Mirudoddi/student-opportunity-hub.git
cd student-opportunity-hub
npm install
```

### Development

Run the development server locally:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

To test the production build:

```bash
npm run build
npm run preview
```

### Automated Tests

Run the test suite to verify data schemas, deadline calculations, and component structure:

```bash
node test-suite.mjs
```

## Project Structure

```
├── src/
│   ├── components/       # UI sections, cards, modals, and navigation
│   ├── data/             # Opportunity catalog and category datasets
│   ├── utils/            # Deadline math and date formatting utilities
│   ├── App.jsx           # Main page layout and global state
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── test-suite.mjs        # Automated verification script
└── TASK_WRITEUP.md       # Technical decisions and AI case study
```

## License

MIT
