import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentTextIcon, HeartIcon, PlusIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";

export default function HealthRecords() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      navigate("/");
    } else {
      setUser(storedUser);
      // Load health records from localStorage (offline-first)
      const storedRecords = JSON.parse(
        localStorage.getItem(`records_${storedUser.email}`) || "[]"
      );
      setRecords(storedRecords);
    }
  }, [navigate]);

  // Add demo record
  const addDemoRecord = () => {
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      doctor: "Dr. Singh",
      diagnosis: "Common Cold",
      prescription: "Paracetamol 500mg",
      notes: "Rest and plenty of fluids recommended",
      type: "General Consultation"
    };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem(`records_${user.email}`, JSON.stringify(updatedRecords));
  };

  const deleteRecord = (recordId) => {
    const updatedRecords = records.filter(record => record.id !== recordId);
    setRecords(updatedRecords);
    localStorage.setItem(`records_${user.email}`, JSON.stringify(updatedRecords));
  };

  const vitals = {
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    weight: "70 kg"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Health Records
            </h1>
            <p className="text-black text-lg font-medium">
              Your complete medical history and health data
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{records.length}</div>
              <div className="text-sm text-black">Total Records</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{records.length}</div>
              <div className="text-black font-medium">Total Records</div>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">
                {records.filter(r => r.date === new Date().toLocaleDateString()).length}
              </div>
              <div className="text-black font-medium">Recent Records</div>
            </div>
            <CalendarIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">
                {new Set(records.map(r => r.doctor)).size}
              </div>
              <div className="text-black font-medium">Doctors Consulted</div>
            </div>
            <UserIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{vitals.heartRate}</div>
              <div className="text-black font-medium">Heart Rate</div>
            </div>
            <HeartIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Add Record Button */}
          <div className="mb-8">
            <button
              onClick={addDemoRecord}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              <PlusIcon className="w-5 h-5" />
              Add Demo Record
            </button>
          </div>

          {/* Medical Records */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <DocumentTextIcon className="w-6 h-6 text-blue-500" />
                Medical Records ({records.length})
              </h3>
            </div>
            {records.length === 0 ? (
              <div className="p-8 text-center">
                <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-black text-lg font-medium mb-2">No medical records found</p>
                <p className="text-gray-500">Click "Add Demo Record" above to add your first record</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {records.map((record) => (
                  <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <DocumentTextIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-black">{record.diagnosis}</h4>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                              {record.type}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium text-black">Doctor:</span> {record.doctor}</p>
                            <p><span className="font-medium text-black">Date:</span> {record.date}</p>
                            <p><span className="font-medium text-black">Prescription:</span> {record.prescription}</p>
                            {record.notes && (
                              <p><span className="font-medium text-black">Notes:</span> {record.notes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                          View
                        </button>
                        <button 
                          onClick={() => deleteRecord(record.id)}
                          className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Latest Vitals */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Latest Vitals</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HeartIcon className="w-5 h-5 text-red-500" />
                    <span className="text-black font-medium">Blood Pressure</span>
                  </div>
                  <span className="text-lg font-bold text-black">{vitals.bloodPressure}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HeartIcon className="w-5 h-5 text-pink-500" />
                    <span className="text-black font-medium">Heart Rate</span>
                  </div>
                  <span className="text-lg font-bold text-black">{vitals.heartRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
                    <span className="text-black font-medium">Temperature</span>
                  </div>
                  <span className="text-lg font-bold text-black">{vitals.temperature}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                    <span className="text-black font-medium">Weight</span>
                  </div>
                  <span className="text-lg font-bold text-black">{vitals.weight}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Health Summary */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Health Summary</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-black">Blood pressure normal</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-black">Heart rate healthy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-black">Next checkup due</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                Upload Report
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Share with Doctor
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Export Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
