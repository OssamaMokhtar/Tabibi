# Test Suite — RiskLens

**Status:** Structure defined — tests to be written after TypeScript migration.

## Test Categories

### 1. PD/LGD Model Tests

- Test PD model outputs against known cases (high-risk, low-risk, borderline)
- Test LGD model outputs against known cases
- Test factor attribution correctness (each factor's contribution to the score)
- Test model sensitivity (how does the score change when inputs change?)

### 2. Scoring Logic Tests

- Test full scoring pipeline: application → scoring → decision
- Test edge cases: missing inputs, extreme values, conflicting signals
- Test audit trail completeness: every decision produces a reconstructable audit trail

### 3. Fraud/AML Screening Tests

- Test AML screening against known sanctions lists (mock data)
- Test fraud detection rules against known fraud patterns (mock data)
- Test screening result integration with credit decision

### 4. API Endpoint Tests

- Test each API endpoint: request validation, response format, error handling
- Test authentication and authorization (if implemented)
- Test rate limiting (if implemented)

### 5. RAG Copilot Tests

- Test retrieval accuracy on regulatory documents (mock corpus)
- Test citation correctness (are citations accurate?)
- Test answer faithfulness (does the answer match the retrieved context?)
- Test prompt injection resistance

### 6. Integration Tests

- Test full pipeline: application → scoring → fraud screening → copilot → decision
- Test audit trail across the full pipeline

## Execution

```bash
npm test              # Run all tests
npm test -- --watch   # Run in watch mode (development)
npm test -- --coverage # Run with coverage report
```

## CI Integration

Tests run in CI on every push and pull request. See `.github/workflows/ci.yml`.

## Relationship to Improvement Plan

This test suite is Phase 2 of the RiskLens improvement plan. See [[03-Improvement-Plan-RiskFree]].
