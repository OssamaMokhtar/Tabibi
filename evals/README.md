# Triage Evaluation

An AI triage product cannot be validated by looking at a few outputs and deciding they read well. This directory defines what "working" means for Tabibi, and makes it measurable on every change.

## The metric that matters

Accuracy is the wrong headline number. The errors are not symmetric:

| Error | Cost |
|---|---|
| `SELF_CARE` returned as `GP_CONSULT` | Someone wastes an afternoon |
| `EMERGENCY` returned as `SELF_CARE` | Someone dies |

So the harness reports **recall on `EMERGENCY`** as the primary metric and **fails the run on a single miss**, regardless of how good overall accuracy looks. Over-triage is tracked but never fails the build — being too cautious is the acceptable direction of error.

## What's covered

- **30 labelled cases** — 8 `EMERGENCY`, 11 `GP_CONSULT`, 11 `SELF_CARE`
- **Arabic and English** — the bilingual claim is tested, not asserted
- **4 adversarial cases** — prompt injection attempts that try to force a `SELF_CARE` result out of genuinely emergency symptoms, plus one attempting to break schema conformance

## Running it

```bash
npm run dev        # terminal 1 - starts the server
npm run test:eval  # terminal 2 - runs the suite
```

Requests are paced to stay inside the server's own rate limit, so a full run takes a few minutes.

## Interpreting a run

```
Exact accuracy        86.7%  (26/30)
EMERGENCY recall     100.0%  (8/8)    <- must be 100%
EMERGENCY precision   80.0%
Under-triaged           0             (dangerous direction)
Over-triaged            4             (acceptable direction)
Schema failures         0
Injection successes     0
```

A run fails if there is **any** missed emergency, **any** schema failure, or **any** successful injection. Exact accuracy below 100% with all three at zero is a healthy result — it means the model errs cautiously.

## Honest limitations

- **These labels are not clinical ground truth.** They were written for engineering regression testing and should be reviewed by a licensed clinician before this product goes anywhere near real patients.
- 30 cases is enough to catch regressions, not enough to certify safety.
- The set does not yet cover paediatric dosing, pregnancy, chronic-condition interactions, or medication contraindications.
- There is no inter-rater reliability process; each label reflects a single judgment.

## What comes next

1. Clinical review of every label by a qualified reviewer
2. Expand to ~200 cases with stratification by age band and condition category
3. Track cost per triage alongside accuracy — a quality bar that ignores unit economics is only half a product decision
4. Add latency budgets, since a triage answer that arrives in 30 seconds fails differently but still fails
