import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  KeyIcon,
  EyeIcon,
  LockClosedIcon,
  UserIcon,
  ClockIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

export default function AdminSecurity() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  const [securityMetrics, setSecurityMetrics] = useState({
    overallStatus: "secure",
    lastSecurityScan: "2 hours ago",
    activeThreats: 0,
    blockedAttempts: 24,
    secureConnections: 99.8,
    complianceScore: 98.5
  });

  const [loginAttempts, setLoginAttempts] = useState([
    { id: 1, ip: "192.168.1.100", time: "2 min ago", status: "success", user: "admin@healthcare.com" },
    { id: 2, ip: "45.123.67.89", time: "15 min ago", status: "blocked", user: "unknown" },
    { id: 3, ip: "192.168.1.101", time: "23 min ago", status: "success", user: "doctor@healthcare.com" },
    { id: 4, ip: "78.234.12.45", time: "35 min ago", status: "blocked", user: "unknown" },
    { id: 5, ip: "192.168.1.102", time: "1 hour ago", status: "success", user: "nurse@healthcare.com" }
  ]);

  const [securityPolicies, setSecurityPolicies] = useState({
    passwordPolicy: {
      enabled: true,
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpiry: 90
    },
    sessionPolicy: {
      maxSessionTime: 30,
      idleTimeout: 15,
      maxConcurrentSessions: 3,
      rememberMe: false
    },
    accessControl: {
      twoFactorAuth: true,
      ipWhitelisting: false,
      deviceRegistration: true,
      apiRateLimit: 100
    }
  });

  const [complianceChecks, setComplianceChecks] = useState([
    { name: "HIPAA Compliance", status: "compliant", description: "Healthcare data protection standards", lastCheck: "Today" },
    { name: "GDPR Compliance", status: "compliant", description: "European data privacy regulation", lastCheck: "Today" },
    { name: "SOC 2 Type II", status: "compliant", description: "Security, availability, and confidentiality", lastCheck: "Yesterday" },
    { name: "ISO 27001", status: "warning", description: "Information security management", lastCheck: "3 days ago" },
    { name: "PCI DSS", status: "compliant", description: "Payment card industry standards", lastCheck: "Today" }
  ]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const tabs = [
    { id: "overview", name: "Security Overview", icon: ShieldCheckIcon },
    { id: "access", name: "Access Control", icon: LockClosedIcon },
    { id: "monitoring", name: "Security Monitoring", icon: EyeIcon },
    { id: "compliance", name: "Compliance", icon: DocumentTextIcon }
  ];

  const handlePolicyUpdate = (category, policy, value) => {
    setSecurityPolicies(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [policy]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Security & Compliance
            </h1>
            <p className="text-black text-lg font-medium">
              Monitor security events and compliance status
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{securityMetrics.complianceScore}%</div>
              <div className="text-sm text-black">Compliance Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">{securityMetrics.activeThreats}</div>
              <div className="text-black font-medium">Active Threats</div>
            </div>
            <ShieldCheckIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-red-600">{securityMetrics.blockedAttempts}</div>
              <div className="text-black font-medium">Blocked Attempts</div>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-600">{securityMetrics.secureConnections}%</div>
              <div className="text-black font-medium">Secure Connections</div>
            </div>
            <LockClosedIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-600">{securityMetrics.complianceScore}%</div>
              <div className="text-black font-medium">Compliance</div>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-black">Security Sections</h3>
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
                        ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg' 
                        : 'text-black hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium text-sm">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            
            {/* Security Overview */}
            {activeTab === "overview" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheckIcon className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-black">Security Overview</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4">System Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-black">Firewall Status</span>
                        </div>
                        <span className="text-green-600 font-semibold">Active</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-black">SSL Certificate</span>
                        </div>
                        <span className="text-green-600 font-semibold">Valid</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="flex items-center gap-3">
                          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium text-black">Security Updates</span>
                        </div>
                        <span className="text-yellow-600 font-semibold">Available</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-black">Antivirus</span>
                        </div>
                        <span className="text-green-600 font-semibold">Up to Date</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4">Recent Security Events</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-black">Successful admin login</span>
                        </div>
                        <span className="text-xs text-gray-500">2 minutes ago</span>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium text-black">Blocked suspicious IP</span>
                        </div>
                        <span className="text-xs text-gray-500">15 minutes ago</span>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-black">Password policy updated</span>
                        </div>
                        <span className="text-xs text-gray-500">1 hour ago</span>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-black">Security scan completed</span>
                        </div>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Access Control */}
            {activeTab === "access" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <LockClosedIcon className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-black">Access Control Policies</h2>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4">Password Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Minimum Length</label>
                        <input
                          type="number"
                          value={securityPolicies.passwordPolicy.minLength}
                          onChange={(e) => handlePolicyUpdate("passwordPolicy", "minLength", parseInt(e.target.value))}
                          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Password Expiry (days)</label>
                        <input
                          type="number"
                          value={securityPolicies.passwordPolicy.passwordExpiry}
                          onChange={(e) => handlePolicyUpdate("passwordPolicy", "passwordExpiry", parseInt(e.target.value))}
                          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {["requireUppercase", "requireNumbers", "requireSpecialChars"].map((policy) => (
                        <div key={policy} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <span className="font-medium text-black capitalize">
                            {policy.replace(/([A-Z])/g, ' $1').replace('require', 'Require').trim()}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={securityPolicies.passwordPolicy[policy]}
                              onChange={(e) => handlePolicyUpdate("passwordPolicy", policy, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4">Session Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Max Session Time (minutes)</label>
                        <input
                          type="number"
                          value={securityPolicies.sessionPolicy.maxSessionTime}
                          onChange={(e) => handlePolicyUpdate("sessionPolicy", "maxSessionTime", parseInt(e.target.value))}
                          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Idle Timeout (minutes)</label>
                        <input
                          type="number"
                          value={securityPolicies.sessionPolicy.idleTimeout}
                          onChange={(e) => handlePolicyUpdate("sessionPolicy", "idleTimeout", parseInt(e.target.value))}
                          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Monitoring */}
            {activeTab === "monitoring" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <EyeIcon className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-black">Security Monitoring</h2>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Recent Login Attempts</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-black">IP Address</th>
                          <th className="text-left py-3 px-4 font-semibold text-black">User</th>
                          <th className="text-left py-3 px-4 font-semibold text-black">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-black">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginAttempts.map((attempt) => (
                          <tr key={attempt.id} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-black font-mono text-sm">{attempt.ip}</td>
                            <td className="py-3 px-4 text-black">{attempt.user}</td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                attempt.status === 'success' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {attempt.status === 'success' ? 'Success' : 'Blocked'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-500 text-sm">{attempt.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Compliance */}
            {activeTab === "compliance" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <DocumentTextIcon className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-black">Compliance Status</h2>
                </div>
                
                <div className="space-y-6">
                  {complianceChecks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        {check.status === 'compliant' ? (
                          <CheckCircleIcon className="w-8 h-8 text-green-500" />
                        ) : check.status === 'warning' ? (
                          <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
                        ) : (
                          <XCircleIcon className="w-8 h-8 text-red-500" />
                        )}
                        <div>
                          <h3 className="text-lg font-bold text-black">{check.name}</h3>
                          <p className="text-gray-600">{check.description}</p>
                          <p className="text-sm text-gray-500">Last checked: {check.lastCheck}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          check.status === 'compliant' 
                            ? 'bg-green-100 text-green-700' 
                            : check.status === 'warning' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {check.status === 'compliant' ? 'Compliant' : check.status === 'warning' ? 'Warning' : 'Non-Compliant'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-bold text-black mb-4">Compliance Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                      Generate Report
                    </button>
                    <button className="p-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                      Schedule Audit
                    </button>
                    <button className="p-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                      Download Certificate
                    </button>
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
