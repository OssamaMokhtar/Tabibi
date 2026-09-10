# Security

**Status:** Prototype — not production hardened.

## Architecture Security Model

Schema-constrained triage: the model must return a defined urgency enum (SELF_CARE · GP_CONSULT · EMERGENCY) plus a disclaimer field. EMERGENCY classifications are handled as hard UI paths, not free-text sentences.

Input sanitization: user input is passed inside delimited `<symptoms>` and `<user_context>` blocks rather than concatenated into the system instruction. The system prompt instructs the model to treat that content as data.

Rate limiting: 10 requests per minute per IP.

## API Key Protection

- The Gemini API key is held server-side only.
- A build-time check asserts the key cannot appear in the client bundle.
- The key is never exposed to the browser.

## Data Classification

| Data Type | Classification | Notes |
|-----------|---------------|-------|
| Symptom data, triage results | Sensitive (health-adjacent) | Family health profiles, medication records, health documents |
| LLM prompts/responses | Internal | Server-side only |
| User profiles | Sensitive | Family member records |

## Known Security Gaps

| Gap | Severity | Roadmap |
|-----|----------|---------|
| No encryption at rest for health data | High | Pre-production |
| No RBAC beyond basic account | High | Pre-production |
| No SSO | High | Pre-production |
| No penetration test | High | Pre-production |
| No dependency vulnerability scanning | Medium | CI (this PR) |
| Clinical validation of triage not done | Critical | Pre-deployment |

## Reporting a Vulnerability

Contact the maintainer directly. Do not open a public issue for security vulnerabilities.

---

*See [Improvement Plan — Tabibi](../../Obsidian/Portfolio-Due-Diligence/04-Improvement-Plan-Tabibi.md) for the full security hardening roadmap.*
