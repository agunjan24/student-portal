import { Header } from "@/components/layout/header";
import { QuizForm } from "@/components/quizzes/quiz-form";

export default function NewQuizPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>
        <QuizForm />
      </main>
    </>
  );
}
