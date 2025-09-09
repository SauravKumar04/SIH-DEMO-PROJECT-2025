import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      date: new Date().toLocaleDateString(),
      doctor: "Dr. Singh",
      diagnosis: "Common Cold",
      prescription: "Paracetamol 500mg",
    };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem(`records_${user.email}`, JSON.stringify(updatedRecords));
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-color mb-6">
        Health Records
      </h1>

      <button
        onClick={addDemoRecord}
        className="mb-6 py-2 px-4 bg-secondary-color text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:-translate-y-1"
      >
        Add Demo Record
      </button>

      {records.length === 0 ? (
        <p className="text-gray-700">No records found. Click above to add a demo record.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {records.map((record, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 animate-fadeIn border-l-4 border-accent-color"
            >
              <h2 className="text-xl font-semibold text-primary-color mb-2">
                {record.date}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Doctor:</span> {record.doctor}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Diagnosis:</span> {record.diagnosis}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Prescription:</span> {record.prescription}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
