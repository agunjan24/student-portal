Plan: Augment Uploaded Materials with MA High School Curriculum
Current State
The portal currently supports uploading study materials (images/PDFs), extracting content via AI, and generating practice problems. However, it has no concept of grade level, course level, chapter tagging, or curriculum alignment. The Quiz model only has a freeform topic string and a hardcoded subject: "math".

What Needs to Change
1. Database Schema Updates (prisma/schema.prisma)
Add to Quiz model:

gradeLevel — 9 | 10 | 11 | 12
courseLevel — regular | honors | AP
courseName — e.g., "Algebra I", "Geometry", "AP Calculus AB"
Add to Material model:

chapter — the chapter tag from the uploaded content (e.g., "Chapter 5: Quadratic Functions")
curriculumStandards — JSON string of matched MA framework standard IDs
augmentedContent — AI-generated supplementary content aligned to MA standards
augmentationStatus — pending | completed | failed
2. MA Curriculum Data Structure (new file: src/lib/curriculum/ma-standards.ts)
A structured reference of the Massachusetts Curriculum Frameworks for Mathematics organized by:

Course (Algebra I, Geometry, Algebra II, Precalculus, AP Calculus AB/BC, AP Statistics)
Course level (regular/honors/AP) — honors and AP include additional depth/standards
Grade level mapping (which grades typically take which courses)
Domains (Number & Quantity, Algebra, Functions, Geometry, Statistics & Probability)
Standards within each domain, each with:
Standard ID (e.g., A-SSE.1, F-IF.7)
Description
Chapter/unit mapping (typical textbook alignment)
Key vocabulary and formulas
This gives the AI extraction and augmentation a structured target to align against.

3. Enhanced AI Extraction (src/lib/ai/prompts.ts)
Update EXTRACT_CONTENT_PROMPT to also identify:

Likely grade level and course level from the content
Chapter/unit the material belongs to
MA framework standard IDs the content covers
The extraction result would return these alongside the existing fields.

4. Curriculum Matching Service (new file: src/lib/curriculum/match-standards.ts)
A service that takes extracted topics/text and matches them against the MA standards data:

Input: extracted topics, grade level, course level
Output: list of matched MA standard IDs with confidence scores
Also identifies gaps — standards in that chapter/unit NOT covered by the uploaded material
5. AI Augmentation Service (new file: src/lib/ai/augment-content.ts)
The core feature — takes the uploaded material + curriculum alignment and generates:

Supplementary explanations for concepts the material covers (aligned to MA depth expectations for the course level)
Gap-fill content — if the material is tagged to Chapter 5 but misses standard F-IF.4, generate explanatory content for that standard
Course-level differentiation:
Regular: foundational explanations, worked examples, scaffolded practice
Honors: deeper conceptual questions, proofs, extensions
AP: exam-style questions, free-response practice, connections to AP exam topics
Key vocabulary and formulas required by MA frameworks for that unit
Cross-references to prerequisite and follow-on standards
6. New API Routes
Route	Method	Purpose
/api/curriculum/courses	GET	List available MA courses by grade level
/api/curriculum/standards	GET	Get standards for a course/chapter
/api/materials/[id]/augment	POST	Trigger AI augmentation for a material
/api/materials/[id]/augmentation	GET	Retrieve augmentation results
7. UI Updates
Quiz Form (quiz-form.tsx): Add dropdowns for grade level (9-12), course level (regular/honors/AP), and course name (auto-filtered based on grade)
Upload Form (upload-form.tsx): Add chapter/unit tag input (freeform or dropdown populated from curriculum data for the selected course)
Extracted Content (extracted-content.tsx): Show matched MA standards as badges, display augmented content in a new section, highlight curriculum gaps
Study Launcher (study-launcher.tsx): Problem generation prompt gets curriculum context so generated problems match MA expectations for that course level
8. Problem Generation Enhancement
Update GENERATE_PROBLEMS_PROMPT to incorporate:

The specific MA standards being tested
Course level expectations (regular problems vs honors rigor vs AP format)
Replace hardcoded "10th grader" with actual grade/course metadata
Augmentation Flow (End-to-End)
User creates quiz → selects Grade 10, Honors, Geometry
    ↓
User uploads material → tags it "Chapter 7: Right Triangles"
    ↓
AI extracts content → identifies topics, matches to MA standards
    (e.g., G-SRT.6, G-SRT.7, G-SRT.8)
    ↓
Curriculum matcher → finds gap: G-SRT.8 (apply trig to solve problems) 
    is underrepresented in the uploaded material
    ↓
AI augmentation generates:
  - Supplementary explanation of G-SRT.8 at honors depth
  - Additional worked examples with proofs
  - Vocabulary: "trigonometric ratios", "angle of elevation"
  - Key formulas for the unit
    ↓
Problem generation uses MA standards + course level:
  - Honors-level problems testing G-SRT.6–8
  - Includes proof-based questions (honors expectation)

Key Design Decisions
Curriculum data lives in code (not DB) — MA frameworks change infrequently, and having it in a typed TS file makes it easy to reference at build time and in AI prompts
Chapter tagging is user-specified — the user tags uploads to a chapter; AI confirms/suggests corrections
Augmentation is a separate step from extraction — keeps the extraction fast and lets augmentation be triggered on demand
Course level drives rigor — same topic at regular vs honors vs AP gets different depth, vocabulary, and problem styles