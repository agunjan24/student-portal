"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { getDomainsForCourse, type Standard } from "@/lib/curriculum/ma-standards";

interface StandardsSelectorProps {
  courseName: string;
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function StandardsSelector({ courseName, selected, onChange }: StandardsSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const domains = getDomainsForCourse(courseName);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  if (domains.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No standards available for this course. Select a course first.
      </p>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between"
      >
        <span className="text-sm text-gray-700">
          {selected.length === 0
            ? "Select standards..."
            : `${selected.length} standard${selected.length !== 1 ? "s" : ""} selected`}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selected.map((id) => (
            <span
              key={id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {id}
              <button
                type="button"
                onClick={() => toggle(id)}
                className="hover:text-indigo-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {domains.map((domain) => (
            <div key={domain.domain}>
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                {domain.domain}
              </div>
              {domain.standards.map((standard: Standard) => (
                <label
                  key={standard.id}
                  className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(standard.id)}
                    onChange={() => toggle(standard.id)}
                    className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-gray-900">{standard.id}</span>
                    <p className="text-xs text-gray-500 line-clamp-2">{standard.description}</p>
                  </div>
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
