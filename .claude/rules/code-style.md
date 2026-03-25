---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Code Style Rules

## TypeScript
- Use explicit types for function parameters and return values
- Prefer `interface` over `type` for object shapes
- Use `unknown` instead of `any` when type is uncertain
- No unused variables or imports (TypeScript strict mode)

## React Components
- Use function components with explicit prop types
- Prefer `clsx` + `tailwind-merge` for conditional classes
- Use `lucide-react` for icons
- Keep components focused and small (single responsibility)

## File Organization
- One component per file
- Colocate related files (component with its styles/tests)
- Use index.ts for clean exports

## Naming
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case or PascalCase for components
