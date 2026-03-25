---
description: Check deployment readiness and run production build
---

## Pre-deployment Checklist

### 1. Environment Variables
!`grep -r "NEXT_PUBLIC_" /home/gaominggang/opc/ai-saas/src --include="*.ts" --include="*.tsx" | grep -v ".d.ts" | head -20`

### 2. Build Test
!`cd /home/gaominggang/opc/ai-saas && bun run build 2>&1`

### 3. Lint Check
!`cd /home/gaominggang/opc/ai-saas && bun run lint 2>&1`

### 4. Git Status
!`git status`

Verify:
- [ ] All env vars are set in production
- [ ] Build completes without errors
- [ ] No lint warnings
- [ ] No uncommitted changes
