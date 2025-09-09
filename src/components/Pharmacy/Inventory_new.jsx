import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CubeIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export default function Inventory() {
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "pharmacy") {
      navigate("/");
    } else {
      setPharmacy(storedUser);
      
      // Load demo medicines
      const demoMedicines = [
        {
          id: 1,
          name: "Paracetamol 500mg",
          quantity: 450,
          reorderLevel: 50,
          price: 25.50,
          category: "Pain Relief",
          expiryDate: "2025-08-15",
          supplier: "PharmaCorp Ltd",
          batchNo: "PC2024001"
        },
        {
          id: 2,
          name: "Aspirin 75mg",
          quantity: 8,
          reorderLevel: 30,
          price: 18.75,
          category: "Cardiovascular",
          expiryDate: "2025-06-20",
          supplier: "HealthMed Inc",
          batchNo: "HM2024015"
        },
        {
          id: 3,
          name: "Vitamin D3 1000 IU",
          quantity: 12,
          reorderLevel: 25,
          price: 35.00,
          category: "Vitamins",
          expiryDate: "2026-01-10",
          supplier: "NutriPharm",
          batchNo: "NP2024032"
        },
        {
          id: 4,
          name: "Amoxicillin 500mg",
          quantity: 180,
          reorderLevel: 40,
          price: 45.25,
          category: "Antibiotics",
          expiryDate: "2025-12-05",
          supplier: "BioMed Solutions",
          batchNo: "BM2024087"
        },
        {
          id: 5,
          name: "Omeprazole 20mg",
          quantity: 95,
          reorderLevel: 35,
          price: 28.90,
          category: "Gastrointestinal",
          expiryDate: "2025-09-30",
          supplier: "PharmaCorp Ltd",
          batchNo: "PC2024045"
        }
      ];
      
      setMedicines(demoMedicines);
    }
  }, [navigate]);

  const addMedicine = () => {
    if (!medicineName || !quantity || !price || !category) return;
    
    const newMedicine = {
      id: medicines.length + 1,
      name: medicineName,
      quantity: parseInt(quantity),
      reorderLevel: 25,
      price: parseFloat(price),
      category,
      expiryDate,
      supplier: "New Supplier",
      batchNo: `NEW${Date.now()}`
    };
    
    const updatedMeds = [...medicines, newMedicine];
    setMedicines(updatedMeds);
    
    // Reset form
    setMedicineName("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setExpiryDate("");
    setShowAddForm(false);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedMeds = medicines.map(med => 
      med.id === id ? { ...med, quantity: parseInt(newQuantity) } : med
    );
    setMedicines(updatedMeds);
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || medicine.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (quantity, reorderLevel) => {
    if (quantity <= reorderLevel * 0.5) return { status: 'Critical', color: 'bg-red-100 text-red-700' };
    if (quantity <= reorderLevel) return { status: 'Low', color: 'bg-orange-100 text-orange-700' };
    return { status: 'Good', color: 'bg-green-100 text-green-700' };
  };

  const categories = ["All", ...new Set(medicines.map(med => med.category))];
  const totalMedicines = medicines.length;
  const lowStockCount = medicines.filter(med => med.quantity <= med.reorderLevel).length;
  const criticalStockCount = medicines.filter(med => med.quantity <= med.reorderLevel * 0.5).length;
  const totalValue = medicines.reduce((sum, med) => sum + (med.quantity * med.price), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Inventory Management
            </h1>
            <p className="text-black text-lg font-medium">
              Manage medicine stock levels and track inventory
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Medicine
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{totalMedicines}</div>
              <div className="text-black font-medium">Total Medicines</div>
            </div>
            <CubeIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-orange-600">{lowStockCount}</div>
              <div className="text-black font-medium">Low Stock</div>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-red-600">{criticalStockCount}</div>
              <div className="text-black font-medium">Critical Stock</div>
            </div>
            <ClockIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">₹{totalValue.toLocaleString()}</div>
              <div className="text-black font-medium">Total Value</div>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Add Medicine Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-black mb-6">Add New Medicine</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-black font-medium mb-2">Medicine Name</label>
              <input
                type="text"
                placeholder="e.g., Paracetamol 500mg"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-black font-medium mb-2">Quantity</label>
              <input
                type="number"
                placeholder="e.g., 100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-black font-medium mb-2">Price per Unit (₹)</label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g., 25.50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-black font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="Pain Relief">Pain Relief</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Gastrointestinal">Gastrointestinal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-black font-medium mb-2">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={addMedicine}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Add Medicine
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 bg-gray-100 text-black rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <FunnelIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Medicines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMedicines.map((medicine) => {
              const stockStatus = getStockStatus(medicine.quantity, medicine.reorderLevel);
              return (
                <div
                  key={medicine.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                        <CubeIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">{medicine.name}</h3>
                        <p className="text-gray-600">{medicine.category}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stockStatus.color}`}>
                      {stockStatus.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Current Stock:</span>
                      <div className="font-bold text-black text-lg">{medicine.quantity}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Reorder Level:</span>
                      <div className="font-bold text-black text-lg">{medicine.reorderLevel}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Price per Unit:</span>
                      <div className="font-bold text-black text-lg">₹{medicine.price}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Value:</span>
                      <div className="font-bold text-black text-lg">₹{(medicine.quantity * medicine.price).toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <p><span className="font-medium">Expiry:</span> {medicine.expiryDate}</p>
                    <p><span className="font-medium">Batch:</span> {medicine.batchNo}</p>
                    <p><span className="font-medium">Supplier:</span> {medicine.supplier}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={medicine.quantity}
                        onChange={(e) => updateQuantity(medicine.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors">
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Critical Stock Alert */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Stock Alerts</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {medicines.filter(med => med.quantity <= med.reorderLevel).map((medicine) => {
                const stockStatus = getStockStatus(medicine.quantity, medicine.reorderLevel);
                return (
                  <div key={medicine.id} className="p-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-black">{medicine.name}</h4>
                        <p className="text-gray-600 text-sm">Stock: {medicine.quantity} | Need: {medicine.reorderLevel}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${stockStatus.color}`}>
                        {stockStatus.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Reorder All Low Stock
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Export Inventory
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
