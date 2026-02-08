import { cn } from "@/lib/utils";

export function DaysRemaining({ date }: { date: Date }) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  let label: string;
  let colorClass: string;

  if (diff < 0) {
    label = "Past due";
    colorClass = "bg-gray-100 text-gray-600";
  } else if (diff === 0) {
    label = "Today";
    colorClass = "bg-red-100 text-red-700";
  } else if (diff === 1) {
    label = "Tomorrow";
    colorClass = "bg-red-100 text-red-700";
  } else if (diff <= 3) {
    label = `${diff} days`;
    colorClass = "bg-orange-100 text-orange-700";
  } else if (diff <= 7) {
    label = `${diff} days`;
    colorClass = "bg-yellow-100 text-yellow-700";
  } else {
    label = `${diff} days`;
    colorClass = "bg-green-100 text-green-700";
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", colorClass)}>
      {label}
    </span>
  );
}
