# Arabic Eval Cases

**Status:** Structure defined — test cases to be written.

Arabic is a first-class language in Tabibi. The eval suite must include Arabic test cases, not just English.

## Why Arabic Eval Cases Matter

- Tabibi is bilingual (AR/EN) from the start — RTL via CSS logical properties, language context provider, bilingual tone system
- DHA operates in Arabic — regulatory submissions may require Arabic documentation
- Arabic triage accuracy may differ from English (different symptom descriptions, different cultural health concepts)
- Gemini's Arabic triage performance should be measured, not assumed

## Test Case Structure

Each Arabic eval case should include:

1. **Symptoms** (in Arabic) — the symptom description as an Arabic speaker would describe it
2. **User context** (in Arabic) — age, gender, relevant history, as appropriate
3. **Expected urgency** — SELF_CARE · GP_CONSULT · EMERGENCY
4. **Expected disclaimer** — the disclaimer text the model should return
5. **Rationale** — why this urgency classification is correct
6. **Cultural notes** — any Arabic/MENA-specific considerations (e.g., fasting during Ramadan, traditional remedies)

## Categories to Cover

- Common childhood illnesses (fever, cough, diarrhea) — in Arabic, from a parent's perspective
- Adult emergency symptoms (chest pain, difficulty breathing, severe bleeding) — in Arabic
- GP-worthy symptoms (persistent cough, mild fever, headache) — in Arabic
- Self-care symptoms (mild cold, minor cut) — in Arabic
- Edge cases: pregnancy, elderly, chronic conditions — in Arabic
- Prompt injection attempts in Arabic — trying to force SELF_CARE out of emergency symptoms

## Measurement

- Recall on EMERGENCY is the primary metric (same as English eval suite)
- A single missed emergency fails the run
- Over-triage doesn't fail (classifying a cold as GP visit costs an afternoon; classifying a heart attack as self-care costs a life)
- Arabic eval results should be tracked separately from English (different accuracy may be expected)
