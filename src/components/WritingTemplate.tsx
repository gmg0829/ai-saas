import { cn } from "@/lib/utils";

export function WritingTemplate({
  name,
  description,
  selected,
  onClick,
}: {
  name: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg border text-sm transition",
        selected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
      )}
    >
      {name}
    </button>
  );
}
