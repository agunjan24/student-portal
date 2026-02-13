"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { ProblemDisplay } from "@/components/study/problem-display";
import { SolutionReveal } from "@/components/study/solution-reveal";
import { SelfReportButtons } from "@/components/study/self-report-buttons";
import { SessionProgress } from "@/components/study/session-progress";
import { SessionSummary } from "@/components/study/session-summary";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface Problem {
  id: string;
  questionText: string;
  solutionText: string;
  difficulty: string;
  topic: string;
}

export default function ActiveSessionPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const chapterId = params.chapterId as string;
  const sessionId = searchParams.get("sessionId")!;
  const problemIds = searchParams.get("problems")?.split(",") || [];

  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [answeredIndices, setAnsweredIndices] = useState<Set<number>>(new Set());
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    async function loadProblems() {
      try {
        const loaded: Problem[] = [];
        for (const id of problemIds) {
          const res = await fetch(`/api/problems/${id}`);
          if (res.ok) {
            loaded.push(await res.json());
          }
        }
        setProblems(loaded);

        // Get session info (includes chapter context)
        const sessionRes = await fetch(`/api/sessions/${sessionId}`);
        if (sessionRes.ok) {
          const session = await sessionRes.json();
          setDifficulty(session.difficulty);
          if (session.chapter) {
            setChapterTitle(session.chapter.title);
            setCourseId(session.chapter.courseId);
          }
        }
      } catch {
        // Problems will be empty
      } finally {
        setLoading(false);
        setStartTime(Date.now());
      }
    }

    loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReport = useCallback(
    async (isCorrect: boolean) => {
      if (submitting) return;
      setSubmitting(true);

      const timeSpentSecs = Math.round((Date.now() - startTime) / 1000);
      const currentProblem = problems[currentIndex];

      try {
        await fetch(`/api/sessions/${sessionId}/responses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            problemId: currentProblem.id,
            isCorrect,
            timeSpentSecs,
          }),
        });

        setAnsweredIndices((prev) => new Set(prev).add(currentIndex));

        if (isCorrect) {
          setCorrect((c) => c + 1);
        } else {
          setIncorrect((c) => c + 1);
        }

        // Move to next problem or complete
        const allAnswered = (() => {
          const updated = new Set(answeredIndices);
          updated.add(currentIndex);
          return updated.size >= problems.length;
        })();

        if (allAnswered) {
          await fetch(`/api/sessions/${sessionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "completed" }),
          });
          setCompleted(true);
        } else {
          const nextIndex = currentIndex + 1;
          if (nextIndex < problems.length) {
            setCurrentIndex(nextIndex);
            setFurthestIndex((prev) => Math.max(prev, nextIndex));
            setSolutionRevealed(answeredIndices.has(nextIndex));
            if (!answeredIndices.has(nextIndex)) {
              setStartTime(Date.now());
            }
          }
        }
      } catch {
        // Silently handle errors
      } finally {
        setSubmitting(false);
      }
    },
    [currentIndex, problems, sessionId, startTime, submitting, answeredIndices]
  );

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSolutionRevealed(answeredIndices.has(prevIndex));
    }
  }, [currentIndex, answeredIndices]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex > furthestIndex) {
      // Skipping to a new unvisited question
      if (nextIndex < problems.length) {
        setCurrentIndex(nextIndex);
        setFurthestIndex(nextIndex);
        setSolutionRevealed(false);
        setStartTime(Date.now());
      }
    } else {
      // Navigating forward through already-visited questions
      setCurrentIndex(nextIndex);
      setSolutionRevealed(answeredIndices.has(nextIndex));
    }
  }, [currentIndex, furthestIndex, answeredIndices, problems.length]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner className="w-8 h-8" />
        </main>
      </>
    );
  }

  if (problems.length === 0) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-gray-500 text-center">No problems found for this session.</p>
        </main>
      </>
    );
  }

  if (completed) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <SessionSummary
            chapterId={chapterId}
            chapterTitle={chapterTitle}
            courseId={courseId}
            correct={correct}
            incorrect={incorrect}
            total={problems.length}
            difficulty={difficulty}
          />
        </main>
      </>
    );
  }

  const currentProblem = problems[currentIndex];
  const isReviewingAnswered = answeredIndices.has(currentIndex);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex + 1 < problems.length;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <SessionProgress
          current={furthestIndex + 1}
          total={problems.length}
          correct={correct}
          incorrect={incorrect}
        />

        <div className="mt-6">
          <ProblemDisplay
            questionText={currentProblem.questionText}
            difficulty={currentProblem.difficulty}
            topic={currentProblem.topic}
            problemNumber={currentIndex + 1}
            totalProblems={problems.length}
          />

          {isReviewingAnswered ? (
            <SolutionReveal
              solutionText={currentProblem.solutionText}
              isRevealed={true}
              onReveal={() => {}}
            />
          ) : (
            <>
              <SolutionReveal
                solutionText={currentProblem.solutionText}
                isRevealed={solutionRevealed}
                onReveal={() => setSolutionRevealed(true)}
              />

              {solutionRevealed && (
                <SelfReportButtons onReport={handleReport} disabled={submitting} />
              )}
            </>
          )}

          {(canGoPrevious || canGoNext) && (
            <div className="flex justify-between items-center mt-6">
              {canGoPrevious ? (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              ) : (
                <div />
              )}
              {canGoNext ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
