import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDaysIcon, ClockIcon, UserIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function DoctorAppointments() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "doctor") {
      navigate("/");
    } else {
      setUser(storedUser);
      // Load all patient appointments for demo
      const allAppointments = JSON.parse(localStorage.getItem("allAppointments") || "[]");
      setAppointments(allAppointments);
    }
  }, [navigate]);

  const updateAppointmentStatus = (index, status) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index].status = status;
    setAppointments(updatedAppointments);
    localStorage.setItem("allAppointments", JSON.stringify(updatedAppointments));
  };

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  });

  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const today = new Date();
    return aptDate > today;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Appointments Management
            </h1>
            <p className="text-black text-lg font-medium">
              Manage patient appointments and consultations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{todayAppointments.length}</div>
              <div className="text-sm text-black">Today's Appointments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{appointments.length}</div>
              <div className="text-black font-medium">Total Appointments</div>
            </div>
            <CalendarDaysIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{todayAppointments.length}</div>
              <div className="text-black font-medium">Today</div>
            </div>
            <ClockIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{upcomingAppointments.length}</div>
              <div className="text-black font-medium">Upcoming</div>
            </div>
            <UserIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">
                {appointments.filter(apt => apt.status === 'Completed').length}
              </div>
              <div className="text-black font-medium">Completed</div>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Today's Appointments */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <ClockIcon className="w-6 h-6 text-green-500" />
                Today's Appointments
              </h3>
            </div>
            {todayAppointments.length === 0 ? (
              <div className="p-8 text-center">
                <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-black text-lg font-medium mb-2">No appointments today</p>
                <p className="text-gray-500">Enjoy your free day!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {todayAppointments.map((appointment, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-black">{appointment.patient || 'John Doe'}</h4>
                          <p className="text-gray-500 flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            {new Date(appointment.date).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          appointment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          appointment.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status || 'Pending'}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateAppointmentStatus(appointments.indexOf(appointment), 'Completed')}
                            className="px-3 py-1 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointments.indexOf(appointment), 'Cancelled')}
                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All Appointments */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <CalendarDaysIcon className="w-6 h-6 text-blue-500" />
                All Appointments
              </h3>
            </div>
            {appointments.length === 0 ? (
              <div className="p-8 text-center">
                <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-black text-lg font-medium mb-2">No appointments found</p>
                <p className="text-gray-500">Appointments will appear here when patients book with you</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Patient</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.map((appointment, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-black">
                          {appointment.patient || 'John Doe'}
                        </td>
                        <td className="px-6 py-4 text-sm text-black">
                          {new Date(appointment.date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateAppointmentStatus(index, 'Completed')}
                              className="text-green-600 hover:text-green-800 font-medium"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(index, 'Cancelled')}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Cancel
                            </button>
                          </div>
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
          {/* Schedule Overview */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Schedule Overview</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Morning Slots</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {todayAppointments.filter(apt => new Date(apt.date).getHours() < 12).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Afternoon Slots</span>
                  <span className="text-2xl font-bold text-green-600">
                    {todayAppointments.filter(apt => new Date(apt.date).getHours() >= 12 && new Date(apt.date).getHours() < 18).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Evening Slots</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {todayAppointments.filter(apt => new Date(apt.date).getHours() >= 18).length}
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
                Add New Patient
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Block Time Slot
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
