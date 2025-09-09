import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  CubeIcon, 
  ClipboardDocumentListIcon, 
  TruckIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function PharmacyDashboard() {
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState(null);
  const [stats, setStats] = useState({
    totalMedicines: 850,
    lowStockItems: 12,
    pendingOrders: 23,
    todayRevenue: 15420
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "pharmacy") {
      navigate("/");
    } else {
      setPharmacy(storedUser);
    }
  }, [navigate]);

  const pharmacyCards = [
    {
      title: "Inventory Management",
      description: "Track medicine stock levels and manage inventory",
      icon: CubeIcon,
      route: "/pharmacy/inventory",
      gradient: "from-blue-500 to-blue-600",
      stats: "850 medicines"
    },
    {
      title: "Order Management",
      description: "Process prescriptions and manage customer orders",
      icon: ClipboardDocumentListIcon,
      route: "/pharmacy/orders",
      gradient: "from-green-500 to-emerald-600",
      stats: "23 pending"
    },
    {
      title: "Delivery Tracking",
      description: "Monitor delivery status and logistics",
      icon: TruckIcon,
      route: "/pharmacy/delivery",
      gradient: "from-purple-500 to-violet-600",
      stats: "15 in transit"
    },
    {
      title: "Sales Analytics",
      description: "View sales reports and performance metrics",
      icon: ChartBarIcon,
      route: "/pharmacy/analytics",
      gradient: "from-orange-500 to-red-600",
      stats: "₹15,420 today"
    }
  ];

  const recentOrders = [
    { id: "ORD001", patient: "John Doe", items: 3, status: "Processing", time: "10 mins ago" },
    { id: "ORD002", patient: "Jane Smith", items: 1, status: "Ready", time: "25 mins ago" },
    { id: "ORD003", patient: "Mike Johnson", items: 2, status: "Delivered", time: "1 hour ago" }
  ];

  const lowStockItems = [
    { name: "Paracetamol 500mg", stock: 5, reorderLevel: 50 },
    { name: "Aspirin 75mg", stock: 8, reorderLevel: 30 },
    { name: "Vitamin D3", stock: 12, reorderLevel: 25 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Pharmacy Dashboard
            </h1>
            <p className="text-black text-lg font-medium">
              Welcome back, {pharmacy?.email?.split("@")[0]}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">₹{stats.todayRevenue.toLocaleString()}</div>
              <div className="text-sm text-black">Today's Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.totalMedicines}</div>
              <div className="text-black font-medium">Total Medicines</div>
            </div>
            <CubeIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-orange-600">{stats.lowStockItems}</div>
              <div className="text-black font-medium">Low Stock Alert</div>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{stats.pendingOrders}</div>
              <div className="text-black font-medium">Pending Orders</div>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">₹{stats.todayRevenue.toLocaleString()}</div>
              <div className="text-black font-medium">Today's Revenue</div>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pharmacy Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-black mb-6">Pharmacy Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pharmacyCards.map((card, index) => {
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
                    <div className="text-sm font-semibold text-purple-600">{card.stats}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Patient</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-black">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-black">{order.patient}</td>
                      <td className="px-6 py-4 text-sm text-black">{order.items}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Ready' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Low Stock Alert */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Low Stock Alert</h3>
            <div className="bg-orange-50 rounded-2xl border border-orange-200 overflow-hidden">
              {lowStockItems.map((item, index) => (
                <div key={index} className="p-4 border-b border-orange-200 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-800">{item.name}</h4>
                      <p className="text-orange-600 text-sm">Stock: {item.stock} | Reorder: {item.reorderLevel}</p>
                    </div>
                    <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Reorder Stock
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                View All Orders
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                Generate Report
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 bg-green-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-bold text-green-800">Pharmacy Online</h3>
                <p className="text-green-600 text-sm">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
