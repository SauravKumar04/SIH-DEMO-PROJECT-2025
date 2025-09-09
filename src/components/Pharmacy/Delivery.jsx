import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  UserIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

export default function Delivery() {
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "pharmacy") {
      navigate("/");
    } else {
      setPharmacy(storedUser);
      
      // Load demo deliveries
      const demoDeliveries = [
        {
          id: "DEL001",
          orderId: "ORD001",
          patientName: "John Doe",
          patientPhone: "+1 (555) 123-4567",
          deliveryAddress: "123 Main St, City, State",
          medicines: ["Paracetamol 500mg x10", "Vitamin D3 x1"],
          totalAmount: 290.00,
          status: "In Transit",
          priority: "Normal",
          assignedDriver: "Mike Johnson",
          driverPhone: "+1 (555) 777-8888",
          estimatedTime: "2:30 PM",
          actualTime: null,
          distance: "5.2 km",
          trackingNumber: "TRK001234",
          dispatchTime: "12:45 PM",
          currentLocation: "Oak Avenue"
        },
        {
          id: "DEL002",
          orderId: "ORD002",
          patientName: "Jane Smith",
          patientPhone: "+1 (555) 987-6543",
          deliveryAddress: "456 Oak Ave, City, State",
          medicines: ["Aspirin 75mg x30"],
          totalAmount: 562.50,
          status: "Delivered",
          priority: "High",
          assignedDriver: "Sarah Wilson",
          driverPhone: "+1 (555) 999-1111",
          estimatedTime: "1:15 PM",
          actualTime: "1:10 PM",
          distance: "3.8 km",
          trackingNumber: "TRK001235",
          dispatchTime: "11:30 AM",
          currentLocation: "Delivered"
        },
        {
          id: "DEL003",
          orderId: "ORD003",
          patientName: "Robert Johnson",
          patientPhone: "+1 (555) 456-7890",
          deliveryAddress: "789 Pine St, City, State",
          medicines: ["Omeprazole 20mg x15", "Amoxicillin 500mg x21"],
          totalAmount: 1383.75,
          status: "Dispatched",
          priority: "Normal",
          assignedDriver: "Alex Chen",
          driverPhone: "+1 (555) 444-5555",
          estimatedTime: "4:00 PM",
          actualTime: null,
          distance: "7.1 km",
          trackingNumber: "TRK001236",
          dispatchTime: "1:15 PM",
          currentLocation: "Pharmacy"
        },
        {
          id: "DEL004",
          orderId: "ORD004",
          patientName: "Mary Wilson",
          patientPhone: "+1 (555) 234-5678",
          deliveryAddress: "321 Elm St, City, State",
          medicines: ["Paracetamol 500mg x20"],
          totalAmount: 510.00,
          status: "Preparing",
          priority: "Urgent",
          assignedDriver: null,
          driverPhone: null,
          estimatedTime: "3:45 PM",
          actualTime: null,
          distance: "4.5 km",
          trackingNumber: "TRK001237",
          dispatchTime: null,
          currentLocation: "Pharmacy"
        },
        {
          id: "DEL005",
          orderId: "ORD005",
          patientName: "David Brown",
          patientPhone: "+1 (555) 666-7777",
          deliveryAddress: "654 Maple Dr, City, State",
          medicines: ["Insulin Glargine x1", "Test Strips x1"],
          totalAmount: 1250.00,
          status: "Failed",
          priority: "High",
          assignedDriver: "Mike Johnson",
          driverPhone: "+1 (555) 777-8888",
          estimatedTime: "10:30 AM",
          actualTime: null,
          distance: "8.3 km",
          trackingNumber: "TRK001238",
          dispatchTime: "9:00 AM",
          currentLocation: "Return to Pharmacy",
          failureReason: "Customer not available"
        }
      ];
      
      setDeliveries(demoDeliveries);
    }
  }, [navigate]);

  const updateDeliveryStatus = (deliveryId, newStatus) => {
    const updatedDeliveries = deliveries.map(delivery => 
      delivery.id === deliveryId ? { 
        ...delivery, 
        status: newStatus,
        actualTime: newStatus === 'Delivered' ? new Date().toLocaleTimeString() : delivery.actualTime
      } : delivery
    );
    setDeliveries(updatedDeliveries);
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.assignedDriver?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'preparing': return 'bg-yellow-100 text-yellow-700';
      case 'dispatched': return 'bg-blue-100 text-blue-700';
      case 'in transit': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'normal': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'preparing': return <ClockIcon className="w-4 h-4" />;
      case 'dispatched': return <TruckIcon className="w-4 h-4" />;
      case 'in transit': return <TruckIcon className="w-4 h-4" />;
      case 'delivered': return <CheckCircleIcon className="w-4 h-4" />;
      case 'failed': return <ExclamationTriangleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const statusOptions = ["All", "Preparing", "Dispatched", "In Transit", "Delivered", "Failed"];
  const totalDeliveries = deliveries.length;
  const inTransitDeliveries = deliveries.filter(d => d.status === 'In Transit').length;
  const deliveredToday = deliveries.filter(d => d.status === 'Delivered').length;
  const failedDeliveries = deliveries.filter(d => d.status === 'Failed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Delivery Tracking
            </h1>
            <p className="text-black text-lg font-medium">
              Monitor delivery status and logistics operations
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-black">{inTransitDeliveries}</div>
            <div className="text-sm text-black">In Transit</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{totalDeliveries}</div>
              <div className="text-black font-medium">Total Deliveries</div>
            </div>
            <TruckIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-600">{inTransitDeliveries}</div>
              <div className="text-black font-medium">In Transit</div>
            </div>
            <MapPinIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">{deliveredToday}</div>
              <div className="text-black font-medium">Delivered Today</div>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-red-600">{failedDeliveries}</div>
              <div className="text-black font-medium">Failed Deliveries</div>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
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
                  placeholder="Search deliveries, patients, or tracking numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Deliveries List */}
          <div className="space-y-6">
            {filteredDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                      <TruckIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{delivery.patientName}</h3>
                      <p className="text-gray-600">Delivery #{delivery.id}</p>
                      <p className="text-gray-500 text-sm">Tracking: {delivery.trackingNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(delivery.status)}`}>
                      {getStatusIcon(delivery.status)}
                      {delivery.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(delivery.priority)}`}>
                      {delivery.priority}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Delivery Info */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Delivery Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-black">Distance:</span> {delivery.distance}</p>
                      <p><span className="font-medium text-black">Amount:</span> ₹{delivery.totalAmount.toLocaleString()}</p>
                      <p><span className="font-medium text-black">Items:</span> {delivery.medicines.length}</p>
                    </div>
                  </div>

                  {/* Address & Contact */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Customer Info</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-black">Phone:</span> {delivery.patientPhone}</p>
                      <p className="text-gray-600">{delivery.deliveryAddress}</p>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Driver Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-black">Driver:</span> {delivery.assignedDriver || 'Not Assigned'}</p>
                      <p><span className="font-medium text-black">Phone:</span> {delivery.driverPhone || 'N/A'}</p>
                      <p><span className="font-medium text-black">Location:</span> {delivery.currentLocation}</p>
                    </div>
                  </div>

                  {/* Timing & Actions */}
                  <div>
                    <h4 className="font-bold text-black mb-3">Timing & Actions</h4>
                    <div className="space-y-2 text-sm mb-4">
                      <p><span className="font-medium text-black">Dispatched:</span> {delivery.dispatchTime || 'Not Dispatched'}</p>
                      <p><span className="font-medium text-black">ETA:</span> {delivery.estimatedTime}</p>
                      {delivery.actualTime && <p><span className="font-medium text-black">Delivered:</span> {delivery.actualTime}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <select
                        value={delivery.status}
                        onChange={(e) => updateDeliveryStatus(delivery.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      >
                        <option value="Preparing">Preparing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Failed">Failed</option>
                      </select>
                      
                      <button className="w-full px-3 py-2 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors text-sm flex items-center gap-2 justify-center">
                        <PhoneIcon className="w-4 h-4" />
                        Call Customer
                      </button>
                    </div>
                  </div>
                </div>

                {/* Medicines List */}
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-black mb-2">Medicines</h4>
                  <div className="flex flex-wrap gap-2">
                    {delivery.medicines.map((medicine, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {medicine}
                      </span>
                    ))}
                  </div>
                </div>

                {delivery.status === 'Failed' && delivery.failureReason && (
                  <div className="mt-4 p-4 bg-red-50 rounded-xl">
                    <p className="text-sm text-red-700"><span className="font-medium">Failure Reason:</span> {delivery.failureReason}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Active Deliveries */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Active Deliveries</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {deliveries.filter(d => d.status === 'In Transit' || d.status === 'Dispatched').map((delivery) => (
                <div key={delivery.id} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-black">{delivery.patientName}</h4>
                      <p className="text-gray-600 text-sm">{delivery.assignedDriver} • ETA: {delivery.estimatedTime}</p>
                      <p className="text-gray-500 text-xs">{delivery.currentLocation}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
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
                Assign All Drivers
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                View Route Map
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                Delivery Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
