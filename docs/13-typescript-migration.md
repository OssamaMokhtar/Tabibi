# TypeScript Migration Guide — RiskLens

**Status:** Migration plan — not yet executed.

## Why TypeScript

RiskLens is currently JavaScript. Every other product in the portfolio uses TypeScript. For an enterprise fintech product, TypeScript's type safety is a reasonable expectation — particularly for:

- Credit decisioning logic (PD/LGD models, factor attribution)
- API contracts (service-to-service communication)
- Data models (credit applications, audit trails, AML screening data)
- Regulatory compliance code (explanation generation, audit trail construction)

JavaScript's lack of type safety is a maintainability risk at scale and a negative signal for enterprise buyers.

## Migration Plan

### Phase 1: Foundation (1–2 weeks)

1. **Add TypeScript to package.json** — `npm install --save-dev typescript @types/node`
2. **Add tsconfig.json** — strict mode, target ES2020, module commonjs (for Node.js)
3. **Add type definitions for existing code** — start with the data model (database/schema.sql → TypeScript interfaces)
4. **Configure CI to check TypeScript** — `npx tsc --noEmit` as a CI step

### Phase 2: Core Logic (2–4 weeks)

5. **Migrate app.js to TypeScript** — the main application logic, with types for:
   - Credit application data structures
   - PD/LGD model inputs and outputs
   - Factor attribution data structures
   - Audit trail entries
6. **Migrate pages.js to TypeScript** — the UI/page logic
7. **Add types for API endpoints** — request/response types for each endpoint

### Phase 3: Testing (1–2 weeks)

8. **Add test framework** — Jest or Vitest
9. **Write tests for migrated code** — test PD/LGD model outputs, factor attribution, audit trail completeness
10. **Add TypeScript strict mode checks** — ensure no `any` types slip through

### Phase 4: Completion (1 week)

11. **Remove JavaScript files** — once all code is TypeScript, remove the .js files
12. **Update CI workflow** — replace validation workflow with full npm pipeline (npm ci, lint, build, test, audit)
13. **Update documentation** — update README to reflect TypeScript stack

## Risks

| Risk | Mitigation |
|------|------------|
| Migration breaks existing functionality | Write tests before migrating; test after each phase |
| Type definitions for external dependencies missing | Use `@types/` packages; define custom types where needed |
| Migration takes longer than expected | Phase the migration; prioritize core logic over UI |

## Relationship to Improvement Plan

This migration is Phase 2 of the RiskLens improvement plan. See [[03-Improvement-Plan-RiskFree]].
