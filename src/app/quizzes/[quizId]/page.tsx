import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, Trash2, Upload, Brain, GraduationCap, FileText } from "lucide-react";
import { Header } from "@/components/layout/header";
import { DaysRemaining } from "@/components/shared/days-remaining";
import { prisma } from "@/lib/db";
import { DeleteQuizButton } from "@/components/quizzes/delete-quiz-button";

export default async function QuizDetailPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      materials: { orderBy: { createdAt: "desc" } },
      problems: { orderBy: { createdAt: "desc" }, take: 5 },
      studySessions: { orderBy: { startedAt: "desc" }, take: 5 },
      _count: {
        select: {
          materials: true,
          problems: true,
          studySessions: true,
        },
      },
    },
  });

  if (!quiz) notFound();

  const completedSessions = quiz.studySessions.filter((s) => s.status === "completed");
  const totalCorrect = completedSessions.reduce((sum, s) => sum + s.correctCount, 0);
  const totalAnswered = completedSessions.reduce(
    (sum, s) => sum + s.correctCount + s.incorrectCount,
    0
  );
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{quiz.topic}</h1>
              <DaysRemaining date={quiz.quizDate} />
            </div>
            {quiz.description && (
              <p className="text-gray-500">{quiz.description}</p>
            )}
            <p className="text-sm text-gray-400 mt-1">
              Quiz date:{" "}
              {quiz.quizDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/quizzes/${quiz.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link>
            <DeleteQuizButton quizId={quiz.id} quizTopic={quiz.topic} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-xs font-medium">Materials</span>
            </div>
            <p className="text-2xl font-bold">{quiz._count.materials}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Brain className="w-4 h-4" />
              <span className="text-xs font-medium">Problems</span>
            </div>
            <p className="text-2xl font-bold">{quiz._count.problems}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span className="text-xs font-medium">Sessions</span>
            </div>
            <p className="text-2xl font-bold">{quiz._count.studySessions}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <span className="text-xs font-medium">Accuracy</span>
            </div>
            <p className="text-2xl font-bold">
              {accuracy !== null ? `${accuracy}%` : "—"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href={`/materials/upload?quizId=${quiz.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Materials
          </Link>
          {quiz._count.materials > 0 && (
            <Link
              href={`/study/${quiz.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Brain className="w-4 h-4" />
              Study Now
            </Link>
          )}
        </div>

        {/* Materials list */}
        {quiz.materials.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Materials</h2>
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
              {quiz.materials.map((material) => (
                <Link
                  key={material.id}
                  href={`/materials/${material.id}`}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium">{material.filename}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      material.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : material.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : material.status === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {material.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recent sessions */}
        {quiz.studySessions.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Recent Sessions</h2>
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
              {quiz.studySessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3">
                  <div>
                    <span className="text-sm font-medium capitalize">{session.difficulty}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(session.startedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm">
                    {session.status === "completed" ? (
                      <span className="text-green-700">
                        {session.correctCount}/{session.correctCount + session.incorrectCount} correct
                      </span>
                    ) : (
                      <span className="text-blue-600">In progress</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
