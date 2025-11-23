/**
 * Simple Markdown Renderer Component
 * Renders markdown text with proper formatting for headings, bold, and lists
 */

import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const renderContent = () => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="list-disc ml-5 mb-4 space-y-1"
          >
            {listItems.map((item, idx) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{ __html: processBold(item) }}
              />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const processBold = (text: string): string => {
      return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Skip empty lines
      if (!trimmedLine) {
        flushList();
        return;
      }

      // Heading 2 (##)
      if (trimmedLine.startsWith("## ")) {
        flushList();
        const text = trimmedLine.substring(3);
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-lg font-semibold text-[#1F664B] mt-4 mb-2"
          >
            {text}
          </h2>
        );
        return;
      }

      // Heading 3 (###)
      if (trimmedLine.startsWith("### ")) {
        flushList();
        const text = trimmedLine.substring(4);
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-[1vw] font-semibold text-[#1F664B] mt-3 mb-2"
          >
            {text}
          </h3>
        );
        return;
      }

      // Bullet points (- or *)
      if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
        const text = trimmedLine.substring(2);
        listItems.push(text);
        return;
      }

      // Regular paragraph
      flushList();
      if (trimmedLine) {
        elements.push(
          <p
            key={`p-${index}`}
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: processBold(trimmedLine) }}
          />
        );
      }
    });

    // Flush any remaining list items
    flushList();

    return elements;
  };

  return <div className={className}>{renderContent()}</div>;
}
