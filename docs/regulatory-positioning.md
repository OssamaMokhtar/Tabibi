# Regulatory Positioning — Tabibi

**Status:** Draft — for planning purposes only. Not legal advice.

## The Fundamental Question

Is Tabibi a **medical device** (requires DHA/UAE MoH approval) or a **health information assistant** (lower regulatory bar)?

This determines everything: what we can say, what we can build, what we can deploy, and what approvals we need.

## Option A: Medical Device

If Tabibi's triage output is used to make clinical decisions (or presented as equivalent to clinical triage), it may be classified as a medical device. This would require:

- Dubai Health Authority (DHA) approval for digital health products
- UAE Ministry of Health (MoH) regulatory clearance
- Clinical validation study demonstrating safety and efficacy
- Quality management system (ISO13485 or equivalent)
- Post-market surveillance plan

**Timeline estimate:** 18–36 months, AED 1M–5M+ in regulatory, clinical, and quality costs.

## Option B: Health Information Assistant

If Tabibi positions as a tool that provides health *information* (not clinical triage), the regulatory bar may be lower:

- The user is always responsible for their own health decisions
- Tabibi provides information and guidance, not clinical diagnosis or triage
- The disclaimer is prominent and unambiguous
- The tool is positioned as "health information" not "medical advice"

**Risk:** This positioning must be genuine. Regulators look at substance, not labels. If the tool is de facto providing clinical triage, calling it "health information" won't help.

## The "Not Medical Advice" UX Pattern

Regardless of regulatory classification:

1. **Every triage result surfaces the disclaimer.** Not just in the README, but in the UI, every time.
2. **EMERGENCY results hard-route to emergency guidance.** "Call 999 / go to the nearest emergency room" — not a sentence the user might skim past.
3. **The app never presents itself as a replacement for clinical care.** Nowhere in the UX does it suggest "this replaces a doctor."
4. **The scope of use is documented.** What Tabibi can do, what it can't do, what users should not use it for.

## Recommended Approach

1. **Engage a UAE digital health regulatory lawyer** — before any deployment, before any real user data.
2. **Make the "not medical advice" positioning genuine in the UX** — not just a sentence in the README.
3. **Document the intended scope of use** — what the tool does, what it doesn't do, what users should not use it for.
4. **Map DHA requirements** — what approvals, if any, are required for the intended use case.
5. **Plan clinical validation** — even if not required for launch, it's the right thing to do for a health product.

## Current Status

- Schema-constrained triage (SELF_CARE · GP_CONSULT · EMERGENCY)
- Eval suite with recall-on-EMERGENCY as primary metric
- Prompt injection tests in eval suite
- "This is a prototype and is not medical advice" in README
- No regulatory engagement yet
- No clinical validation
- No deployment to real users

## Arabic Considerations

- Arabic triage accuracy is as important as English for a bilingual MENA product
- DHA operates in Arabic — regulatory submissions may require Arabic documentation
- Arabic eval cases should be part of the eval suite from the start
