import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  DocumentTextIcon,
  PlusIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  HeartIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export default function Prescriptions() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [patientEmail, setPatientEmail] = useState("patient@example.com");
  const [prescriptions, setPrescriptions] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "doctor") {
      navigate("/");
    } else {
      setDoctor(storedUser);
      
      // Load demo prescriptions
      const demoPrescriptions = [
        {
          id: 1,
          patientName: "John Doe",
          patientEmail: "john.doe@email.com",
          date: "2024-11-15",
          diagnosis: "Hypertension",
          medication: "Lisinopril",
          dosage: "10mg",
          duration: "30 days",
          instructions: "Take once daily with food",
          status: "Active",
          doctor: storedUser.name
        },
        {
          id: 2,
          patientName: "Jane Smith",
          patientEmail: "jane.smith@email.com",
          date: "2024-11-10",
          diagnosis: "Asthma",
          medication: "Albuterol Inhaler",
          dosage: "90 mcg",
          duration: "As needed",
          instructions: "Use as rescue inhaler when experiencing symptoms",
          status: "Active",
          doctor: storedUser.name
        },
        {
          id: 3,
          patientName: "Robert Johnson",
          patientEmail: "robert.j@email.com",
          date: "2024-11-05",
          diagnosis: "High Cholesterol",
          medication: "Atorvastatin",
          dosage: "20mg",
          duration: "90 days",
          instructions: "Take once daily in the evening",
          status: "Completed",
          doctor: storedUser.name
        },
        {
          id: 4,
          patientName: "Mary Wilson",
          patientEmail: "mary.w@email.com",
          date: "2024-10-28",
          diagnosis: "Diabetes Type 2",
          medication: "Metformin",
          dosage: "500mg",
          duration: "60 days",
          instructions: "Take twice daily with meals",
          status: "Expired",
          doctor: storedUser.name
        }
      ];
      
      setPrescriptions(demoPrescriptions);
    }
  }, [navigate]);

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPrescription = () => {
    if (!diagnosis || !medication || !dosage || !duration) return;
    
    const newPrescription = {
      id: prescriptions.length + 1,
      patientName: selectedPatient || "New Patient",
      patientEmail: patientEmail,
      date: new Date().toLocaleDateString(),
      diagnosis,
      medication,
      dosage,
      duration,
      instructions,
      status: "Active",
      doctor: doctor.name
    };
    
    const updatedPrescriptions = [...prescriptions, newPrescription];
    setPrescriptions(updatedPrescriptions);
    
    // Reset form
    setDiagnosis("");
    setMedication("");
    setDosage("");
    setDuration("");
    setInstructions("");
    setShowForm(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return <CheckCircleIcon className="w-4 h-4" />;
      case 'completed': return <ClockIcon className="w-4 h-4" />;
      case 'expired': return <ExclamationTriangleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const totalPrescriptions = prescriptions.length;
  const activePrescriptions = prescriptions.filter(p => p.status === 'Active').length;
  const completedPrescriptions = prescriptions.filter(p => p.status === 'Completed').length;
  const expiredPrescriptions = prescriptions.filter(p => p.status === 'Expired').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Prescription Management
            </h1>
            <p className="text-black text-lg font-medium">
              Create, manage and track patient prescriptions
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            New Prescription
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{totalPrescriptions}</div>
              <div className="text-black font-medium">Total Prescriptions</div>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{activePrescriptions}</div>
              <div className="text-black font-medium">Active</div>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{completedPrescriptions}</div>
              <div className="text-black font-medium">Completed</div>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{expiredPrescriptions}</div>
              <div className="text-black font-medium">Expired</div>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Add Prescription Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-black mb-6">Create New Prescription</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-medium mb-2">Patient Email</label>
              <input
                type="email"
                placeholder="patient@example.com"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-black font-medium mb-2">Diagnosis</label>
              <input
                type="text"
                placeholder="e.g., Hypertension, Diabetes"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-black font-medium mb-2">Medication</label>
              <input
                type="text"
                placeholder="e.g., Lisinopril, Metformin"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-black font-medium mb-2">Dosage</label>
              <input
                type="text"
                placeholder="e.g., 10mg, 500mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-black font-medium mb-2">Duration</label>
              <input
                type="text"
                placeholder="e.g., 30 days, As needed"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-black font-medium mb-2">Special Instructions</label>
            <textarea
              placeholder="e.g., Take with food, Avoid alcohol"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={addPrescription}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Create Prescription
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-gray-100 text-black rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Search */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Prescriptions List */}
          <div className="space-y-6">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <DocumentTextIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{prescription.patientName}</h3>
                      <p className="text-gray-600">{prescription.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(prescription.status)}`}>
                      {getStatusIcon(prescription.status)}
                      {prescription.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-bold text-black mb-2">Diagnosis & Medication</h4>
                    <p className="text-gray-600 mb-1"><span className="font-medium text-black">Diagnosis:</span> {prescription.diagnosis}</p>
                    <p className="text-gray-600 mb-1"><span className="font-medium text-black">Medication:</span> {prescription.medication}</p>
                    <p className="text-gray-600"><span className="font-medium text-black">Dosage:</span> {prescription.dosage}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-black mb-2">Treatment Details</h4>
                    <p className="text-gray-600 mb-1"><span className="font-medium text-black">Duration:</span> {prescription.duration}</p>
                    <p className="text-gray-600 mb-1"><span className="font-medium text-black">Doctor:</span> {prescription.doctor}</p>
                  </div>
                </div>
                
                {prescription.instructions && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm"><span className="font-medium text-black">Instructions:</span> {prescription.instructions}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Quick Stats */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Status Overview</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-black font-medium">Active</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{activePrescriptions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-black font-medium">Completed</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{completedPrescriptions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-black font-medium">Expired</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">{expiredPrescriptions}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                Export Prescriptions
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                View Patient History
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Drug Interactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
