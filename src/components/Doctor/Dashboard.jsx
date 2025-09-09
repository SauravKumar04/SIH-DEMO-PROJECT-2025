import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserGroupIcon, CalendarDaysIcon, VideoCameraIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "doctor") {
      navigate("/");
    } else {
      setDoctor(storedUser);
      // Load all patient appointments for demo
      const allAppointments = JSON.parse(localStorage.getItem("allAppointments") || "[]");
      setAppointments(allAppointments);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Doctor Dashboard
            </h1>
            <p className="text-black text-lg font-medium">
              Welcome, Dr. {doctor?.email?.split("@")[0]}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{appointments.length}</div>
              <div className="text-sm text-black">Total Appointments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">125</div>
              <div className="text-black font-medium">Total Patients</div>
            </div>
            <UserGroupIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{appointments.length}</div>
              <div className="text-black font-medium">Appointments Today</div>
            </div>
            <CalendarDaysIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">8</div>
              <div className="text-black font-medium">Video Calls</div>
            </div>
            <VideoCameraIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">45</div>
              <div className="text-black font-medium">Prescriptions</div>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dashboard Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-black mb-6">Doctor Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/doctor/patients"
              className="group block"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Patients</h3>
                <p className="text-black mb-4 leading-relaxed">View patient list & details</p>
                <div className="text-sm font-semibold text-blue-600">125 patients</div>
              </div>
            </Link>

            <Link
              to="/doctor/appointments"
              className="group block"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CalendarDaysIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Appointments</h3>
                <p className="text-black mb-4 leading-relaxed">Manage your upcoming consultations</p>
                <div className="text-sm font-semibold text-green-600">{appointments.length} today</div>
              </div>
            </Link>

            <Link
              to="/doctor/video"
              className="group block"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <VideoCameraIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Video Calls</h3>
                <p className="text-black mb-4 leading-relaxed">Start a live consultation</p>
                <div className="text-sm font-semibold text-red-600">8 calls today</div>
              </div>
            </Link>

            <Link
              to="/doctor/prescriptions"
              className="group block"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ClipboardDocumentListIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Prescriptions</h3>
                <p className="text-black mb-4 leading-relaxed">Manage patient prescriptions</p>
                <div className="text-sm font-semibold text-purple-600">45 prescriptions</div>
              </div>
            </Link>
          </div>

          {/* Upcoming Appointments Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black">Upcoming Appointments</h3>
            </div>
            {appointments.length === 0 ? (
              <div className="p-6">
                <p className="text-black">No upcoming appointments.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Patient</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.map((appt, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-black">{appt.patient || "John Doe"}</td>
                        <td className="px-6 py-4 text-sm text-black">{appt.date || "N/A"}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Today's Schedule */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Today's Schedule</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-black font-medium">Morning Clinic</p>
                    <p className="text-gray-500 text-sm">9:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-black font-medium">Video Consultations</p>
                    <p className="text-gray-500 text-sm">2:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-black font-medium">Evening Rounds</p>
                    <p className="text-gray-500 text-sm">5:00 PM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                Add New Patient
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Schedule Appointment
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Write Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
