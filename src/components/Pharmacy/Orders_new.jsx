import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TruckIcon,
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

export default function Orders() {
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "pharmacy") {
      navigate("/");
    } else {
      setPharmacy(storedUser);
      
      // Load demo orders
      const demoOrders = [
        {
          id: "ORD001",
          patientName: "John Doe",
          patientEmail: "john.doe@email.com",
          medicines: [
            { name: "Paracetamol 500mg", quantity: 10, price: 25.50 },
            { name: "Vitamin D3", quantity: 1, price: 35.00 }
          ],
          totalAmount: 290.00,
          status: "Processing",
          priority: "Normal",
          orderDate: "2024-12-08",
          deliveryDate: "2024-12-10",
          address: "123 Main St, City, State",
          phone: "+1 (555) 123-4567",
          notes: "Patient needs medicine urgently"
        },
        {
          id: "ORD002",
          patientName: "Jane Smith",
          patientEmail: "jane.smith@email.com",
          medicines: [
            { name: "Aspirin 75mg", quantity: 30, price: 18.75 }
          ],
          totalAmount: 562.50,
          status: "Ready",
          priority: "High",
          orderDate: "2024-12-08",
          deliveryDate: "2024-12-09",
          address: "456 Oak Ave, City, State",
          phone: "+1 (555) 987-6543",
          notes: "Prescription from Dr. Wilson"
        },
        {
          id: "ORD003",
          patientName: "Robert Johnson",
          patientEmail: "robert.j@email.com",
          medicines: [
            { name: "Omeprazole 20mg", quantity: 15, price: 28.90 },
            { name: "Amoxicillin 500mg", quantity: 21, price: 45.25 }
          ],
          totalAmount: 1383.75,
          status: "Delivered",
          priority: "Normal",
          orderDate: "2024-12-07",
          deliveryDate: "2024-12-08",
          address: "789 Pine St, City, State",
          phone: "+1 (555) 456-7890",
          notes: "Regular monthly order"
        },
        {
          id: "ORD004",
          patientName: "Mary Wilson",
          patientEmail: "mary.w@email.com",
          medicines: [
            { name: "Paracetamol 500mg", quantity: 20, price: 25.50 }
          ],
          totalAmount: 510.00,
          status: "Pending",
          priority: "Urgent",
          orderDate: "2024-12-08",
          deliveryDate: "2024-12-09",
          address: "321 Elm St, City, State",
          phone: "+1 (555) 234-5678",
          notes: "Emergency prescription"
        }
      ];
      
      setOrders(demoOrders);
    }
  }, [navigate]);

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.medicines.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'ready': return 'bg-green-100 text-green-700';
      case 'delivered': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'normal': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      case 'processing': return <ClipboardDocumentListIcon className="w-4 h-4" />;
      case 'ready': return <CheckCircleIcon className="w-4 h-4" />;
      case 'delivered': return <TruckIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const statusOptions = ["All", "Pending", "Processing", "Ready", "Delivered"];
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const processingOrders = orders.filter(order => order.status === 'Processing').length;
  const readyOrders = orders.filter(order => order.status === 'Ready').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Order Management
            </h1>
            <p className="text-black text-lg font-medium">
              Process prescriptions and manage customer orders
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-black">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-black">Total Revenue</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{totalOrders}</div>
              <div className="text-black font-medium">Total Orders</div>
            </div>
            <ClipboardDocumentListIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-yellow-600">{pendingOrders}</div>
              <div className="text-black font-medium">Pending</div>
            </div>
            <ClockIcon className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-600">{processingOrders}</div>
              <div className="text-black font-medium">Processing</div>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">{readyOrders}</div>
              <div className="text-black font-medium">Ready for Pickup</div>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders, patients, or medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <FunnelIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{order.patientName}</h3>
                      <p className="text-gray-600">Order #{order.id}</p>
                      <p className="text-gray-500 text-sm">{order.orderDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Details */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Order Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-black">Total Amount:</span> ₹{order.totalAmount.toLocaleString()}</p>
                      <p><span className="font-medium text-black">Items:</span> {order.medicines.length}</p>
                      <p><span className="font-medium text-black">Delivery Date:</span> {order.deliveryDate}</p>
                    </div>
                  </div>

                  {/* Medicines */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Medicines</h4>
                    <div className="space-y-2">
                      {order.medicines.map((medicine, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-black text-sm">{medicine.name}</p>
                              <p className="text-gray-600 text-xs">Qty: {medicine.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-black text-sm">₹{medicine.price}</p>
                              <p className="text-gray-500 text-xs">Total: ₹{(medicine.quantity * medicine.price).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Actions */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Contact & Actions</h4>
                    <div className="space-y-2 text-sm mb-4">
                      <p><span className="font-medium text-black">Phone:</span> {order.phone}</p>
                      <p><span className="font-medium text-black">Email:</span> {order.patientEmail}</p>
                      <p className="text-xs text-gray-600">{order.address}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      
                      <button className="w-full px-3 py-2 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors text-sm">
                        Print Label
                      </button>
                    </div>
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm"><span className="font-medium text-black">Notes:</span> {order.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Today's Priority Orders */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Priority Orders</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {orders.filter(order => order.priority === 'Urgent' || order.priority === 'High').map((order) => (
                <div key={order.id} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-black">{order.patientName}</h4>
                      <p className="text-gray-600 text-sm">#{order.id} • ₹{order.totalAmount}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(order.priority)}`}>
                        {order.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
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
                Process All Ready
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Print All Labels
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                Daily Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
