import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "pharmacy") {
      navigate("/");
    } else {
      setPharmacy(storedUser);
      const storedOrders = JSON.parse(
        localStorage.getItem(`orders_${storedUser.email}`) || "[]"
      );
      setOrders(storedOrders);
    }
  }, [navigate]);

  const updateStatus = (index, status) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = status;
    setOrders(updatedOrders);
    localStorage.setItem(`orders_${pharmacy.email}`, JSON.stringify(updatedOrders));
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-color mb-6">
        Pharmacy Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-700">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-secondary-color flex flex-col animate-fadeIn"
            >
              <h2 className="text-xl font-semibold text-primary-color mb-2">
                Order #{index + 1}
              </h2>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Patient:</span> {order.patient}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Medicine:</span> {order.medicine}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Quantity:</span> {order.quantity}</p>
              <p className="text-gray-700 mb-2"><span className="font-semibold">Status:</span> {order.status}</p>

              <div className="flex space-x-2">
                <button
                  onClick={() => updateStatus(index, "Pending")}
                  className="px-3 py-1 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 transition"
                >
                  Pending
                </button>
                <button
                  onClick={() => updateStatus(index, "Processed")}
                  className="px-3 py-1 bg-secondary-color text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                  Processed
                </button>
                <button
                  onClick={() => updateStatus(index, "Delivered")}
                  className="px-3 py-1 bg-accent-color text-white rounded-lg shadow-md hover:bg-green-600 transition"
                >
                  Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
