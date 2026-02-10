import { getStandardById } from "@/lib/curriculum/ma-standards";

interface StandardsBadgesProps {
  standardIds: string[];
}

export function StandardsBadges({ standardIds }: StandardsBadgesProps) {
  if (standardIds.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {standardIds.map((id) => {
        const standard = getStandardById(id);
        return (
          <span
            key={id}
            title={standard?.description || id}
            className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 cursor-help"
          >
            {id}
          </span>
        );
      })}
    </div>
  );
}
