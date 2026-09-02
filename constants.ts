import { Language, UrgencyLevel, Medication } from './types';

export const APP_NAME = "Tabibi";

export const TRANSLATIONS = {
  [Language.AR]: {
    nav_home: "الرئيسية",
    nav_triage: "فحص الأعراض",
    nav_family: "العائلة",
    nav_records: "السجلات",
    welcome: "مرحباً بك في طبيبي",
    subtitle: "رفيقك الصحي الذكي للعائلة",
    start_triage: "ابدأ الفحص الآلي",
    active_members: "أفراد العائلة",
    upcoming_appointments: "المواعيد القادمة",
    recent_vitals: "العلامات الحيوية",
    triage_input_placeholder: "بماذا تشعر اليوم؟ (مثال: لدي حمى وسعال)",
    triage_disclaimer: "هذا النظام يعمل بالذكاء الاصطناعي ولا يستبدل الطبيب. في حالات الطوارئ اتصل بـ 997.",
    urgency_emergency: "طوارئ - توجه للمستشفى",
    urgency_gp: "استشارة طبيب عام",
    urgency_self: "عناية ذاتية منزلية",
    red_flags: "علامات تحذيرية",
    care_steps: "خطوات العناية",
    send: "إرسال",
    consult_video: "فيديو",
    consult_person: "عيادة",
    add_member: "إضافة فرد",
    age: "سنة",
    chronic: "حالات مزمنة",
    no_chronic: "لا يوجد حالات مزمنة",
    
    // Records & Medications
    records_vault: "خزنة السجلات الصحية",
    records_locked: "السجلات مشفرة ومؤمنة",
    unlock_vault: "فتح الخزنة",
    medications: "الأدوية",
    lab_results: "نتائج المختبر",
    vaccinations: "التطعيمات",
    active_meds: "الأدوية الحالية",
    past_meds: "الأرشيف",
    add_medication: "إضافة دواء",
    dosage: "الجرعة",
    frequency: "التكرار",
    prescriber: "الطبيب المعالج",
    status_active: "نشط",
    status_completed: "مكتمل",
    status_stopped: "متوقف",
    med_name_placeholder: "اسم الدواء",
    med_dosage_placeholder: "500 mg",
    med_freq_placeholder: "مرتين يومياً",
    med_doc_placeholder: "د. محمد...",
    save: "حفظ",
    cancel: "إلغاء",
    view_details: "عرض التفاصيل",
    edit: "تعديل",
    delete: "حذف",
    instructions: "تعليمات الاستخدام",
    start_date: "تاريخ البدء",
    no_meds: "لا توجد أدوية مسجلة",
    secure_badge: "مشفر طرف لطرف",
    allergy_warning: "تحذير: يوجد تعارض مع حساسية المريض ضد",
  },
  [Language.EN]: {
    nav_home: "Home",
    nav_triage: "AI Triage",
    nav_family: "Family",
    nav_records: "Records",
    welcome: "Welcome to Tabibi",
    subtitle: "Your intelligent family health companion",
    start_triage: "Start AI Checkup",
    active_members: "Family Members",
    upcoming_appointments: "Upcoming Visits",
    recent_vitals: "Recent Vitals",
    triage_input_placeholder: "How do you feel? (e.g., I have fever and cough)",
    triage_disclaimer: "AI-powered assistant. Not a diagnosis. Call 999/911 for emergencies.",
    urgency_emergency: "EMERGENCY - Go to Hospital",
    urgency_gp: "See a Doctor (GP)",
    urgency_self: "Home Self-Care",
    red_flags: "Red Flags",
    care_steps: "Care Advice",
    send: "Send",
    consult_video: "Video",
    consult_person: "Clinic",
    add_member: "Add Member",
    age: "yo",
    chronic: "Chronic Conditions",
    no_chronic: "No chronic conditions",

    // Records & Medications
    records_vault: "Health Records Vault",
    records_locked: "Records are encrypted & locked",
    unlock_vault: "Unlock Vault",
    medications: "Medications",
    lab_results: "Lab Results",
    vaccinations: "Vaccinations",
    active_meds: "Active Medications",
    past_meds: "History",
    add_medication: "Add Medication",
    dosage: "Dosage",
    frequency: "Frequency",
    prescriber: "Prescriber",
    status_active: "Active",
    status_completed: "Completed",
    status_stopped: "Stopped",
    med_name_placeholder: "Medication Name",
    med_dosage_placeholder: "500 mg",
    med_freq_placeholder: "Twice daily",
    med_doc_placeholder: "Dr. Name...",
    save: "Save",
    cancel: "Cancel",
    view_details: "View Details",
    edit: "Edit",
    delete: "Delete",
    instructions: "Instructions",
    start_date: "Start Date",
    no_meds: "No medications found",
    secure_badge: "E2E Encrypted",
    allergy_warning: "Warning: Potential conflict with allergy to",
  }
};

export const MOCK_FAMILY: any[] = [
  {
    id: '1',
    name: 'Ahmed Al-Sayed',
    relation: 'Father',
    age: 42,
    gender: 'male',
    chronicConditions: ['Hypertension'],
    bloodType: 'O+',
    allergies: ['Aspirin', 'Sulfa']
  },
  {
    id: '2',
    name: 'Fatima Al-Sayed',
    relation: 'Mother',
    age: 38,
    gender: 'female',
    chronicConditions: [],
    bloodType: 'A+',
    allergies: []
  },
  {
    id: '3',
    name: 'Omar',
    relation: 'Son',
    age: 8,
    gender: 'male',
    chronicConditions: ['Asthma'],
    bloodType: 'B+',
    allergies: ['Peanuts', 'Penicillin']
  }
];

export const MOCK_APPOINTMENTS: any[] = [
  {
    id: '101',
    doctorName: 'Dr. Sarah Khalil',
    specialty: 'Pediatrics',
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    type: 'video',
    memberId: '3'
  },
  {
    id: '102',
    doctorName: 'Dr. Mahmoud Fawzy',
    specialty: 'Cardiology',
    date: new Date(Date.now() + 86400000 * 5).toISOString(),
    type: 'in-person',
    memberId: '1'
  }
];

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: 'm1',
    name: 'Concor',
    dosage: '5mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Mahmoud Fawzy',
    startDate: '2023-01-15',
    status: 'active',
    memberId: '1',
    instructions: 'Take in the morning after breakfast'
  },
  {
    id: 'm2',
    name: 'Panadol Advance',
    dosage: '500mg',
    frequency: 'When needed',
    prescribedBy: 'Dr. Sarah Khalil',
    startDate: '2023-10-10',
    endDate: '2023-10-20',
    status: 'completed',
    memberId: '3'
  },
  {
    id: 'm3',
    name: 'Ventolin Inhaler',
    dosage: '100mcg',
    frequency: 'As needed for wheezing',
    prescribedBy: 'Dr. Sarah Khalil',
    startDate: '2022-05-01',
    status: 'active',
    memberId: '3',
    instructions: 'Use with spacer'
  }
];