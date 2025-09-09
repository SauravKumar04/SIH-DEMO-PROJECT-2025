import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  CogIcon, 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeUsers: 890,
    systemHealth: 99.9,
    pendingApprovals: 5
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/");
    } else {
      setAdmin(storedUser);
    }
  }, [navigate]);

  const adminCards = [
    {
      title: "User Management",
      description: "Manage patients, doctors, and pharmacy accounts",
      icon: UserGroupIcon,
      route: "/admin/users",
      gradient: "from-blue-500 to-blue-600",
      stats: "1,250 users"
    },
    {
      title: "System Analytics",
      description: "Monitor platform performance and usage statistics",
      icon: ChartBarIcon,
      route: "/admin/analytics",
      gradient: "from-green-500 to-emerald-600",
      stats: "99.9% uptime"
    },
    {
      title: "Platform Settings",
      description: "Configure system settings and preferences",
      icon: CogIcon,
      route: "/admin/settings",
      gradient: "from-purple-500 to-violet-600",
      stats: "Latest v2.1"
    },
    {
      title: "Security & Compliance",
      description: "Monitor security events and compliance status",
      icon: ShieldCheckIcon,
      route: "/admin/security",
      gradient: "from-orange-500 to-red-600",
      stats: "All secure"
    }
  ];

  const recentAlerts = [
    { type: "info", message: "System backup completed successfully", time: "2 hours ago" },
    { type: "warning", message: "High server load detected", time: "4 hours ago" },
    { type: "success", message: "New doctor account approved", time: "6 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-black text-lg font-medium">
              Welcome back, {admin?.email?.split("@")[0]}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{stats.systemHealth}%</div>
              <div className="text-sm text-black">System Health</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.totalUsers}</div>
              <div className="text-black font-medium">Total Users</div>
            </div>
            <UserGroupIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.activeUsers}</div>
              <div className="text-black font-medium">Active Users</div>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.systemHealth}%</div>
              <div className="text-black font-medium">System Health</div>
            </div>
            <ChartBarIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.pendingApprovals}</div>
              <div className="text-black font-medium">Pending Approvals</div>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Admin Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-black mb-6">Administrative Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Link
                  key={index}
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
        </div>

        {/* Sidebar */}
        <div>
          {/* System Overview */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">System Overview</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Server Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Database</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Backup Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Last Update</span>
                  <span className="text-gray-500 text-sm">2 min ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Recent Alerts</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
                      alert.type === 'success' ? 'bg-green-500' :
                      alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-black font-medium text-sm">{alert.message}</p>
                      <p className="text-gray-500 text-xs mt-1">{alert.time}</p>
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
                Add New User
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                Generate Report
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                System Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
