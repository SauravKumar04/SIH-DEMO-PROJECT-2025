import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDaysIcon, ClockIcon, UserIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Appointments() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      navigate("/");
    } else {
      setUser(storedUser);
      // Load stored appointments
      const storedAppts = JSON.parse(
        localStorage.getItem(`appointments_${storedUser.email}`) || "[]"
      );
      setAppointments(storedAppts);
    }
  }, [navigate]);

  const addAppointment = () => {
    if (!doctorName || !date) return;
    const newAppointment = { doctor: doctorName, date, status: 'Scheduled' };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem(
      `appointments_${user.email}`,
      JSON.stringify(updatedAppointments)
    );
    setDoctorName("");
    setDate("");
  };

  const cancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem(
      `appointments_${user.email}`,
      JSON.stringify(updatedAppointments)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              My Appointments
            </h1>
            <p className="text-black text-lg font-medium">
              Manage your medical appointments
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Add New Appointment */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <PlusIcon className="w-6 h-6 text-emerald-500" />
              Book New Appointment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-black font-medium mb-2">Doctor Name</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter doctor's name"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={addAppointment}
              className="mt-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Book Appointment
            </button>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <CalendarDaysIcon className="w-6 h-6 text-blue-500" />
                Your Appointments
              </h3>
            </div>
            {appointments.length === 0 ? (
              <div className="p-8 text-center">
                <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-black text-lg font-medium mb-2">No appointments scheduled</p>
                <p className="text-gray-500">Book your first appointment above</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {appointments.map((appointment, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-black">Dr. {appointment.doctor}</h4>
                          <p className="text-gray-500 flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            {new Date(appointment.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {appointment.status || 'Scheduled'}
                        </span>
                        <button
                          onClick={() => cancelAppointment(index)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                        >
                          Cancel
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
          {/* Quick Stats */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Quick Stats</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Total Appointments</span>
                  <span className="text-2xl font-bold text-emerald-600">{appointments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">This Month</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {appointments.filter(apt => new Date(apt.date).getMonth() === new Date().getMonth()).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Upcoming</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {appointments.filter(apt => new Date(apt.date) > new Date()).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                Emergency Booking
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                View Doctors
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Medical History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
