import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSymptoms } from "../../utils/symptomChecker";
import { 
  HeartIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  SparklesIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState("");
  const [severity, setSeverity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const symptomOptions = [
    { name: "Fever", icon: "🌡️", category: "General" },
    { name: "Cough", icon: "😷", category: "Respiratory" },
    { name: "Headache", icon: "🤕", category: "Neurological" },
    { name: "Fatigue", icon: "😴", category: "General" },
    { name: "Sore Throat", icon: "🗣️", category: "Respiratory" },
    { name: "Body Pain", icon: "💪", category: "Musculoskeletal" },
    { name: "Nausea", icon: "🤢", category: "Digestive" },
    { name: "Dizziness", icon: "💫", category: "Neurological" },
    { name: "Chest Pain", icon: "💔", category: "Cardiovascular" },
    { name: "Shortness of Breath", icon: "🫁", category: "Respiratory" },
    { name: "Stomach Pain", icon: "🤰", category: "Digestive" },
    { name: "Joint Pain", icon: "🦴", category: "Musculoskeletal" }
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
    
    // Determine severity based on symptoms
    const highRiskSymptoms = ["Chest Pain", "Shortness of Breath", "Severe Headache"];
    const mediumRiskSymptoms = ["Fever", "Body Pain", "Persistent Cough"];
    
    if (symptoms.some(s => highRiskSymptoms.includes(s))) {
      setSeverity("high");
    } else if (symptoms.some(s => mediumRiskSymptoms.includes(s))) {
      setSeverity("medium");
    } else {
      setSeverity("low");
    }
  };

  const clearSymptoms = () => {
    setSymptoms([]);
    setResult("");
    setSeverity("");
  };

  const filteredSymptoms = symptomOptions.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const categories = [...new Set(symptomOptions.map(s => s.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Symptom Checker
            </h1>
            <p className="text-black text-lg font-medium">
              Get instant AI-powered health insights based on your symptoms
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{symptoms.length}</div>
              <div className="text-sm text-black">Selected Symptoms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{symptoms.length}</div>
              <div className="text-black font-medium">Selected Symptoms</div>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">AI</div>
              <div className="text-black font-medium">Powered Analysis</div>
            </div>
            <SparklesIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">24/7</div>
              <div className="text-black font-medium">Available</div>
            </div>
            <HeartIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">Safe</div>
              <div className="text-black font-medium">& Secure</div>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={clearSymptoms}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black rounded-xl font-semibold transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Selected Symptoms */}
            {symptoms.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3">Selected Symptoms:</h3>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <span
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold cursor-pointer hover:bg-emerald-200 transition-colors"
                    >
                      {symptom} ✕
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Symptoms Grid */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black">Select Your Symptoms</h3>
            </div>
            <div className="p-6">
              {categories.map((category) => (
                <div key={category} className="mb-6">
                  <h4 className="text-lg font-semibold text-black mb-3">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredSymptoms
                      .filter(s => s.category === category)
                      .map((symptom) => (
                      <button
                        key={symptom.name}
                        onClick={() => toggleSymptom(symptom.name)}
                        className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                          symptoms.includes(symptom.name)
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{symptom.icon}</span>
                          <span className="font-medium">{symptom.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Check Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleCheck}
              disabled={symptoms.length === 0}
              className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
            >
              Analyze Symptoms
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className={`p-6 rounded-2xl border-2 ${getSeverityColor(severity)}`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {severity === 'high' && <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />}
                  {severity === 'medium' && <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />}
                  {severity === 'low' && <CheckCircleIcon className="w-8 h-8 text-green-500" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">Analysis Results</h3>
                  <p className="text-lg leading-relaxed">{result}</p>
                  
                  <div className="mt-6 p-4 bg-white bg-opacity-50 rounded-xl">
                    <p className="text-sm font-semibold">
                      ⚠️ <strong>Disclaimer:</strong> This tool provides general guidance only and is not a substitute for professional medical advice. Please consult a healthcare provider for accurate diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Health Tips */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Health Tips</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600">💧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Stay Hydrated</h4>
                    <p className="text-sm text-gray-600">Drink plenty of water throughout the day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">😴</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Get Rest</h4>
                    <p className="text-sm text-gray-600">Adequate sleep helps your body heal</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">🩺</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Consult Doctor</h4>
                    <p className="text-sm text-gray-600">When symptoms persist or worsen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate("/patient/appointments")}
                className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => navigate("/patient/ai-assistant")}
                className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors"
              >
                Chat with AI
              </button>
              <button 
                onClick={() => navigate("/patient/health-records")}
                className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors"
              >
                View Health Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
