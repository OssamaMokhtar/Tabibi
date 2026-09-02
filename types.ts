export enum Language {
  AR = 'ar',
  EN = 'en'
}

export enum UrgencyLevel {
  SELF_CARE = 'SELF_CARE',
  GP_CONSULT = 'GP_CONSULT',
  EMERGENCY = 'EMERGENCY'
}

export interface TriageResponse {
  urgency: UrgencyLevel;
  title: string;
  summary: string;
  redFlags: string[];
  careSteps: string[];
  disclaimer: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: 'male' | 'female';
  chronicConditions: string[];
  bloodType?: string;
  allergies?: string[];
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string; // ISO string
  type: 'video' | 'in-person';
  memberId: string;
}

export interface HealthMetric {
  date: string;
  value: number;
  unit: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  triageResult?: TriageResponse;
  timestamp: number;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'stopped';
  memberId: string;
  instructions?: string;
}