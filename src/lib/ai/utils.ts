export function stripCodeFences(text: string): string {
  return text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
}

/**
 * Attempt to parse a truncated JSON array by finding the last complete object.
 * Returns parsed items or null if recovery isn't possible.
 */
export function parseTruncatedJsonArray<T>(text: string): T[] | null {
  const cleaned = stripCodeFences(text);

  // Try parsing as-is first
  try {
    return JSON.parse(cleaned) as T[];
  } catch {
    // Fall through to recovery
  }

  // Find the last complete object by searching for "}," or "}" followed by "]"
  // Walk backwards to find the last closing brace that completes an object
  let lastValidEnd = -1;
  let braceDepth = 0;
  let inString = false;
  let escape = false;

  for (let i = 0; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (ch === "{") braceDepth++;
    if (ch === "}") {
      braceDepth--;
      if (braceDepth === 0) {
        lastValidEnd = i;
      }
    }
  }

  if (lastValidEnd === -1) return null;

  // Slice up to and including the last complete object, then close the array
  const partial = cleaned.slice(0, lastValidEnd + 1).trimEnd();
  // Remove any trailing comma and close the array
  const withoutTrailingComma = partial.replace(/,\s*$/, "");
  const recovered = withoutTrailingComma.endsWith("]")
    ? withoutTrailingComma
    : withoutTrailingComma + "]";

  try {
    return JSON.parse(recovered) as T[];
  } catch {
    return null;
  }
}
