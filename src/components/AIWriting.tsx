"use client";

import { useState } from "react";
import { PenTool } from "lucide-react";
import { WritingTemplate } from "./WritingTemplate";

const TEMPLATES = [
  { id: "email", name: "Email", description: "Professional email" },
  { id: "weibo", name: "Weibo", description: "Social post" },
  { id: "xhs", name: "Xiaohongshu", description: "Lifestyle content" },
];

export function AIWriting() {
  const [selectedTemplate, setSelectedTemplate] = useState("email");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: selectedTemplate, content: input }),
      });
      const data = await response.json();
      setOutput(data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <PenTool className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold">AI Writing</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          {TEMPLATES.map((t) => (
            <WritingTemplate
              key={t.id}
              {...t}
              selected={selectedTemplate === t.id}
              onClick={() => setSelectedTemplate(t.id)}
            />
          ))}
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what you want to write..."
          className="w-full h-24 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition text-sm"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {output && (
          <div className="relative">
            <textarea
              value={output}
              readOnly
              className="w-full h-32 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm resize-none"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
