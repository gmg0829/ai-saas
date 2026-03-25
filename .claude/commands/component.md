---
description: Generate a new React component with proper structure
argument-hint: [component-name]
---

Create a new component with the following structure:

```
src/components/[ComponentName]/
├── index.ts           # Re-exports
├── [ComponentName].tsx # Main component
└── [ComponentName].module.css  # Styles (if needed)
```

Use this template:

```tsx
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function [ComponentName]() {
  return (
    <div className={twMerge(clsx(""))}>
      {/* component content */}
    </div>
  );
}
```

Run `!mkdir -p src/components/[ComponentName]` first if directory doesn't exist.
