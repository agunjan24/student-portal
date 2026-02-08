"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
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
  const router = useRouter();

  const quizId = params.quizId as string;
  const sessionId = searchParams.get("sessionId")!;
  const problemIds = searchParams.get("problems")?.split(",") || [];

  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quizTopic, setQuizTopic] = useState("");
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

        // Get quiz info
        const quizRes = await fetch(`/api/quizzes/${quizId}`);
        if (quizRes.ok) {
          const quiz = await quizRes.json();
          setQuizTopic(quiz.topic);
        }

        // Get session info
        const sessionRes = await fetch(`/api/sessions/${sessionId}`);
        if (sessionRes.ok) {
          const session = await sessionRes.json();
          setDifficulty(session.difficulty);
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

        if (isCorrect) {
          setCorrect((c) => c + 1);
        } else {
          setIncorrect((c) => c + 1);
        }

        // Move to next problem or complete
        if (currentIndex + 1 >= problems.length) {
          // Complete the session
          await fetch(`/api/sessions/${sessionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "completed" }),
          });
          setCompleted(true);
        } else {
          setCurrentIndex((i) => i + 1);
          setSolutionRevealed(false);
          setStartTime(Date.now());
        }
      } catch {
        // Silently handle errors
      } finally {
        setSubmitting(false);
      }
    },
    [currentIndex, problems, sessionId, startTime, submitting]
  );

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
            quizId={quizId}
            quizTopic={quizTopic}
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

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <SessionProgress
          current={currentIndex + 1}
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

          <SolutionReveal
            solutionText={currentProblem.solutionText}
            isRevealed={solutionRevealed}
            onReveal={() => setSolutionRevealed(true)}
          />

          {solutionRevealed && (
            <SelfReportButtons onReport={handleReport} disabled={submitting} />
          )}
        </div>
      </main>
    </>
  );
}
