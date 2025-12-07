import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCheck, LuCode, LuCopy } from "react-icons/lu";

const AIAnswerPreview = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-[14px] prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !className;
              if (!isInline) {
                return (
                  <CodeBlock
                    code={String(children).replace(/\n$/, "")}
                    language={language}
                  />
                );
              }
              return (
                <code className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-md text-sm text-cyan-300 font-mono">
                  {children}
                </code>
              );
            },
            p({ children }) {
              return (
                <p className="mb-4 leading-7 text-slate-200">{children}</p>
              );
            },
            strong({ children }) {
              return (
                <strong className="text-slate-50 font-semibold">
                  {children}
                </strong>
              );
            },
            em({ children }) {
              return <em className="text-slate-300 italic">{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-none pl-0 space-y-2.5 my-5">{children}</ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-none pl-0 space-y-2.5 my-5 counter-reset-list">
                  {children}
                </ol>
              );
            },
            li({ children, ...props }) {
              const isOrdered =
                props.node?.tagName === "li" && props.node?.position;
              return (
                <li className="relative pl-7 text-slate-200 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400 before:rounded-full">
                  {children}
                </li>
              );
            },
            blockquote({ children }) {
              return (
                <blockquote className="relative border-l-4 border-gradient-to-b from-cyan-500 to-blue-500 pl-6 pr-4 py-3 my-6 bg-gradient-to-r from-slate-800/50 to-transparent rounded-r-lg">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
                  <div className="text-slate-300 italic">{children}</div>
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="text-3xl font-bold mt-8 mb-5 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  {children}
                </h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-2xl font-bold mt-7 mb-4 text-slate-100 border-b border-slate-700/50 pb-2">
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-xl font-bold mt-6 mb-3 text-slate-100">
                  {children}
                </h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-lg font-semibold mt-5 mb-2 text-slate-200">
                  {children}
                </h4>
              );
            },
            a({ href, children }) {
              return (
                <a
                  href={href}
                  className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/50 hover:decoration-cyan-400 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-6 rounded-xl border border-slate-700/50">
                  <table className="min-w-full divide-y divide-slate-700/50">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return (
                <thead className="bg-gradient-to-r from-slate-800 to-slate-800/70">
                  {children}
                </thead>
              );
            },
            tbody({ children }) {
              return (
                <tbody className="divide-y divide-slate-700/50 bg-slate-900/30">
                  {children}
                </tbody>
              );
            },
            th({ children }) {
              return (
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-4 py-3 text-sm text-slate-200">{children}</td>
              );
            },
            hr() {
              return (
                <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              );
            },
            img({ src, alt }) {
              return (
                <img
                  src={src}
                  alt={alt}
                  className="my-6 max-w-full rounded-xl shadow-lg border border-slate-700/50"
                />
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
    <div className="relative my-6 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/70 shadow-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-900 to-slate-900/80 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <LuCode size={16} className="text-cyan-400" />
          </div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all duration-200 focus:outline-none group cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <LuCheck size={16} className="text-green-400" />
              <span className="text-xs font-medium text-green-400">
                Copied!
              </span>
            </>
          ) : (
            <>
              <LuCopy
                size={16}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-medium">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            fontSize: 13,
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            lineHeight: "1.6",
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1em",
            color: "#475569",
            userSelect: "none",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default AIAnswerPreview;
