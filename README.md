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

## Status

Prototype — ~1,500 lines. Runs locally for demonstration.

**Before any deployment:** Gemini calls currently originate in the client. They must be moved behind a server proxy so the API key is never shipped in the bundle.

## License

MIT
