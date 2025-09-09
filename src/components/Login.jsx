import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  UserIcon, 
  LockClosedIcon, 
  HeartIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  BuildingStorefrontIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();
  const { userType } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAnimating(false), 500);
  }, []);

  const userConfigs = {
    patient: {
      title: "Patient Portal",
      subtitle: "Your health journey starts here",
      icon: HeartIcon,
      gradient: "from-blue-500 via-indigo-600 to-purple-700",
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
      cardGradient: "from-blue-500/10 to-purple-600/10",
      borderColor: "border-blue-200",
      focusColor: "focus:ring-blue-500",
      credentials: {
        email: "patient@healthcare.com",
        password: "patient123"
      },
      features: ["Book Appointments", "Track Health Records", "Video Consultations"],
      dashboardRoute: "/patient/dashboard"
    },
    doctor: {
      title: "Doctor Portal",
      subtitle: "Empowering healthcare professionals",
      icon: UserGroupIcon,
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
      cardGradient: "from-emerald-500/10 to-cyan-600/10",
      borderColor: "border-emerald-200",
      focusColor: "focus:ring-emerald-500",
      credentials: {
        email: "doctor@healthcare.com",
        password: "doctor123"
      },
      features: ["Manage Patients", "Write Prescriptions", "Schedule Consultations"],
      dashboardRoute: "/doctor/dashboard"
    },
    admin: {
      title: "Admin Portal",
      subtitle: "System management & control",
      icon: ShieldCheckIcon,
      gradient: "from-orange-500 via-red-600 to-pink-700",
      bgGradient: "from-orange-50 via-red-50 to-pink-50",
      cardGradient: "from-orange-500/10 to-pink-600/10",
      borderColor: "border-orange-200",
      focusColor: "focus:ring-orange-500",
      credentials: {
        email: "admin@healthcare.com",
        password: "admin123"
      },
      features: ["User Management", "System Analytics", "Security Control"],
      dashboardRoute: "/admin/dashboard"
    },
    pharmacy: {
      title: "Pharmacy Portal",
      subtitle: "Medicine management made easy",
      icon: BuildingStorefrontIcon,
      gradient: "from-violet-500 via-purple-600 to-fuchsia-700",
      bgGradient: "from-violet-50 via-purple-50 to-fuchsia-50",
      cardGradient: "from-violet-500/10 to-fuchsia-600/10",
      borderColor: "border-violet-200",
      focusColor: "focus:ring-violet-500",
      credentials: {
        email: "pharmacy@healthcare.com",
        password: "pharmacy123"
      },
      features: ["Inventory Management", "Order Processing", "Delivery Tracking"],
      dashboardRoute: "/pharmacy/dashboard"
    }
  };

  const config = userConfigs[userType] || userConfigs.patient;
  const IconComponent = config.icon;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Demo authentication
    if (email === config.credentials.email && password === config.credentials.password) {
      localStorage.setItem("user", JSON.stringify({ 
        email, 
        role: userType,
        loginTime: new Date().toISOString(),
        name: userType.charAt(0).toUpperCase() + userType.slice(1) + " User"
      }));
      
      setIsLoading(false);
      navigate(config.dashboardRoute);
    } else {
      setIsLoading(false);
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  const handleQuickLogin = () => {
    setEmail(config.credentials.email);
    setPassword(config.credentials.password);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${config.bgGradient} relative overflow-hidden py-12 px-4`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-white/20 to-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-white/15 to-white/5 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-radial from-white/10 to-transparent rounded-full animate-pulse-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-white/5" style={{
            backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className={`relative z-10 w-full max-w-4xl transform transition-all duration-700 ${isAnimating ? 'scale-95 opacity-0 translate-y-8' : 'scale-100 opacity-100 translate-y-0'}`}>
        
        {/* Glassmorphism Card */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Side - Header/Info Section */}
            <div className={`relative lg:w-2/5 p-8 bg-gradient-to-br ${config.cardGradient} border-b lg:border-b-0 lg:border-r border-white/10`}>
              {/* Back Button */}
              <Link 
                to="/" 
                className="absolute top-6 left-6 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 group"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
              </Link>

              {/* Icon & Title */}
              <div className="text-center pt-8">
                <div className={`relative w-24 h-24 bg-gradient-to-r ${config.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500`}>
                  <IconComponent className="w-12 h-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 text-white animate-pulse" />
                  </div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3 tracking-tight">
                  {config.title}
                </h1>
                <p className="text-gray-600 font-medium text-lg mb-6">
                  {config.subtitle}
                </p>
                
                {/* Features */}
                <div className="space-y-3 mb-8">
                  {config.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 text-left bg-white/50 p-3 rounded-xl border border-white/20"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Demo Credentials Card */}
                <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl shadow-inner">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-amber-800 mb-3 flex items-center justify-center space-x-2">
                      <SparklesIcon className="w-4 h-4" />
                      <span>Demo Credentials</span>
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-mono font-bold text-amber-900 bg-white/50 px-3 py-2 rounded-lg">
                        📧 {config.credentials.email}
                      </p>
                      <p className="text-sm font-mono font-bold text-amber-900 bg-white/50 px-3 py-2 rounded-lg">
                        🔐 {config.credentials.password}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="lg:w-3/5 p-8">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Please sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  
                  {/* Email Input */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none ${config.focusColor} focus:border-transparent transition-all duration-300 font-medium placeholder-gray-400 group-hover:border-gray-300`}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none ${config.focusColor} focus:border-transparent transition-all duration-300 font-medium placeholder-gray-400 group-hover:border-gray-300`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Success Message (when loading) */}
                  {isLoading && (
                    <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <p className="text-green-700 text-sm font-medium">Authenticating... Please wait</p>
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`relative w-full py-4 bg-gradient-to-r ${config.gradient} text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center space-x-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to {userType.charAt(0).toUpperCase() + userType.slice(1)} Portal</span>
                          <SparklesIcon className="w-5 h-5" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Quick Login Button */}
                <div className="mt-6">
                  <button
                    onClick={handleQuickLogin}
                    className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 border border-gray-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    🚀 Quick Demo Login
                  </button>
                </div>

                {/* Other Portals */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 text-center mb-4">
                    Switch Portal
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(userConfigs)
                      .filter(([type]) => type !== userType)
                      .map(([type, typeConfig]) => {
                        const TypeIcon = typeConfig.icon;
                        return (
                          <Link
                            key={type}
                            to={`/login/${type}`}
                            className="flex flex-col items-center space-y-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-gray-300"
                          >
                            <TypeIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                            <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 capitalize text-center">
                              {type}
                            </span>
                          </Link>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2025 MediConnect • Secure Healthcare Platform
          </p>
        </div>
      </div>
    </div>
  );
}
