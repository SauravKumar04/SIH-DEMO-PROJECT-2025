import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  UserIcon, 
  ClipboardDocumentListIcon, 
  VideoCameraIcon, 
  HeartIcon, 
  BellIcon, 
  ChartBarIcon, 
  CogIcon, 
  StarIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [healthScore, setHealthScore] = useState(85);
  const [notifications, setNotifications] = useState(3);
  const [stats, setStats] = useState({
    upcomingAppointments: 3,
    healthRecords: 12,
    healthScore: 85,
    aiAvailability: "24/7"
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      navigate("/");
    } else {
      setUser(storedUser);
    }

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const dashboardCards = [
    {
      id: "appointments",
      title: "Appointments",
      description: "View & manage your appointments",
      icon: ClipboardDocumentListIcon,
      route: "/patient/appointments",
      gradient: "from-blue-500 to-purple-600",
      stats: "3 upcoming"
    },
    {
      id: "health-records",
      title: "Health Records",
      description: "Access your digital health history",
      icon: HeartIcon,
      route: "/patient/health-records",
      gradient: "from-red-500 to-pink-600",
      stats: "12 records"
    },
    {
      id: "medicine-tracker",
      title: "Medicine Availability",
      description: "Check medicine stock at nearby pharmacies",
      icon: BeakerIcon,
      route: "/patient/medicine-tracker",
      gradient: "from-green-500 to-emerald-600",
      stats: "15 pharmacies"
    },
    {
      id: "symptom-checker",
      title: "AI Health Assistant",
      description: "Get instant AI-powered health insights",
      icon: UserIcon,
      route: "/patient/ai-assistant",
      gradient: "from-emerald-500 to-teal-600",
      stats: "24/7 available"
    },
    {
      id: "video-consultation",
      title: "Video Consultation",
      description: "Connect with doctors instantly",
      icon: VideoCameraIcon,
      route: "/patient/video",
      gradient: "from-orange-500 to-red-600",
      stats: "Next: Today 3PM"
    }
  ];

  const recentActivities = [
    { type: "appointment", message: "Appointment scheduled with Dr. Smith", time: "2 hours ago" },
    { type: "record", message: "Blood test results uploaded", time: "1 day ago" },
    { type: "ai", message: "AI health check completed", time: "2 days ago" }
  ];

  const upcomingAppointments = [
    { doctor: "Dr. Smith", specialty: "Cardiology", time: "Today 3:00 PM", status: "Confirmed" },
    { doctor: "Dr. Johnson", specialty: "General", time: "Tomorrow 10:00 AM", status: "Pending" },
    { doctor: "Dr. Davis", specialty: "Dermatology", time: "Dec 15, 2:00 PM", status: "Confirmed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Patient Dashboard
            </h1>
            <p className="text-black text-lg font-medium">
              {getGreeting()}, {user?.email?.split("@")[0]}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{healthScore}</div>
              <div className="text-sm text-black">Health Score</div>
            </div>
            <div className="relative">
              <button className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all">
                <BellIcon className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.upcomingAppointments}</div>
              <div className="text-black font-medium">Upcoming Appointments</div>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.healthRecords}</div>
              <div className="text-black font-medium">Health Records</div>
            </div>
            <HeartIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">{stats.healthScore}</div>
              <div className="text-black font-medium">Health Score</div>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.aiAvailability}</div>
              <div className="text-black font-medium">AI Assistant</div>
            </div>
            <UserIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dashboard Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-black mb-6">Health Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {dashboardCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Link
                  key={card.id}
                  to={card.route}
                  className="group block"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3">{card.title}</h3>
                    <p className="text-black mb-4 leading-relaxed">{card.description}</p>
                    <div className="text-sm font-semibold text-blue-600">{card.stats}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black">Upcoming Appointments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Doctor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Specialty</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {upcomingAppointments.map((appt, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-black">{appt.doctor}</td>
                      <td className="px-6 py-4 text-sm text-black">{appt.specialty}</td>
                      <td className="px-6 py-4 text-sm text-black">{appt.time}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Health Score Widget */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Health Overview</h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-black">{healthScore}</div>
                  <div className="text-black font-medium">Health Score</div>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200"/>
                    <circle 
                      cx="32" 
                      cy="32" 
                      r="24" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="transparent" 
                      strokeLinecap="round"
                      className="text-green-500"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - healthScore / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ChartBarIcon className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(healthScore/20) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-emerald-600 text-sm font-bold ml-2">Excellent</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Recent Activities</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {recentActivities.map((activity, index) => (
                <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
                      activity.type === 'appointment' ? 'bg-blue-500' :
                      activity.type === 'record' ? 'bg-green-500' : 'bg-purple-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-black font-medium">{activity.message}</p>
                      <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Book Appointment
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Check Symptoms
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                View Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
