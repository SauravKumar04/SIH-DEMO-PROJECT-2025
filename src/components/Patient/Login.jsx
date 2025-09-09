import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo authentication (mock)
    if (email === "patient@example.com" && password === "123456") {
      localStorage.setItem("user", JSON.stringify({ email, role: "patient" }));
      navigate("/patient/dashboard");
    } else {
      setError("Invalid credentials. Use patient@example.com / 123456");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold text-primary-color mb-6 text-center">
          Patient Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <UserIcon className="absolute h-5 w-5 top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-color transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon className="absolute h-5 w-5 top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-color transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-secondary-color text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition transform hover:-translate-y-1"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Demo credentials: <br />
          <span className="font-semibold">patient@example.com / 123456</span>
        </p>
      </div>
    </div>
  );
}
