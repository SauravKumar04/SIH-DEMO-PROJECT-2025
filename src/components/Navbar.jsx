import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowRightOnRectangleIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setIsUserMenuOpen(false);
  };

  const getDashboardRoute = (role) => {
    return `/${role}/dashboard`;
  };

  const getRoleDetails = (role) => {
    switch (role) {
      case 'patient': 
        return { 
          color: 'from-blue-500 to-indigo-600', 
          bg: 'bg-blue-50', 
          text: 'text-blue-600',
          icon: HeartIcon,
          title: 'Patient Portal'
        };
      case 'doctor': 
        return { 
          color: 'from-emerald-500 to-teal-600', 
          bg: 'bg-emerald-50', 
          text: 'text-emerald-600',
          icon: UserIcon,
          title: 'Doctor Portal'
        };
      case 'admin': 
        return { 
          color: 'from-orange-500 to-red-600', 
          bg: 'bg-orange-50', 
          text: 'text-orange-600',
          icon: ShieldCheckIcon,
          title: 'Admin Portal'
        };
      case 'pharmacy': 
        return { 
          color: 'from-violet-500 to-purple-600', 
          bg: 'bg-violet-50', 
          text: 'text-violet-600',
          icon: BuildingStorefrontIcon,
          title: 'Pharmacy Portal'
        };
      default: 
        return { 
          color: 'from-gray-500 to-gray-600', 
          bg: 'bg-gray-50', 
          text: 'text-gray-600',
          icon: UserIcon,
          title: 'Portal'
        };
    }
  };

  const loginOptions = [
    { role: 'patient', name: 'Patient Login', icon: HeartIcon, color: 'text-blue-600 hover:text-blue-800', desc: 'Book appointments & manage health' },
    { role: 'doctor', name: 'Doctor Login', icon: UserIcon, color: 'text-emerald-600 hover:text-emerald-800', desc: 'Manage patients & consultations' },
    { role: 'admin', name: 'Admin Login', icon: ShieldCheckIcon, color: 'text-orange-600 hover:text-orange-800', desc: 'System administration' },
    { role: 'pharmacy', name: 'Pharmacy Login', icon: BuildingStorefrontIcon, color: 'text-violet-600 hover:text-violet-800', desc: 'Manage inventory & orders' }
  ];

  const roleDetails = user ? getRoleDetails(user.role) : null;
  const RoleIcon = roleDetails?.icon || UserIcon;

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-100'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
                  MediConnect
                </h1>
                <p className="text-xs text-gray-500 font-medium -mt-1">Healthcare Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {!user ? (
                <>
                  {/* Login Options */}
                  <div className="flex items-center space-x-6">
                    {loginOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <Link
                          key={option.role}
                          to={`/login/${option.role}`}
                          className="group flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300"
                        >
                          <IconComponent className={`w-5 h-5 ${option.color} transition-colors`} />
                          <span className={`font-semibold ${option.color} transition-colors`}>
                            {option.name.replace(' Login', '')}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  {/* User Info & Dashboard Link */}
                  <Link
                    to={getDashboardRoute(user.role)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-xl hover:${roleDetails.bg} transition-all duration-300 group`}
                  >
                    <HomeIcon className={`w-5 h-5 ${roleDetails.text} group-hover:scale-110 transition-transform`} />
                    <span className={`font-semibold ${roleDetails.text}`}>Dashboard</span>
                  </Link>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center space-x-3 bg-gradient-to-r ${roleDetails.color} rounded-xl px-4 py-2 text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
                    >
                      <RoleIcon className="w-5 h-5" />
                      <span className="font-semibold">{roleDetails.title}</span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">Signed in as</p>
                          <p className={`text-sm ${roleDetails.text} font-medium`}>
                            {user.email}
                          </p>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to={getDashboardRoute(user.role)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <HomeIcon className="w-4 h-4 mr-3" />
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {!user ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Login Options</h3>
                  {loginOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <Link
                        key={option.role}
                        to={`/login/${option.role}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                      >
                        <div className={`p-2 rounded-xl ${option.color.includes('blue') ? 'bg-blue-50' : 
                          option.color.includes('emerald') ? 'bg-emerald-50' :
                          option.color.includes('orange') ? 'bg-orange-50' : 'bg-violet-50'}`}>
                          <IconComponent className={`w-6 h-6 ${option.color.split(' ')[0]}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{option.name}</p>
                          <p className="text-sm text-gray-500">{option.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${roleDetails.bg} border border-gray-200`}>
                    <div className="flex items-center space-x-3">
                      <RoleIcon className={`w-8 h-8 ${roleDetails.text}`} />
                      <div>
                        <p className="font-semibold text-gray-900">{roleDetails.title}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to={getDashboardRoute(user.role)}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors w-full"
                    >
                      <HomeIcon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Dashboard</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-600">Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}
