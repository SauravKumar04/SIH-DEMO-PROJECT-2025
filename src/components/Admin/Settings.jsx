import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CogIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  ServerIcon,
  CircleStackIcon,
  ClockIcon,
  UserIcon
} from "@heroicons/react/24/outline";

export default function AdminSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  
  const [settings, setSettings] = useState({
    general: {
      siteName: "HealthConnect Pro",
      siteDescription: "Comprehensive Healthcare Management Platform",
      timezone: "UTC+05:30",
      language: "English",
      maintenanceMode: false
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      systemAlerts: true,
      appointmentReminders: true,
      emergencyAlerts: true
    },
    system: {
      maxConcurrentUsers: 1000,
      sessionTimeout: 30,
      autoBackup: true,
      backupInterval: "daily",
      debugMode: false,
      apiRateLimit: 100
    },
    integration: {
      paymentGateway: "enabled",
      emailService: "enabled",
      smsService: "disabled",
      analyticsTracking: true,
      thirdPartyIntegrations: true
    }
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const tabs = [
    { id: "general", name: "General", icon: CogIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "system", name: "System", icon: ServerIcon },
    { id: "integration", name: "Integration", icon: GlobeAltIcon }
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Platform Settings
            </h1>
            <p className="text-black text-lg font-medium">
              Configure system settings and preferences
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-black">Settings Categories</h3>
            </div>
            <div className="p-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 mb-2 ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg' 
                        : 'text-black hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            
            {/* General Settings */}
            {activeTab === "general" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <CogIcon className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-black">General Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => handleSettingChange("general", "siteName", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Site Description</label>
                    <textarea
                      value={settings.general.siteDescription}
                      onChange={(e) => handleSettingChange("general", "siteDescription", e.target.value)}
                      rows="3"
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Timezone</label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => handleSettingChange("general", "timezone", e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option>UTC+05:30</option>
                        <option>UTC+00:00</option>
                        <option>UTC-05:00</option>
                        <option>UTC+01:00</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Language</label>
                      <select
                        value={settings.general.language}
                        onChange={(e) => handleSettingChange("general", "language", e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-semibold text-black">Maintenance Mode</label>
                        <p className="text-sm text-gray-500">Temporarily disable site access for maintenance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.general.maintenanceMode}
                          onChange={(e) => handleSettingChange("general", "maintenanceMode", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <BellIcon className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-black">Notification Settings</h2>
                </div>
                
                <div className="space-y-6">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-black capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                        <p className="text-sm text-gray-500">
                          {key === 'emailNotifications' && 'Send email notifications to users'}
                          {key === 'smsNotifications' && 'Send SMS notifications to users'}
                          {key === 'pushNotifications' && 'Send push notifications to mobile apps'}
                          {key === 'systemAlerts' && 'System-wide alerts and announcements'}
                          {key === 'appointmentReminders' && 'Automatic appointment reminders'}
                          {key === 'emergencyAlerts' && 'Emergency and critical alerts'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleSettingChange("notifications", key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === "system" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ServerIcon className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-black">System Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Max Concurrent Users</label>
                      <input
                        type="number"
                        value={settings.system.maxConcurrentUsers}
                        onChange={(e) => handleSettingChange("system", "maxConcurrentUsers", parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={settings.system.sessionTimeout}
                        onChange={(e) => handleSettingChange("system", "sessionTimeout", parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Auto Backup Interval</label>
                    <select
                      value={settings.system.backupInterval}
                      onChange={(e) => handleSettingChange("system", "backupInterval", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-black">Auto Backup</h3>
                        <p className="text-sm text-gray-500">Automatically backup system data</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.system.autoBackup}
                          onChange={(e) => handleSettingChange("system", "autoBackup", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-black">Debug Mode</h3>
                        <p className="text-sm text-gray-500">Enable detailed error logging</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.system.debugMode}
                          onChange={(e) => handleSettingChange("system", "debugMode", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integration Settings */}
            {activeTab === "integration" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <GlobeAltIcon className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-black">Integration Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-black">Payment Gateway</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          settings.integration.paymentGateway === 'enabled' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {settings.integration.paymentGateway === 'enabled' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Stripe & PayPal integration for payments</p>
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Configure
                      </button>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-black">Email Service</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          settings.integration.emailService === 'enabled' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {settings.integration.emailService === 'enabled' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">SMTP configuration for email delivery</p>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-black">Analytics Tracking</h3>
                        <p className="text-sm text-gray-500">Google Analytics integration</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.integration.analyticsTracking}
                          onChange={(e) => handleSettingChange("integration", "analyticsTracking", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-black">Third-party Integrations</h3>
                        <p className="text-sm text-gray-500">Allow external API connections</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.integration.thirdPartyIntegrations}
                          onChange={(e) => handleSettingChange("integration", "thirdPartyIntegrations", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
