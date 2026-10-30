// Shows text from the content files, turning any [bracketed text] into a dashed
// "placeholder" tag so it's obvious on the site that the real details are still to come.
export function WithPlaceholders({ text, tone = "dark" }: { text: string; tone?: "dark" | "light" }) {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span
            key={i}
            title="Placeholder: details coming soon"
            className={`inline rounded-md border border-dashed px-1.5 py-px font-normal italic [box-decoration-break:clone] ${
              tone === "light"
                ? "border-white/50 bg-white/10 text-white/80"
                : "border-muted/50 bg-placeholder/40 text-muted"
            }`}
          >
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export const hasPlaceholder = (...texts: string[]) => texts.some((t) => /\[[^\]]+\]/.test(t));
