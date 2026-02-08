"use client";

import "katex/dist/katex.min.css";
import katex from "katex";

function renderLatex(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      trust: true,
    });
  } catch {
    return latex;
  }
}

export function MathRenderer({ text }: { text: string }) {
  // Split text by LaTeX delimiters and render each part
  // $$...$$ for display math, $...$ for inline math
  const parts: { type: "text" | "inline" | "display"; content: string }[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Check for display math $$...$$
    const displayMatch = remaining.match(/\$\$([\s\S]*?)\$\$/);
    // Check for inline math $...$
    const inlineMatch = remaining.match(/\$([^\$\n]+?)\$/);

    if (!displayMatch && !inlineMatch) {
      parts.push({ type: "text", content: remaining });
      break;
    }

    const displayIndex = displayMatch ? remaining.indexOf(displayMatch[0]) : Infinity;
    const inlineIndex = inlineMatch ? remaining.indexOf(inlineMatch[0]) : Infinity;

    if (displayIndex <= inlineIndex && displayMatch) {
      // Add text before
      if (displayIndex > 0) {
        parts.push({ type: "text", content: remaining.slice(0, displayIndex) });
      }
      parts.push({ type: "display", content: displayMatch[1] });
      remaining = remaining.slice(displayIndex + displayMatch[0].length);
    } else if (inlineMatch) {
      // Add text before
      if (inlineIndex > 0) {
        parts.push({ type: "text", content: remaining.slice(0, inlineIndex) });
      }
      parts.push({ type: "inline", content: inlineMatch[1] });
      remaining = remaining.slice(inlineIndex + inlineMatch[0].length);
    }
  }

  return (
    <div className="math-content space-y-2">
      {parts.map((part, i) => {
        if (part.type === "text") {
          // Render text with line breaks
          return (
            <span key={i}>
              {part.content.split("\n").map((line, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {line}
                </span>
              ))}
            </span>
          );
        }
        if (part.type === "display") {
          return (
            <div
              key={i}
              className="my-2 overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: renderLatex(part.content, true),
              }}
            />
          );
        }
        // inline
        return (
          <span
            key={i}
            dangerouslySetInnerHTML={{
              __html: renderLatex(part.content, false),
            }}
          />
        );
      })}
    </div>
  );
}
