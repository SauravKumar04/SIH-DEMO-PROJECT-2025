import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChartBarIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarDaysIcon,
  CubeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";

export default function Analytics() {
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "pharmacy") {
      navigate("/");
    } else {
      setPharmacy(storedUser);
    }
  }, [navigate]);

  // Demo analytics data
  const salesData = {
    "This Month": {
      totalRevenue: 125400,
      totalOrders: 342,
      avgOrderValue: 366.67,
      topMedicines: [
        { name: "Paracetamol 500mg", units: 450, revenue: 11250 },
        { name: "Aspirin 75mg", units: 320, revenue: 6000 },
        { name: "Vitamin D3", units: 180, revenue: 6300 },
        { name: "Amoxicillin 500mg", units: 150, revenue: 6787.50 },
        { name: "Omeprazole 20mg", units: 200, revenue: 5780 }
      ],
      dailySales: [
        { date: "Dec 1", revenue: 4200, orders: 12 },
        { date: "Dec 2", revenue: 3800, orders: 10 },
        { date: "Dec 3", revenue: 5100, orders: 15 },
        { date: "Dec 4", revenue: 4600, orders: 13 },
        { date: "Dec 5", revenue: 5400, orders: 16 },
        { date: "Dec 6", revenue: 3900, orders: 11 },
        { date: "Dec 7", revenue: 4800, orders: 14 },
        { date: "Dec 8", revenue: 5200, orders: 15 }
      ],
      customerAnalytics: {
        newCustomers: 45,
        returningCustomers: 187,
        customerSatisfaction: 4.6
      },
      growth: {
        revenueGrowth: 12.5,
        orderGrowth: 8.3,
        customerGrowth: 15.2
      }
    }
  };

  const currentData = salesData[selectedPeriod];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Sales Analytics
            </h1>
            <p className="text-black text-lg font-medium">
              View sales reports and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Year">This Year</option>
            </select>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">₹{currentData.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-black">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">₹{currentData.totalRevenue.toLocaleString()}</div>
              <div className="text-black font-medium">Total Revenue</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                <span className="text-green-600 text-sm font-semibold">+{currentData.growth.revenueGrowth}%</span>
              </div>
            </div>
            <BanknotesIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{currentData.totalOrders}</div>
              <div className="text-black font-medium">Total Orders</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-blue-500" />
                <span className="text-blue-600 text-sm font-semibold">+{currentData.growth.orderGrowth}%</span>
              </div>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">₹{currentData.avgOrderValue.toLocaleString()}</div>
              <div className="text-black font-medium">Avg Order Value</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-purple-500" />
                <span className="text-purple-600 text-sm font-semibold">+3.7%</span>
              </div>
            </div>
            <ChartBarIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{currentData.customerAnalytics.newCustomers}</div>
              <div className="text-black font-medium">New Customers</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-orange-500" />
                <span className="text-orange-600 text-sm font-semibold">+{currentData.growth.customerGrowth}%</span>
              </div>
            </div>
            <UserGroupIcon className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Daily Sales Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <h3 className="text-xl font-bold text-black mb-6">Daily Sales Performance</h3>
            <div className="space-y-4">
              {currentData.dailySales.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600">{day.date}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-black">₹{day.revenue.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">{day.orders} orders</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full"
                        style={{ width: `${(day.revenue / Math.max(...currentData.dailySales.map(d => d.revenue))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Medicines */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-black mb-6">Top Performing Medicines</h3>
            <div className="space-y-4">
              {currentData.topMedicines.map((medicine, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                      <CubeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black">{medicine.name}</h4>
                      <p className="text-gray-600 text-sm">{medicine.units} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-black text-lg">₹{medicine.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">#{index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Revenue Breakdown */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Revenue Breakdown</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-black font-medium">Prescription Drugs</span>
                    <span className="font-bold text-black">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-black font-medium">OTC Medicines</span>
                    <span className="font-bold text-black">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-black font-medium">Health Products</span>
                    <span className="font-bold text-black">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Analytics */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Customer Insights</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">New Customers</span>
                  <span className="text-2xl font-bold text-green-600">{currentData.customerAnalytics.newCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Returning</span>
                  <span className="text-2xl font-bold text-blue-600">{currentData.customerAnalytics.returningCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Satisfaction</span>
                  <span className="text-2xl font-bold text-yellow-600">{currentData.customerAnalytics.customerSatisfaction}/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Metrics */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Growth Metrics</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Revenue Growth</span>
                  <div className="flex items-center gap-1">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-bold">+{currentData.growth.revenueGrowth}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Order Growth</span>
                  <div className="flex items-center gap-1">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600 font-bold">+{currentData.growth.orderGrowth}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Customer Growth</span>
                  <div className="flex items-center gap-1">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-purple-500" />
                    <span className="text-purple-600 font-bold">+{currentData.growth.customerGrowth}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Export Sales Report
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Schedule Analytics
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
