import { Link } from "react-router-dom";
import { 
  HeartIcon, 
  UserGroupIcon, 
  VideoCameraIcon, 
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  StarIcon,
  CheckCircleIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  UserIcon,
  BeakerIcon,
  PhoneIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  GlobeAltIcon,
  SignalIcon,
  LanguageIcon
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const problemStats = [
    { number: "173", label: "Villages in Need", icon: MapPinIcon },
    { number: "11", label: "Available Doctors", icon: UserIcon },
    { number: "2hr+", label: "Travel Time to Hospital", icon: ClockIcon },
    { number: "₹500+", label: "Lost Daily Wages", icon: CurrencyRupeeIcon }
  ];

  const solutionFeatures = [
    {
      icon: VideoCameraIcon,
      title: "Video Consultation in Local Language",
      description: "Connect instantly with certified doctors in Punjabi, Hindi, or English. No need to travel to the city.",
      gradient: "from-blue-500 to-indigo-600",
      benefits: ["Save 2+ hours travel", "Consult in native language", "Available 24/7"]
    },
    {
      icon: ClipboardDocumentListIcon,
      title: "Digital Health Records (Offline Access)",
      description: "Your complete medical history stored securely and accessible even without internet connection.",
      gradient: "from-green-500 to-emerald-600",
      benefits: ["Works offline", "Always accessible", "Secure storage"]
    },
    {
      icon: BuildingStorefrontIcon,
      title: "Real-time Medicine Availability",
      description: "Check medicine stock across nearby pharmacies and get delivery updates in real-time.",
      gradient: "from-purple-500 to-violet-600",
      benefits: ["Live stock updates", "Home delivery", "Price comparison"]
    },
    {
      icon: HeartIcon,
      title: "AI Symptom Checker (Low Bandwidth)",
      description: "Get preliminary health insights that work even in areas with poor internet connectivity.",
      gradient: "from-red-500 to-pink-600",
      benefits: ["Works on 2G", "Instant results", "Multilingual support"]
    }
  ];

  const beneficiaries = [
    {
      type: "Daily-Wage Workers",
      problem: "Can't afford to lose a day's income for hospital visits",
      solution: "Video consultations save time & money",
      icon: UserIcon,
      savings: "₹500+ per visit",
      color: "from-blue-500 to-blue-600"
    },
    {
      type: "Farmers",
      problem: "Can't leave fields unattended during critical seasons",
      solution: "Get medical care without leaving home",
      icon: HeartIcon,
      savings: "Zero travel time",
      color: "from-green-500 to-green-600"
    },
    {
      type: "Doctors",
      problem: "Overwhelmed with patients in city hospitals",
      solution: "Manage rural patients remotely, reduce workload",
      icon: UserGroupIcon,
      savings: "30% more efficiency",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const appFlowSteps = [
    {
      step: "1",
      title: "Patient Books",
      description: "Patient uses app to book consultation or check symptoms",
      icon: DevicePhoneMobileIcon,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "2", 
      title: "Doctor Consults",
      description: "Doctor provides consultation via video call in local language",
      icon: VideoCameraIcon,
      color: "from-green-500 to-green-600"
    },
    {
      step: "3",
      title: "Prescription Sent",
      description: "Digital prescription automatically sent to nearest pharmacy",
      icon: ClipboardDocumentListIcon,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "4",
      title: "Medicine Delivered",
      description: "Pharmacy processes order and delivers medicine to patient's village",
      icon: TruckIcon,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const userTypes = [
    {
      type: "Patient",
      description: "Book consultations, manage health records, get medicines delivered",
      route: "/login/patient",
      icon: HeartIcon,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      features: ["Video Consultations", "Health Records", "Symptom Checker"]
    },
    {
      type: "Doctor", 
      description: "Conduct remote consultations, manage rural patients efficiently",
      route: "/login/doctor",
      icon: UserGroupIcon,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      features: ["Video Calls", "Patient Management", "Digital Prescriptions"]
    },
    {
      type: "Pharmacy",
      description: "Process prescriptions, manage inventory, deliver medicines",
      route: "/login/pharmacy", 
      icon: BuildingStorefrontIcon,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      features: ["Inventory Management", "Order Processing", "Delivery Tracking"]
    },
    {
      type: "Admin",
      description: "Monitor system health, manage users, view analytics",
      route: "/login/admin",
      icon: ShieldCheckIcon,
      gradient: "from-orange-500 to-red-600", 
      bgGradient: "from-orange-50 to-red-50",
      features: ["System Analytics", "User Management", "Security Control"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-full blur-3xl animate-float-delay"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            {/* Main Hero Content */}
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                🏥 SIH 2025 • Healthcare Innovation for Rural Punjab
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-none">
              Connecting Villages to{" "}
              <span className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Doctors,
              </span>
              <br />
              <span className="text-4xl lg:text-6xl">Anytime, Anywhere</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
              Revolutionizing healthcare access for <strong>173 villages</strong> in Rural Punjab through 
              AI-powered telemedicine, offline health records, and real-time medicine delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/login/patient"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <VideoCameraIcon className="w-6 h-6" />
                  <span>Consult a Doctor</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/login/patient"
                className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <HeartIcon className="w-6 h-6" />
                  <span>Check Symptoms</span>
                </span>
              </Link>
              <Link
                to="/login/patient"
                className="group px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-900 font-bold rounded-xl text-lg border-2 border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <ClipboardDocumentListIcon className="w-6 h-6" />
                  <span>View Health Records</span>
                </span>
              </Link>
            </div>

            {/* Hero Illustration Placeholder */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 border border-blue-200 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <UserIcon className="w-12 h-12 text-white" />
                  </div>
                  <p className="font-semibold text-gray-700">Village Patient</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <VideoCameraIcon className="w-16 h-16 text-blue-600 animate-pulse" />
                  <div className="flex-1 border-t-2 border-dashed border-blue-400 mx-4"></div>
                  <ComputerDesktopIcon className="w-16 h-16 text-green-600 animate-pulse" />
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <UserGroupIcon className="w-12 h-12 text-white" />
                  </div>
                  <p className="font-semibold text-gray-700">City Doctor</p>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 font-medium">🎥 Video consultation connecting rural patients with expert doctors</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem & Solution Highlights */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Problem Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-6">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span className="font-semibold">The Problem</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Rural Punjab's Healthcare Crisis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Limited access to quality healthcare is forcing villagers to travel hours and lose daily wages for basic medical consultations.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {problemStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Solution Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <LightBulbIcon className="w-5 h-5" />
              <span className="font-semibold">Our Solution</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Telemedicine That Actually Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              A comprehensive platform designed specifically for rural healthcare challenges with offline capabilities and local language support.
            </p>
          </div>
        </div>
      </div>

      {/* Core Features Showcase */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Powerful Features for Rural Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature designed with rural Punjab's unique challenges in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{feature.description}</p>
                    
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Beneficiary Impact Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Real Impact on Real Lives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our platform transforms healthcare access for different communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beneficiaries.map((beneficiary, index) => {
              const IconComponent = beneficiary.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-gray-100 hover:border-gray-300 transition-all duration-300 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${beneficiary.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{beneficiary.type}</h3>
                    
                    <div className="mb-6">
                      <div className="flex items-start space-x-2 mb-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-600">{beneficiary.problem}</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 font-medium">{beneficiary.solution}</p>
                      </div>
                    </div>
                    
                    <div className={`bg-gradient-to-r ${beneficiary.color} bg-opacity-10 rounded-xl p-4`}>
                      <div className="text-center">
                        <div className="text-2xl font-black text-gray-900">{beneficiary.savings}</div>
                        <div className="text-sm text-gray-600 font-medium">Average Savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* App Flow Preview */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              How It Works - Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From consultation to medicine delivery - everything streamlined for rural healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {appFlowSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative group">
                  {/* Connecting Line */}
                  {index < appFlowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0"></div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                      <div className={`inline-block w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm mb-3`}>
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demo CTA */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience the Platform?</h3>
              <p className="text-gray-600 mb-6">Try our demo with real-world scenarios designed for rural healthcare</p>
              <Link
                to="#login-section"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                <PlayCircleIcon className="w-5 h-5" />
                <span>Start Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div id="login-section" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access tailored dashboards designed for your specific healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userTypes.map((user, index) => {
              const IconComponent = user.icon;
              return (
                <Link
                  key={index}
                  to={user.route}
                  className="group transform transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`relative overflow-hidden bg-gradient-to-br ${user.bgGradient} rounded-3xl p-8 border-2 border-white shadow-lg group-hover:shadow-2xl transition-all duration-500`}>
                    {/* Background Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${user.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-r ${user.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800">
                        {user.type}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700">
                        {user.description}
                      </p>
                      
                      {/* Features List */}
                      <div className="space-y-2 mb-6">
                        {user.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${user.gradient} text-white font-semibold rounded-xl text-sm group-hover:shadow-lg transition-all duration-300`}>
                        <span>Access Portal</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Ready to Transform Rural Healthcare?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join us in making quality healthcare accessible to every village in Punjab
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login/patient"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start as Patient
            </Link>
            <Link
              to="/login/doctor"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Join as Doctor
            </Link>
          </div>
          
          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-2">
              <GlobeAltIcon className="w-6 h-6 text-blue-500" />
              <span className="text-gray-700 font-medium">Available in 3 Languages</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <SignalIcon className="w-6 h-6 text-green-500" />
              <span className="text-gray-700 font-medium">Works on 2G Networks</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ShieldCheckIcon className="w-6 h-6 text-purple-500" />
              <span className="text-gray-700 font-medium">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
