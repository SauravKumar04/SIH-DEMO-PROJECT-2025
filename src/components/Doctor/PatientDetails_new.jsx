import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserGroupIcon, 
  UserIcon, 
  HeartIcon, 
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

export default function PatientDetails() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "doctor") {
      navigate("/");
    } else {
      setDoctor(storedUser);
      
      // Load demo patients
      const demoPatients = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@email.com",
          age: 35,
          gender: "Male",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, City, State",
          bloodType: "O+",
          allergies: ["Penicillin", "Nuts"],
          conditions: ["Hypertension", "Diabetes Type 2"],
          lastVisit: "2024-11-15",
          nextAppointment: "2024-12-15 10:00 AM",
          status: "Active",
          healthRecords: [
            { date: "2024-11-15", diagnosis: "Routine Checkup", prescription: "None" },
            { date: "2024-10-20", diagnosis: "Hypertension Follow-up", prescription: "Lisinopril 10mg" }
          ],
          vitals: {
            bloodPressure: "130/85",
            heartRate: "75 bpm",
            temperature: "98.6°F",
            weight: "180 lbs",
            height: "5'10\""
          }
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@email.com",
          age: 28,
          gender: "Female",
          phone: "+1 (555) 987-6543",
          address: "456 Oak Ave, City, State",
          bloodType: "A-",
          allergies: ["Shellfish"],
          conditions: ["Asthma"],
          lastVisit: "2024-11-10",
          nextAppointment: "2024-12-20 2:00 PM",
          status: "Active",
          healthRecords: [
            { date: "2024-11-10", diagnosis: "Asthma Management", prescription: "Albuterol Inhaler" },
            { date: "2024-09-15", diagnosis: "Annual Physical", prescription: "Multivitamin" }
          ],
          vitals: {
            bloodPressure: "115/70",
            heartRate: "68 bpm",
            temperature: "98.4°F",
            weight: "135 lbs",
            height: "5'6\""
          }
        },
        {
          id: 3,
          name: "Robert Johnson",
          email: "robert.j@email.com",
          age: 52,
          gender: "Male",
          phone: "+1 (555) 456-7890",
          address: "789 Pine St, City, State",
          bloodType: "B+",
          allergies: ["None known"],
          conditions: ["High Cholesterol"],
          lastVisit: "2024-11-05",
          nextAppointment: "2024-12-30 9:00 AM",
          status: "Active",
          healthRecords: [
            { date: "2024-11-05", diagnosis: "Cholesterol Check", prescription: "Atorvastatin 20mg" },
            { date: "2024-08-12", diagnosis: "General Consultation", prescription: "Diet counseling" }
          ],
          vitals: {
            bloodPressure: "140/90",
            heartRate: "80 bpm",
            temperature: "98.8°F",
            weight: "200 lbs",
            height: "5'11\""
          }
        }
      ];
      
      setPatients(demoPatients);
    }
  }, [navigate]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              {selectedPatient ? `Patient: ${selectedPatient.name}` : 'Patient Management'}
            </h1>
            <p className="text-black text-lg font-medium">
              {selectedPatient ? 'Detailed patient information and medical history' : 'View and manage your patients'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{patients.length}</div>
              <div className="text-sm text-black">Total Patients</div>
            </div>
            {selectedPatient && (
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-xl font-medium transition-colors"
              >
                Back to List
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{patients.length}</div>
              <div className="text-black font-medium">Total Patients</div>
            </div>
            <UserGroupIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{patients.filter(p => p.status === 'Active').length}</div>
              <div className="text-black font-medium">Active Patients</div>
            </div>
            <HeartIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">
                {patients.reduce((acc, p) => acc + p.healthRecords.length, 0)}
              </div>
              <div className="text-black font-medium">Health Records</div>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">
                {patients.filter(p => p.nextAppointment).length}
              </div>
              <div className="text-black font-medium">Upcoming Visits</div>
            </div>
            <CalendarDaysIcon className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {!selectedPatient ? (
        // Patients List View
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Search and Add */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                  <PlusIcon className="w-5 h-5" />
                  Add Patient
                </button>
              </div>
            </div>

            {/* Patients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">{patient.name}</h3>
                        <p className="text-gray-600">{patient.age} years, {patient.gender}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-medium text-black">Blood Type:</span> {patient.bloodType}</p>
                    <p><span className="font-medium text-black">Last Visit:</span> {patient.lastVisit}</p>
                    <p><span className="font-medium text-black">Conditions:</span> {patient.conditions.join(', ')}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium text-black">{patient.healthRecords.length}</span>
                      <span className="text-gray-500"> health records</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Quick Stats */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-black mb-4">Quick Stats</h3>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-black font-medium">New Patients (Month)</span>
                    <span className="text-2xl font-bold text-emerald-600">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-medium">Critical Cases</span>
                    <span className="text-2xl font-bold text-red-600">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-medium">Follow-ups Due</span>
                    <span className="text-2xl font-bold text-orange-600">3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                  Schedule Appointment
                </button>
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                  View Calendar
                </button>
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Patient Detail View
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Patient Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-black">{selectedPatient.name}</h2>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedPatient.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedPatient.age} years, {selectedPatient.gender}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Vitals */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <h3 className="text-xl font-bold text-black mb-4">Current Vitals</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(selectedPatient.vitals).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-black">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Records */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-black">Health Records</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {selectedPatient.healthRecords.map((record, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-black">{record.diagnosis}</h4>
                        <p className="text-gray-600 text-sm mt-1">Prescription: {record.prescription}</p>
                      </div>
                      <span className="text-sm text-gray-500">{record.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Sidebar */}
          <div>
            {/* Medical Info */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-black mb-4">Medical Information</h3>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-black font-medium">Blood Type:</span>
                    <span className="text-lg font-bold text-red-600 ml-2">{selectedPatient.bloodType}</span>
                  </div>
                  <div>
                    <span className="text-black font-medium">Allergies:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-black font-medium">Conditions:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPatient.conditions.map((condition, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Info */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-black mb-4">Appointments</h3>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-black font-medium">Last Visit:</span>
                    <p className="text-gray-600">{selectedPatient.lastVisit}</p>
                  </div>
                  <div>
                    <span className="text-black font-medium">Next Appointment:</span>
                    <p className="text-gray-600">{selectedPatient.nextAppointment}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-black mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                  Schedule Appointment
                </button>
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                  Add Health Record
                </button>
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                  Write Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
