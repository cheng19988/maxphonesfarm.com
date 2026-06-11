/** Minimal markdown: paragraphs, **bold**, and bullet lines starting with "- ". */
export function BlogContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);

  return (
    <div className="prose-content space-y-5 text-neutral-600 leading-relaxed">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const isList = lines.every((line) => line.startsWith("- ") || line.trim() === "");

        if (isList && lines.some((line) => line.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-2">
              {lines
                .filter((line) => line.startsWith("- "))
                .map((line) => (
                  <li key={line}>{renderInline(line.slice(2))}</li>
                ))}
            </ul>
          );
        }

        return <p key={i}>{renderInline(block.replace(/\n/g, " "))}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-neutral-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
