export function checkSymptoms(symptoms) {
  const s = symptoms.map((sym) => sym.toLowerCase());
  if (s.includes("fever") && s.includes("cough")) return "Possible Flu";
  if (s.includes("headache") && s.includes("fatigue")) return "Possible Migraine";
  if (s.includes("sore throat") && s.includes("fever")) return "Possible Infection";
  if (s.length === 0) return "Please select at least one symptom";
  return "Further consultation recommended";
}
