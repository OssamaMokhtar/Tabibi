import { Language, TriageResponse } from "../types";

/**
 * Client-side triage service.
 *
 * This module deliberately contains NO Gemini SDK usage and NO API key.
 * The key is held only by the server (see server.ts) and the browser talks to
 * our own /api/triage endpoint. Anything imported here ships to the user, so
 * nothing secret may live in this file.
 */

export const analyzeSymptoms = async (
  symptoms: string,
  language: Language,
  userContext: string
): Promise<TriageResponse> => {
  const response = await fetch("/api/triage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      symptoms,
      language: language === Language.AR ? "ar" : "en",
      userContext,
    }),
  });

  if (response.status === 429) {
    throw new Error("Too many requests. Please wait a moment and try again.");
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || "Unable to complete triage. Please try again.");
  }

  return response.json();
};
