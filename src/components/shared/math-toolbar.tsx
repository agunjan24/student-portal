"use client";

interface MathToolbarProps {
  onInsert: (before: string, after?: string) => void;
}

const SYMBOLS = [
  { label: "x/y", insert: ["\\frac{", "}{}"  ], title: "Fraction" },
  { label: "x²",  insert: ["^{", "}"],           title: "Exponent" },
  { label: "x₂",  insert: ["_{", "}"],           title: "Subscript" },
  { label: "√",   insert: ["\\sqrt{", "}"],      title: "Square root" },
  { label: "ⁿ√",  insert: ["\\sqrt[]{", "}"],    title: "Nth root" },
  { label: "π",   insert: ["\\pi"],              title: "Pi" },
  { label: "±",   insert: ["\\pm"],              title: "Plus/minus" },
  { label: "∞",   insert: ["\\infty"],           title: "Infinity" },
  { label: "≤",   insert: ["\\leq"],             title: "Less than or equal" },
  { label: "≥",   insert: ["\\geq"],             title: "Greater than or equal" },
  { label: "≠",   insert: ["\\neq"],             title: "Not equal" },
  { label: "Σ",   insert: ["\\sum_{", "}^{}"],   title: "Sum" },
  { label: "∫",   insert: ["\\int_{", "}^{}"],   title: "Integral" },
  { label: "θ",   insert: ["\\theta"],           title: "Theta" },
  { label: "α",   insert: ["\\alpha"],           title: "Alpha" },
  { label: "β",   insert: ["\\beta"],            title: "Beta" },
  { label: "$$",  insert: ["$$\n", "\n$$"],      title: "Display math block" },
  { label: "$·$", insert: ["$", "$"],            title: "Inline math" },
];

export function MathToolbar({ onInsert }: MathToolbarProps) {
  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-t-lg border border-b-0 border-gray-300">
      {SYMBOLS.map((sym) => (
        <button
          key={sym.title}
          type="button"
          title={sym.title}
          onClick={() => onInsert(sym.insert[0], sym.insert[1])}
          className="px-2 py-1 text-sm font-mono bg-white border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors min-w-[32px]"
        >
          {sym.label}
        </button>
      ))}
    </div>
  );
}
