"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathToolbar } from "./math-toolbar";
import { MathRenderer } from "./math-renderer";

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
}

export function MathInput({
  value,
  onChange,
  placeholder,
  label,
  rows = 6,
}: MathInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(value);

  // Debounced preview update
  useEffect(() => {
    const timer = setTimeout(() => setPreview(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const handleInsert = useCallback(
    (before: string, after?: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = value.slice(start, end);
      const insert = before + selected + (after ?? "");
      const newValue = value.slice(0, start) + insert + value.slice(end);
      onChange(newValue);

      // Restore cursor position inside the inserted template
      requestAnimationFrame(() => {
        textarea.focus();
        const cursorPos = after
          ? start + before.length + selected.length
          : start + insert.length;
        textarea.setSelectionRange(cursorPos, cursorPos);
      });
    },
    [value, onChange]
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <MathToolbar onInsert={handleInsert} />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 rounded-b-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-y"
      />
      {preview.trim() && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Preview</p>
          <MathRenderer text={preview} />
        </div>
      )}
    </div>
  );
}
