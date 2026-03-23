"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

export function AISummary() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState<{
    title: string;
    summary: string;
    key_points: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!url.trim() && !text.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() || null, text: text.trim() || null }),
      });
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-green-500" />
        <h3 className="font-semibold">AI Summary</h3>
      </div>

      <div className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste URL to summarize..."
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-center text-gray-400 text-xs">or</div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to summarize..."
          className="w-full h-24 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          onClick={handleSummarize}
          disabled={loading || (!url.trim() && !text.trim())}
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition text-sm"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className="space-y-2 text-sm">
            <h4 className="font-medium">{summary.title}</h4>
            <p className="text-gray-600 dark:text-gray-300">{summary.summary}</p>
            <ul className="list-disc list-inside text-gray-500 space-y-1">
              {summary.key_points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
