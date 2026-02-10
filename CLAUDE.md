# CLAUDE.md

## Project Overview

Quiz Prep Bot — an AI-powered study companion for math course preparation. Organized by Course > Chapter, with MA Curriculum Framework standards alignment. Upload study materials, AI extracts content via Claude Vision, generates standards-aligned practice problems, augments content to fill curriculum gaps, and tracks study progress.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run db:push      # Sync Prisma schema to SQLite
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio GUI
```

No test suite yet. Verify changes with `npm run build`.

## Tech Stack

Next.js 16 (App Router) + TypeScript (strict) + React 19, Tailwind CSS v4, Prisma 5 with SQLite, Anthropic SDK (Claude), KaTeX for math rendering, Sonner for toasts, Lucide for icons.

## Project Structure

```
src/
  app/                    # Next.js App Router pages and API routes
    api/                  # REST API endpoints
      auth/               # login, logout
      courses/            # CRUD for courses and chapters
      materials/          # upload, process (AI extraction), augment (AI)
      problems/           # generate (AI), get/delete
      sessions/           # create, update, record responses
      dashboard/          # stats endpoint
    login/                # Login page (client component)
    courses/              # Course list, detail, create, edit pages
      [courseId]/          # Course detail, edit
        chapters/         # Chapter create, detail, edit pages
    materials/            # Material list, detail, upload pages
    study/                # Study launcher and active session pages
      [chapterId]/        # Study launcher, session
  components/
    layout/               # Header with nav
    dashboard/            # Dashboard widgets (upcoming-tests, progress, etc.)
    courses/              # Course form, card, delete button
    chapters/             # Chapter form, card, delete button, standards selector/badges
    materials/            # Upload form, card, extracted content, processing status, augmentation
    study/                # Problem display, solution reveal, self-report, progress, summary
    shared/               # Reusable: math-renderer, file-dropzone, confirm-dialog, etc.
  lib/
    ai/                   # Anthropic SDK client, prompts, extraction, problem generation, augmentation
    curriculum/           # MA standards data, standards matching
    auth.ts               # HMAC cookie auth helpers
    db.ts                 # Prisma client singleton
    upload.ts             # File save/validate/delete utilities
    utils.ts              # cn() helper (clsx + tailwind-merge)
    constants.ts          # Difficulty levels, course levels, material types, status colors
  types/index.ts          # Shared TypeScript types
  middleware.ts           # Auth gate (redirects unauthenticated to /login)
prisma/schema.prisma      # Data model (Course, Chapter, Material, Problem, StudySession, ProblemResponse)
```

Path alias: `@/*` maps to `src/*`.

## Key Conventions

**Server vs Client components**: Pages are server components by default (fetch data with Prisma directly). Interactive pieces (forms, study session, dropzone) are client components marked with `"use client"`.

**API routes**: Used only for client-side mutations and AI processing triggers. Server components read from Prisma directly without API round-trips.

**Auth**: HMAC-SHA256 cookie (`quiz-prep-auth`), format `timestamp:hmac`, 7-day expiry. Middleware uses Web Crypto API (Edge-compatible). Auth helpers in `lib/auth.ts` use Node crypto. Password set via `SITE_PASSWORD` env var.

**LaTeX math**: All AI prompts and rendering use `$...$` for inline math and `$$...$$` for display math. The `MathRenderer` component in `shared/math-renderer.tsx` parses these delimiters and renders via KaTeX.

**AI responses**: Claude sometimes wraps JSON in markdown code fences. `lib/ai/utils.ts` has `stripCodeFences()` — always use it when parsing AI JSON responses.

**Database**: SQLite via Prisma. All IDs are CUIDs. Cascading deletes: Course → Chapter → Problem/StudySession (Cascade), Chapter → Material (SetNull). Material status: `pending|processing|completed|failed`. Session status: `active|completed`. Difficulty: `easy|medium|hard`.

**File uploads**: Saved to `public/uploads/{materialId}/{filename}`, served statically. Max 10MB, images + PDF only.

**Standards**: MA Mathematics Curriculum Framework standards are stored in `lib/curriculum/ma-standards.ts`. Standards can be selected per chapter and are used for AI problem generation and content augmentation alignment.

## Environment Variables

Required in `.env.local` (never committed):
- `DATABASE_URL` — Prisma connection string (`file:./dev.db`)
- `SITE_PASSWORD` — Login password
- `AUTH_SECRET` — HMAC signing secret
- `ANTHROPIC_API_KEY` — Claude API key

Prisma CLI also needs `DATABASE_URL` in `.env` (committed without secrets).

## Data Model

```
Course (1) → (*) Chapter
Chapter (1) → (*) Material (SetNull on delete)
Chapter (1) → (*) Problem (Cascade on delete)
Chapter (1) → (*) StudySession (Cascade on delete)
StudySession (1) → (*) ProblemResponse
Problem (1) → (*) ProblemResponse
```

### Course
`{ id, grade (9-12), subject, level (regular|honors|AP), courseName, timestamps }`

### Chapter
`{ id, courseId, title, chapterNumber, description?, testDate?, standardIds? (JSON), timestamps }`

### Material
`{ id, chapterId?, filename, filepath, mimeType, fileSize, materialType (classNotes|quiz|homework|classwork|practiceTest|other), status, extractedText?, extractedTopics?, augmentedContent?, augmentationStatus?, timestamps }`

### Problem
`{ id, chapterId, questionText, solutionText, difficulty, topic, standardId?, createdAt }`

### StudySession
`{ id, chapterId, status, difficulty, totalProblems, correctCount, incorrectCount, startedAt, completedAt? }`

## URL Structure

```
/                                                    # Dashboard
/courses                                             # Course list
/courses/new                                         # Create course
/courses/[courseId]                                   # Course detail (chapters list)
/courses/[courseId]/edit                              # Edit course
/courses/[courseId]/chapters/new                      # Create chapter
/courses/[courseId]/chapters/[chapterId]              # Chapter detail (materials, problems, sessions)
/courses/[courseId]/chapters/[chapterId]/edit         # Edit chapter
/materials                                           # All materials list
/materials/upload                                    # Upload material
/materials/[materialId]                              # Material detail (extraction + augmentation)
/study/[chapterId]                                   # Study launcher
/study/[chapterId]/session                           # Active study session
/login                                               # Login page
```

## AI Integration

Four use cases in `src/lib/ai/`:
1. **extract-content.ts** — Claude Vision OCR on uploaded images → structured JSON (text, topics, problems, formulas)
2. **generate-problems.ts** — Topic + extracted material context → practice problems with step-by-step solutions. Accepts optional `courseContext` for grade/level/standards-aware generation.
3. **augment-content.ts** — Generates supplementary content, gap analysis, vocabulary, formulas based on curriculum standards alignment. Course level drives rigor (regular=scaffolded, honors=proofs, AP=exam-style).
4. **prompts.ts** — All prompt templates. Includes parameterized functions `generateProblemsPrompt()` and `augmentContentPrompt()`. Model: `claude-sonnet-4-5-20250929`

## Curriculum Integration

`src/lib/curriculum/ma-standards.ts` contains structured MA Mathematics Curriculum Framework (2017) standards for:
- Algebra I, Geometry, Algebra II, Precalculus

Each standard includes: id, domain, cluster, description, keyVocabulary, keyFormulas.

`src/lib/curriculum/match-standards.ts` uses AI to match extracted content to standards.

Standards can be selected per chapter via the `StandardsSelector` component and are stored as a JSON array in `chapter.standardIds`.
