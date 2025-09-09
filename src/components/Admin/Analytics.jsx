import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, EyeIcon, UserGroupIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalUsers: 1250,
    activeUsers: 890,
    appointments: 2341,
    revenue: 45600,
    growthRate: 12.5,
    userRetention: 87.3,
    avgSessionTime: "8m 42s",
    bounceRate: 23.1
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const chartData = [
    { month: 'Jan', users: 150, appointments: 320 },
    { month: 'Feb', users: 180, appointments: 410 },
    { month: 'Mar', users: 220, appointments: 520 },
    { month: 'Apr', users: 280, appointments: 640 },
    { month: 'May', users: 350, appointments: 780 },
    { month: 'Jun', users: 420, appointments: 920 }
  ];

  const topMetrics = [
    { name: 'Total Revenue', value: '$45,600', change: '+12.5%', trend: 'up', color: 'emerald' },
    { name: 'Active Users', value: '890', change: '+8.3%', trend: 'up', color: 'blue' },
    { name: 'Appointments', value: '2,341', change: '+15.2%', trend: 'up', color: 'purple' },
    { name: 'Bounce Rate', value: '23.1%', change: '-4.1%', trend: 'down', color: 'red' }
  ];

  const userEngagement = [
    { metric: 'Page Views', value: '15,642', change: '+5.4%' },
    { metric: 'Session Duration', value: '8m 42s', change: '+12.3%' },
    { metric: 'Return Visitors', value: '67.8%', change: '+3.1%' },
    { metric: 'User Retention', value: '87.3%', change: '+2.7%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              System Analytics
            </h1>
            <p className="text-black text-lg font-medium">
              Platform performance and usage statistics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{analytics.growthRate}%</div>
              <div className="text-sm text-black">Growth Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {topMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-black">{metric.value}</div>
                <div className="text-black font-medium">{metric.name}</div>
              </div>
              <ChartBarIcon className={`w-8 h-8 text-${metric.color}-500`} />
            </div>
            <div className="flex items-center gap-2">
              {metric.trend === 'up' ? (
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-semibold ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Usage Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <ChartBarIcon className="w-6 h-6 text-blue-500" />
                Growth Trends
              </h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-black">Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-black">Appointments</span>
                </div>
              </div>
            </div>
            
            {/* Simple Chart Representation */}
            <div className="h-64 w-full overflow-hidden">
              <div className="h-full flex items-end justify-between gap-2 px-2">
                {chartData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 max-w-[60px]">
                    <div className="w-full flex flex-col gap-1 items-center">
                      <div 
                        className="bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 w-full max-w-[25px]"
                        style={{ height: `${Math.max((data.users / 500) * 200, 20)}px` }}
                      ></div>
                      <div 
                        className="bg-purple-500 rounded-t-lg transition-all duration-500 hover:bg-purple-600 w-full max-w-[25px]"
                        style={{ height: `${Math.max((data.appointments / 1000) * 200, 20)}px` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-black text-center">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Engagement */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <EyeIcon className="w-6 h-6 text-green-500" />
                User Engagement Metrics
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userEngagement.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-lg font-bold text-black">{item.value}</div>
                      <div className="text-sm text-black font-medium">{item.metric}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-600">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Real-time Stats */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Real-time Stats</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">127</div>
                  <div className="text-sm text-black font-medium">Users Online</div>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600">Live</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-black font-medium">Active Sessions</span>
                      <span className="text-lg font-bold text-blue-600">89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black font-medium">New Signups Today</span>
                      <span className="text-lg font-bold text-purple-600">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black font-medium">Appointments Today</span>
                      <span className="text-lg font-bold text-green-600">34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Pages */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Top Pages</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
              <div className="space-y-3">
                {[
                  { page: '/dashboard', views: 1245, percentage: 35 },
                  { page: '/appointments', views: 892, percentage: 25 },
                  { page: '/profile', views: 654, percentage: 18 },
                  { page: '/health-records', views: 387, percentage: 12 },
                  { page: '/video-call', views: 234, percentage: 10 }
                ].map((page, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-black">{page.page}</span>
                      <span className="text-sm text-gray-500">{page.views}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${page.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Generate Report
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                Export Data
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Schedule Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
