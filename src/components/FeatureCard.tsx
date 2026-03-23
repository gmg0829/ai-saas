import { cn } from "@/lib/utils";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: any;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
