import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Language } from "../types";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

const TRIAGE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    urgency: {
      type: Type.STRING,
      enum: ['SELF_CARE', 'GP_CONSULT', 'EMERGENCY'],
      description: "The triage urgency level."
    },
    title: {
      type: Type.STRING,
      description: "A short title for the condition (e.g., Common Cold, Migraine)."
    },
    summary: {
      type: Type.STRING,
      description: "A sympathetic, calm summary of the assessment."
    },
    redFlags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of warning signs that require immediate attention."
    },
    careSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable advice for the user."
    },
    disclaimer: {
      type: Type.STRING,
      description: "A required medical disclaimer string."
    }
  },
  required: ['urgency', 'title', 'summary', 'redFlags', 'careSteps', 'disclaimer']
};

export const analyzeSymptoms = async (
  symptoms: string, 
  language: Language,
  userContext: string
) => {
  try {
    const langName = language === Language.AR ? 'Arabic (Modern Standard with warm tone)' : 'English';
    
    const systemInstruction = `
      You are Tabibi, a compassionate and culturally sensitive family medical assistant for the Middle East region.
      You are NOT a doctor. You provide triage guidance only.
      
      Your goal is to categorize the user's symptoms into one of three levels:
      1. SELF_CARE: Minor issues (e.g., mild cold, minor bruise).
      2. GP_CONSULT: Issues needing professional look (e.g., persistent fever, rash, infection signs).
      3. EMERGENCY: Life-threatening or severe (e.g., chest pain, difficulty breathing, severe bleeding).

      Tone: Empathetic, clear, and calm.
      Language Output: ${langName}.
      
      User Context: ${userContext}

      Rules:
      - NEVER recommend specific medication dosages.
      - ALWAYS advise seeing a doctor if unsure.
      - Respect cultural modesty.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: symptoms,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: TRIAGE_SCHEMA,
        temperature: 0.4 // Lower temperature for more consistent medical-adjacent advice
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Gemini Triage Error:", error);
    throw error;
  }
};
