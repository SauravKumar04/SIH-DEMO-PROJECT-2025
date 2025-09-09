import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSymptoms } from "../../utils/symptomChecker";

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState("");

  const symptomOptions = [
    "Fever",
    "Cough",
    "Headache",
    "Fatigue",
    "Sore Throat",
    "Body Pain",
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const toggleSymptom = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleCheck = () => {
    const res = checkSymptoms(symptoms);
    setResult(res);
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-color mb-6">
        Symptom Checker
      </h1>

      <p className="text-gray-700 mb-4">
        Select your symptoms below and get instant AI-based guidance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {symptomOptions.map((symptom) => (
          <button
            key={symptom}
            onClick={() => toggleSymptom(symptom)}
            className={`py-3 px-4 rounded-lg w-full text-center border-2 transition
              ${
                symptoms.includes(symptom)
                  ? "border-secondary-color bg-secondary-color text-white shadow-lg"
                  : "border-gray-300 bg-white hover:border-secondary-color hover:bg-blue-100"
              }`}
          >
            {symptom}
          </button>
        ))}
      </div>

      <button
        onClick={handleCheck}
        className="py-3 px-6 bg-accent-color text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition transform hover:-translate-y-1 mb-6"
      >
        Check Symptoms
      </button>

      {result && (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn border-l-4 border-secondary-color">
          <h2 className="text-xl font-semibold text-primary-color mb-2">
            Suggested Condition
          </h2>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  );
}
