import React, { useState } from "react";
// ReactMarkdown → Converts Markdown → HTML
import ReactMarkdown from "react-markdown";
// remarkGfm → Supports GitHub Flavored Markdown (tables, checkboxes, lists)
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCheck, LuCode, LuCopy } from "react-icons/lu";

/*  
 - Shows Markdown content (AI answer preview).
 - Supports headings, bold, italic, lists, tables, images.
 - Custom styles using Tailwind classes.
 - Custom rendering for: code blocks, links, tables, headings.
*/
const AIAnswerPreview = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-[14px] prose prose-invert max-w-none">
        <ReactMarkdown
          // Enables GitHub style markdown
          remarkPlugins={[remarkGfm]}
          // Override default rendering for markdown elements
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !className; // Inline code has no className
              if (!isInline) {
                return (
                  <CodeBlock
                    code={String(children).replace(/\n$/, "")}
                    language={language}
                  />
                );
              }
              return (
                <code className="px-1 py-0.5 bg-gray-600 rounded text-sm text-gray-100">
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-4 leading-5 text-gray-200">{children}</p>;
            },
            strong({ children }) {
              return <strong className="text-gray-100">{children}</strong>;
            },
            em({ children }) {
              return <em className="text-gray-300">{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-2 my-4 text-gray-200">
                  {children}
                </ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 space-y-2 my-4 text-gray-200">
                  {children}
                </ol>
              );
            },
            li({ children }) {
              return <li className="mb-1 text-gray-200">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-gray-700 pl-4 italic my-4 text-gray-300">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-100">
                  {children}
                </h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-xl font-bold mt-6 mb-3 text-gray-100">
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-lg font-bold mt-5 mb-2 text-gray-100">
                  {children}
                </h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-base font-bold mt-4 mb-2 text-gray-100">
                  {children}
                </h4>
              );
            },
            a({ href, children }) {
              return (
                <a href={href} className="text-blue-400 hover:underline">
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-700 border border-gray-700 text-gray-200">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-800">{children}</thead>;
            },
            tbody({ children }) {
              return (
                <tbody className="divide-y divide-gray-700">{children}</tbody>
              );
            },
            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-gray-800">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-200">
                  {children}
                </td>
              );
            },
            hr() {
              return <hr className="my-6 border-gray-700" />;
            },
            img({ src, alt }) {
              return (
                <img src={src} alt={alt} className="my-4 max-w-full rounded" />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-gray-400" />

          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="text-gray-400 hover:text-gray-300 focus:outline-none relative group cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <LuCheck size={16} className="text-green-500" />
          ) : (
            <LuCopy size={16} />
          )}
          {copied && (
            <span className="absolute -top-8 right-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-80">
              Copied!
            </span>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIAnswerPreview;
