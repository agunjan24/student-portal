# Quiz Prep Bot

An AI-powered study companion for math course preparation, aligned with the Massachusetts Mathematics Curriculum Framework (2017).

Upload study materials (class notes, homework, quizzes, practice tests), and AI extracts content, identifies curriculum gaps, generates practice problems, and tracks your study progress — all organized by Course and Chapter.

## Features

- **Course & Chapter Organization** — Set up courses by grade (9-12), level (Regular/Honors/AP), and name. Add chapters with test dates and curriculum standards.
- **Material Upload & AI Extraction** — Upload images or PDFs. Claude Vision OCR extracts text, topics, problems, and formulas.
- **Curriculum Standards Alignment** — Select MA Curriculum Framework standards per chapter. AI matches extracted content to standards and identifies gaps.
- **AI Content Augmentation** — Generates supplementary content, gap analysis, vocabulary, and key formulas based on curriculum standards. Adapts rigor to course level.
- **Practice Problem Generation** — AI creates practice problems tailored to your grade, course level, chapter topics, and selected standards. Includes step-by-step solutions with LaTeX math.
- **Study Sessions** — Choose a difficulty (Easy/Medium/Hard), answer problems, reveal solutions, self-report accuracy. Progress tracked on the dashboard.
- **Dashboard** — Upcoming tests, recent study sessions, overall accuracy, material/problem/course counts.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Database | SQLite via Prisma 5 |
| AI | Anthropic SDK (Claude Sonnet) |
| Math | KaTeX for LaTeX rendering |
| UI | Lucide icons, Sonner toasts |

## Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

## Setup

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd student-portal
   npm install
   ```

2. **Environment variables** — Create `.env.local`:
   ```
   DATABASE_URL="file:./dev.db"
   SITE_PASSWORD="your-login-password"
   AUTH_SECRET="your-secret-key"
   ANTHROPIC_API_KEY="sk-ant-..."
   ```

3. **Initialize database**
   ```bash
   npm run db:push
   ```

4. **Start dev server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) and log in with your `SITE_PASSWORD`.

## Scripts

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run db:push      # Sync Prisma schema to SQLite
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio GUI
```

## Workflow

```
1. Create a Course → 2. Add Chapters (with standards & test dates)
       ↓
3. Upload Materials → 4. Extract Content (AI OCR)
       ↓
5. Augment Content (AI fills curriculum gaps)
       ↓
6. Generate Problems → 7. Study Sessions → Dashboard tracks progress
```

## Data Model

```
Course (Grade, Level, Name)
  └── Chapter (Title, Test Date, Standards)
       ├── Material    (uploaded files, extracted text, augmented content)
       ├── Problem     (AI-generated questions with solutions)
       └── StudySession (practice runs with self-reported scores)
            └── ProblemResponse (per-question results)
```

## Curriculum Standards

Includes structured data from the MA Mathematics Curriculum Framework (2017) for:

- **Algebra I** — Number & Quantity, Algebra, Functions, Statistics & Probability
- **Geometry** — Congruence, Similarity & Trigonometry, Circles, Coordinate Geometry, Measurement
- **Algebra II** — Complex Numbers, Polynomials, Rational/Radical Equations, Exponential & Log Functions
- **Precalculus** — Vectors, Trigonometric Functions, Rational Expressions

Standards are stored in `src/lib/curriculum/ma-standards.ts` with IDs, descriptions, key vocabulary, and key formulas for each standard.

## Project Structure

```
src/
  app/                    # Pages and API routes
    api/                  # REST endpoints (courses, materials, problems, sessions)
    courses/              # Course & chapter CRUD pages
    materials/            # Material list, detail, upload
    study/                # Study launcher & active session
    help/                 # Usage guide
  components/             # React components
    courses/              # Course form, card, delete
    chapters/             # Chapter form, card, standards selector/badges
    materials/            # Upload, extraction, augmentation UI
    study/                # Problem display, solutions, progress, summary
    shared/               # Math renderer, dropzone, confirm dialog
  lib/
    ai/                   # Claude SDK client, prompts, extraction, generation, augmentation
    curriculum/           # MA standards data & AI matching
  types/                  # TypeScript type definitions
prisma/schema.prisma      # Database schema
```

## License

Private project.
