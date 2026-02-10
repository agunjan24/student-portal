import { Target, BookOpen, Brain, GraduationCap, Layers } from "lucide-react";

interface ProgressSummaryProps {
  overallAccuracy: number | null;
  sessionCount: number;
  materialCount: number;
  problemCount: number;
  courseCount: number;
}

export function ProgressSummary({
  overallAccuracy,
  sessionCount,
  materialCount,
  problemCount,
  courseCount,
}: ProgressSummaryProps) {
  const stats = [
    {
      label: "Courses",
      value: courseCount.toString(),
      icon: Layers,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "Accuracy",
      value: overallAccuracy !== null ? `${overallAccuracy}%` : "\u2014",
      icon: Target,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Sessions",
      value: sessionCount.toString(),
      icon: GraduationCap,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Materials",
      value: materialCount.toString(),
      icon: BookOpen,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Problems",
      value: problemCount.toString(),
      icon: Brain,
      color: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-2`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
