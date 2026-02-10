import { Header } from "@/components/layout/header";
import { CourseForm } from "@/components/courses/course-form";

export default function NewCoursePage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Create Course</h1>
        <CourseForm />
      </main>
    </>
  );
}
