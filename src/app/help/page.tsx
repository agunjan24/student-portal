import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  BookOpen,
  Upload,
  Brain,
  Sparkles,
  FileText,
  ClipboardList,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function HelpPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div>
          <h1 className="text-2xl font-bold mb-2">How to Use Quiz Prep Bot</h1>
          <p className="text-gray-600">
            A step-by-step guide to setting up your courses, uploading materials,
            and studying with AI-generated practice problems.
          </p>
        </div>

        {/* Workflow overview */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Workflow Overview</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: 1,
                icon: BookOpen,
                title: "Create a Course",
                desc: "Set up your course with subject, grade, level, and name.",
                color: "blue",
              },
              {
                step: 2,
                icon: ClipboardList,
                title: "Add Chapters",
                desc: "Add chapters with test dates and curriculum standards.",
                color: "indigo",
              },
              {
                step: 3,
                icon: Upload,
                title: "Upload Materials",
                desc: "Upload class notes, homework, quizzes, or practice tests.",
                color: "purple",
              },
              {
                step: 4,
                icon: FileText,
                title: "Extract Content",
                desc: "AI reads your materials and extracts text and topics.",
                color: "pink",
              },
              {
                step: 5,
                icon: Sparkles,
                title: "Augment Content",
                desc: "AI fills curriculum gaps with supplementary content.",
                color: "amber",
              },
              {
                step: 6,
                icon: Brain,
                title: "Study & Practice",
                desc: "Generate problems, take practice sessions, track progress.",
                color: "green",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-lg border border-gray-200 p-4"
              >
                <span className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                  {item.step}
                </span>
                <item.icon className="w-5 h-5 text-gray-400 mb-2" />
                <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed steps */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Step-by-Step Guide</h2>

          <Step
            number={1}
            title="Create a Course"
            description="Start by creating a course that matches your class. Choose your subject (Mathematics or Chemistry), grade (9-12), course level (Regular, Honors, or AP), and course name (e.g., Algebra I, Geometry, Chemistry I, AP Chemistry)."
            action={{ label: "Create a Course", href: "/courses/new" }}
          />

          <Step
            number={2}
            title="Add Chapters"
            description="Inside your course, add chapters for each unit or topic. You can set a test date so the dashboard tracks upcoming tests. Select MA Curriculum Framework standards for each chapter — these guide AI problem generation and content augmentation to align with what you need to know."
            tips={[
              "Standards are grouped by domain (e.g., Algebra, Functions, Chemical Reactions).",
              "You can select multiple standards per chapter.",
              "Test dates appear on the dashboard so you never miss a test.",
            ]}
          />

          <Step
            number={3}
            title="Upload Study Materials"
            description="Upload photos or PDFs of your class notes, homework, quizzes, classwork, or practice tests. Link each upload to the chapter it belongs to and tag its type."
            action={{ label: "Upload Material", href: "/materials/upload" }}
            tips={[
              "Supported formats: images (JPG, PNG, WEBP, GIF) and PDF.",
              "Maximum file size: 10 MB.",
              "Material types: Class Notes, Quiz, Homework, Classwork, Practice Test, Other.",
            ]}
          />

          <Step
            number={4}
            title="Extract Content"
            description={'After uploading, click "Extract Content" on the material detail page. AI uses Claude Vision to read your material and extract the text, topics, problems, and formulas it contains.'}
            tips={[
              "Extraction works best with clear, well-lit photos.",
              "You can retry extraction if it fails.",
              "Extracted topics are used for problem generation and standards matching.",
            ]}
          />

          <Step
            number={5}
            title="Augment Content (optional)"
            description={'Once content is extracted and the material is linked to a chapter, click "Augment Content" to have AI analyze your material against the curriculum standards. It produces supplementary explanations, identifies gaps in your materials, highlights key vocabulary and formulas, and shows which standards your material covers.'}
            tips={[
              "Augmentation adapts to your course level: Regular gets scaffolded explanations, Honors gets proofs and extensions, AP gets exam-style rigor.",
              "Gap analysis tells you what topics the standards expect but your material doesn't cover.",
              "The vocabulary and formulas sections are great for quick review.",
            ]}
          />

          <Step
            number={6}
            title="Generate Problems & Study"
            description={'Navigate to a chapter and click "Study" to open the study launcher. Choose a difficulty level (Easy, Medium, Hard) and number of problems, then click "Generate & Start" — AI generates practice questions and starts your session in one step. For each problem, reveal the solution, then self-report whether you got it right. If you already have generated problems, you can also click "Practice Existing" to study with those.'}
            tips={[
              "Problems are tailored to your grade level and course standards.",
              "Solutions include step-by-step explanations with LaTeX math rendering.",
              "Your accuracy and session history are tracked on the dashboard.",
            ]}
          />
        </section>

        {/* Data organization */}
        <section>
          <h2 className="text-lg font-semibold mb-3">How Data is Organized</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-5 text-sm">
            <pre className="text-gray-700 leading-relaxed">
{`Course (e.g., "Geometry", Grade 10, Honors  or  "Chemistry I", Grade 10, Regular)
  └── Chapter (e.g., "Right Triangles & Trigonometry"  or  "Chemical Reactions")
       ├── Materials  — uploaded class notes, quizzes, homework
       ├── Problems   — AI-generated practice questions
       └── Sessions   — study sessions with self-reported scores`}
            </pre>
          </div>
        </section>

        {/* MA Curriculum */}
        <section>
          <h2 className="text-lg font-semibold mb-3">MA Curriculum Standards</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-3 text-sm text-gray-600">
            <p>
              This app includes MA Curriculum Framework standards for Mathematics and Chemistry:
            </p>
            <p className="font-medium text-gray-700">Mathematics (2017 Framework)</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Algebra I — Number &amp; Quantity, Algebra, Functions, Statistics</li>
              <li>Geometry — Congruence, Similarity &amp; Trigonometry, Circles, Coordinate Geometry, Measurement</li>
              <li>Algebra II — Complex Numbers, Polynomials, Rational/Radical Equations, Exponential &amp; Log Functions</li>
              <li>Precalculus — Vectors, Trigonometric Functions, Rational Expressions</li>
            </ul>
            <p className="font-medium text-gray-700 mt-2">Chemistry (STE Framework, NGSS-aligned)</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Chemistry I — Structure of Matter, Chemical Reactions, Energy in Chemical Processes</li>
              <li>Honors Chemistry — Nuclear Chemistry, Thermodynamics, Kinetics &amp; Equilibrium</li>
              <li>Chemistry II — Kinetics, Equilibrium, Acid-Base, Electrochemistry, Thermodynamics</li>
              <li>AP Chemistry — Atomic Structure, Bonding, Intermolecular Forces, full AP curriculum</li>
            </ul>
            <p>
              When you select standards for a chapter, AI uses them to generate
              targeted practice problems and to identify what your uploaded
              materials are missing relative to the curriculum.
            </p>
          </div>
        </section>

        {/* Quick links */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <QuickLink href="/" label="Dashboard" desc="View progress and upcoming tests" />
            <QuickLink href="/courses" label="Courses" desc="Manage courses and chapters" />
            <QuickLink href="/courses/new" label="New Course" desc="Create a new course" />
            <QuickLink href="/materials" label="Materials" desc="View all uploaded materials" />
            <QuickLink href="/materials/upload" label="Upload Material" desc="Upload a new study material" />
          </div>
        </section>
      </main>
    </>
  );
}

function Step({
  number,
  title,
  description,
  tips,
  action,
}: {
  number: number;
  title: string;
  description: string;
  tips?: string[];
  action?: { label: string; href: string };
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
          {number}
        </span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3 ml-10">{description}</p>
      {tips && tips.length > 0 && (
        <ul className="ml-10 space-y-1 mb-3">
          {tips.map((tip, i) => (
            <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">-</span>
              {tip}
            </li>
          ))}
        </ul>
      )}
      {action && (
        <div className="ml-10">
          <Link
            href={action.href}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            {action.label}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

function QuickLink({
  href,
  label,
  desc,
}: {
  href: string;
  label: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400" />
    </Link>
  );
}
