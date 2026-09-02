# Tabibi — Bilingual AI Family Health Advocate

> Symptom triage, family health profiles, and medication management for the MENA region — in Arabic and English.

`TypeScript` · `React` · `Vite` · `Gemini`

---

## The problem

Health information in the Gulf is overwhelmingly English-first, while the anxious 2am question — *is this serious enough for an emergency room?* — gets asked in Arabic. Tabibi is a triage companion built bilingual from the start, not localised afterwards.

## What it does

- **Symptom triage** — structured urgency classification: `SELF_CARE` · `GP_CONSULT` · `EMERGENCY`
- **Family profiles** — manage records for dependents, not just yourself
- **Medication manager** — track what each family member is taking
- **Records vault** — store and retrieve health documents
- **Full AR/EN switching** via a language context provider

## Safety design

Triage output is schema-constrained rather than free-text: the model must return a defined urgency enum plus a disclaimer field, so an `EMERGENCY` classification can be handled by the UI as a hard path rather than a sentence the user might skim past.

**This is a prototype and is not medical advice.** It has not been clinically validated, and is not deployed publicly.

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
cp .env.local.example .env.local    # add your GEMINI_API_KEY
npm run dev
```

## Architecture

Gemini is called **server-side only** (`server.ts`). The browser posts to `/api/triage`; the API key never reaches the client, and a build-time check asserts it cannot.

User input is passed inside delimited `<symptoms>` and `<user_context>` blocks rather than concatenated into the system instruction, and the system prompt explicitly instructs the model to treat that content as data. The endpoint is rate limited to 10 requests per minute per IP.

## Quality bar

Triage quality is measured, not assumed — see [`evals/`](evals/).

Recall on `EMERGENCY` is the primary metric, and **a single missed emergency fails the run**. Over-triage never fails it: classifying a cold as worth a GP visit costs an afternoon, while classifying a heart attack as self-care costs a life. The suite also includes prompt-injection cases that attempt to force a `SELF_CARE` result out of genuine emergency symptoms.

```bash
npm run dev        # terminal 1
npm run test:eval  # terminal 2
```

## Status

Prototype — ~1,500 lines. Runs locally for demonstration. Eval labels are written for engineering regression testing and require clinical review before real-world use.

## License

MIT
