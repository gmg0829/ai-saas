import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        role === "user" ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-800/50"
      )}
    >
      <div className="flex-shrink-0">
        {role === "user" ? (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );
}
