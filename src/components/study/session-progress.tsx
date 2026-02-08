interface SessionProgressProps {
  current: number;
  total: number;
  correct: number;
  incorrect: number;
}

export function SessionProgress({ current, total, correct, incorrect }: SessionProgressProps) {
  const answered = correct + incorrect;
  const progressPercent = total > 0 ? (answered / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Question {Math.min(current, total)} of {total}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-green-600 font-medium">{correct} correct</span>
          <span className="text-red-600 font-medium">{incorrect} wrong</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 rounded-full h-2 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
