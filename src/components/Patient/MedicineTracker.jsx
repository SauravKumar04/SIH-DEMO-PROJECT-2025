import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BeakerIcon, 
  MagnifyingGlassIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

export default function MedicineTracker() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for prescribed medicines
  const [prescribedMedicines] = useState([
    { id: 1, name: "Paracetamol 500mg", dosage: "500mg", frequency: "3 times daily", prescribed: "2024-12-10", doctor: "Dr. Smith" },
    { id: 2, name: "Amoxicillin 250mg", dosage: "250mg", frequency: "2 times daily", prescribed: "2024-12-08", doctor: "Dr. Johnson" },
    { id: 3, name: "Metformin 500mg", dosage: "500mg", frequency: "2 times daily", prescribed: "2024-12-05", doctor: "Dr. Davis" },
    { id: 4, name: "Atorvastatin 10mg", dosage: "10mg", frequency: "Once daily", prescribed: "2024-12-01", doctor: "Dr. Wilson" }
  ]);

  // Mock data for pharmacy availability
  const [pharmacyData] = useState([
    {
      id: 1,
      name: "HealthCare Pharmacy",
      address: "Village Khanna, Punjab",
      distance: "2.3 km",
      phone: "+91 98765 43210",
      rating: 4.5,
      availability: {
        "Paracetamol 500mg": { available: true, stock: 45, price: 25 },
        "Amoxicillin 250mg": { available: true, stock: 12, price: 120 },
        "Metformin 500mg": { available: false, stock: 0, price: 85 },
        "Atorvastatin 10mg": { available: true, stock: 8, price: 180 }
      }
    },
    {
      id: 2,
      name: "Punjab Medical Store",
      address: "Village Ludhiana, Punjab",
      distance: "3.1 km",
      phone: "+91 98765 54321",
      rating: 4.2,
      availability: {
        "Paracetamol 500mg": { available: true, stock: 30, price: 28 },
        "Amoxicillin 250mg": { available: false, stock: 0, price: 115 },
        "Metformin 500mg": { available: true, stock: 25, price: 82 },
        "Atorvastatin 10mg": { available: true, stock: 15, price: 175 }
      }
    },
    {
      id: 3,
      name: "Rural Health Pharmacy",
      address: "Village Jalandhar, Punjab",
      distance: "4.7 km",
      phone: "+91 98765 67890",
      rating: 4.8,
      availability: {
        "Paracetamol 500mg": { available: true, stock: 60, price: 22 },
        "Amoxicillin 250mg": { available: true, stock: 20, price: 118 },
        "Metformin 500mg": { available: true, stock: 18, price: 88 },
        "Atorvastatin 10mg": { available: false, stock: 0, price: 185 }
      }
    }
  ]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleSearch = (medicineName) => {
    setIsSearching(true);
    setSelectedMedicine(medicineName);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const getAvailabilityStatus = (pharmacy, medicine) => {
    const availability = pharmacy.availability[medicine];
    if (!availability) return { status: 'unknown', color: 'gray' };
    
    if (availability.available) {
      if (availability.stock > 10) return { status: 'in-stock', color: 'green' };
      else return { status: 'low-stock', color: 'yellow' };
    } else {
      return { status: 'out-of-stock', color: 'red' };
    }
  };

  const filteredMedicines = prescribedMedicines.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Medicine Availability Tracker
            </h1>
            <p className="text-black text-lg font-medium">
              Check medicine availability at nearby pharmacies
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search for medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 font-medium text-lg placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Prescribed Medicines */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <BeakerIcon className="w-6 h-6 text-green-500" />
                Your Prescribed Medicines
              </h3>
              <p className="text-gray-600 mt-1">Click to check availability</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredMedicines.map((medicine) => (
                  <div 
                    key={medicine.id}
                    onClick={() => handleSearch(medicine.name)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedMedicine === medicine.name 
                        ? 'border-green-300 bg-green-50 shadow-lg' 
                        : 'border-gray-200 hover:border-green-200 hover:bg-green-25'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{medicine.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                        {medicine.dosage}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Frequency:</strong> {medicine.frequency}
                    </p>
                    <p className="text-sm text-gray-500">
                      Prescribed by {medicine.doctor} on {medicine.prescribed}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Availability */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <BuildingStorefrontIcon className="w-6 h-6 text-blue-500" />
                Nearby Pharmacies
                {selectedMedicine && (
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    Showing results for: {selectedMedicine}
                  </span>
                )}
              </h3>
            </div>
            
            <div className="p-6">
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
                  <span className="ml-3 text-gray-600 font-medium">Checking availability...</span>
                </div>
              ) : selectedMedicine ? (
                <div className="space-y-6">
                  {pharmacyData.map((pharmacy) => {
                    const availability = pharmacy.availability[selectedMedicine];
                    const status = getAvailabilityStatus(pharmacy, selectedMedicine);
                    
                    return (
                      <div key={pharmacy.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{pharmacy.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPinIcon className="w-4 h-4" />
                                <span>{pharmacy.address}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TruckIcon className="w-4 h-4" />
                                <span>{pharmacy.distance}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <BeakerIcon 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(pharmacy.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-1 text-sm font-semibold text-gray-600">{pharmacy.rating}</span>
                            </div>
                          </div>
                        </div>

                        {availability ? (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {status.status === 'in-stock' && <CheckCircleIcon className="w-6 h-6 text-green-500" />}
                                {status.status === 'low-stock' && <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />}
                                {status.status === 'out-of-stock' && <XCircleIcon className="w-6 h-6 text-red-500" />}
                                
                                <div>
                                  <h5 className="font-bold text-gray-900">{selectedMedicine}</h5>
                                  <p className={`text-sm font-semibold ${
                                    status.status === 'in-stock' ? 'text-green-600' :
                                    status.status === 'low-stock' ? 'text-yellow-600' : 'text-red-600'
                                  }`}>
                                    {status.status === 'in-stock' ? 'In Stock' :
                                     status.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-green-600">₹{availability.price}</p>
                                <p className="text-sm text-gray-500">per unit</p>
                              </div>
                            </div>
                            
                            {availability.available && (
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                  <strong>Stock:</strong> {availability.stock} units available
                                </p>
                                <div className="flex gap-2">
                                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                    Reserve
                                  </button>
                                  <a 
                                    href={`tel:${pharmacy.phone}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                  >
                                    <PhoneIcon className="w-4 h-4" />
                                    Call
                                  </a>
                                </div>
                              </div>
                            )}
                            
                            {!availability.available && (
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-red-600 font-medium">Currently not available</p>
                                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                                  Notify When Available
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-gray-500">No information available for this medicine</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BeakerIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Medicine</h3>
                  <p className="text-gray-500">Choose a medicine from your prescribed list to check availability at nearby pharmacies</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors font-semibold">
            <ClockIcon className="w-5 h-5" />
            Set Medicine Reminders
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors font-semibold">
            <TruckIcon className="w-5 h-5" />
            Request Home Delivery
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors font-semibold">
            <BuildingStorefrontIcon className="w-5 h-5" />
            Find More Pharmacies
          </button>
        </div>
      </div>
    </div>
  );
}
