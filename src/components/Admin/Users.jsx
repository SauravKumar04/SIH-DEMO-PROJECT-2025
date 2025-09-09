import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserGroupIcon, UserIcon, ShieldCheckIcon, PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/");
    } else {
      setUser(storedUser);
      // Load demo users
      const demoUsers = [
        { id: 1, name: "John Doe", email: "patient@demo.com", role: "patient", status: "active", joinDate: "2024-01-15" },
        { id: 2, name: "Dr. Smith", email: "doctor@demo.com", role: "doctor", status: "active", joinDate: "2024-02-01" },
        { id: 3, name: "Pharmacy One", email: "pharmacy@demo.com", role: "pharmacy", status: "active", joinDate: "2024-02-15" },
        { id: 4, name: "Jane Patient", email: "jane@demo.com", role: "patient", status: "inactive", joinDate: "2024-03-01" },
        { id: 5, name: "Dr. Johnson", email: "johnson@demo.com", role: "doctor", status: "pending", joinDate: "2024-03-10" },
      ];
      setUsers(demoUsers);
    }
  }, [navigate]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const updateUserStatus = (userId, newStatus) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'doctor': return '👨‍⚕️';
      case 'patient': return '👤';
      case 'pharmacy': return '🏥';
      case 'admin': return '🔐';
      default: return '👤';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              User Management
            </h1>
            <p className="text-black text-lg font-medium">
              Manage all platform users and their permissions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-black">{users.length}</div>
              <div className="text-sm text-black">Total Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{users.filter(u => u.status === 'active').length}</div>
              <div className="text-black font-medium">Active Users</div>
            </div>
            <UserIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{users.filter(u => u.role === 'doctor').length}</div>
              <div className="text-black font-medium">Doctors</div>
            </div>
            <ShieldCheckIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{users.filter(u => u.role === 'patient').length}</div>
              <div className="text-black font-medium">Patients</div>
            </div>
            <UserGroupIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{users.filter(u => u.status === 'pending').length}</div>
              <div className="text-black font-medium">Pending Approval</div>
            </div>
            <PlusIcon className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="patient">Patients</option>
                  <option value="doctor">Doctors</option>
                  <option value="pharmacy">Pharmacies</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Add New User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black flex items-center gap-3">
                <UserGroupIcon className="w-6 h-6 text-blue-500" />
                Platform Users ({filteredUsers.length})
              </h3>
            </div>
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center">
                <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-black text-lg font-medium mb-2">No users found</p>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Join Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-lg">
                              {getRoleIcon(user.role)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-black">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="capitalize text-sm font-medium text-black">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-black">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {user.status === 'pending' && (
                              <button
                                onClick={() => updateUserStatus(user.id, 'active')}
                                className="text-green-600 hover:text-green-800 font-medium text-sm"
                              >
                                Approve
                              </button>
                            )}
                            {user.status === 'active' && (
                              <button
                                onClick={() => updateUserStatus(user.id, 'suspended')}
                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                              >
                                Suspend
                              </button>
                            )}
                            {user.status === 'suspended' && (
                              <button
                                onClick={() => updateUserStatus(user.id, 'active')}
                                className="text-green-600 hover:text-green-800 font-medium text-sm"
                              >
                                Activate
                              </button>
                            )}
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* User Statistics */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">User Statistics</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">New This Month</span>
                  <span className="text-2xl font-bold text-emerald-600">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Active Rate</span>
                  <span className="text-2xl font-bold text-blue-600">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Retention Rate</span>
                  <span className="text-2xl font-bold text-purple-600">92%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Recent Activity</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="text-sm">
                    <span className="font-medium text-black">Dr. Johnson</span>
                    <span className="text-gray-500"> joined the platform</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="text-sm">
                    <span className="font-medium text-black">Jane Patient</span>
                    <span className="text-gray-500"> updated profile</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="text-sm">
                    <span className="font-medium text-black">Pharmacy One</span>
                    <span className="text-gray-500"> added new inventory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                Bulk Import Users
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors">
                Export User Data
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Send Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
