// src/components/Patient/VideoConsultation.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoCameraIcon, MicrophoneIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function VideoConsultationPatient() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const connectCall = () => setIsConnected(true);
  const endCall = () => setIsConnected(false);
  const toggleMic = () => setMicOn(!micOn);

  return (
    <div className="p-6 bg-blue-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary-color mb-6">
        Video Consultation (Patient)
      </h1>

      {/* Video Placeholder */}
      <div className="relative w-full max-w-3xl bg-gray-200 rounded-xl shadow-lg aspect-video flex items-center justify-center">
        {isConnected ? (
          <p className="text-gray-700 font-semibold text-lg animate-pulse">
            Connected to Dr. Singh
          </p>
        ) : (
          <p className="text-gray-500 font-semibold text-lg animate-pulse">
            Waiting for doctor...
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex space-x-6 mt-6">
        <button
          onClick={toggleMic}
          className={`p-4 rounded-full shadow-md transition transform hover:-translate-y-1 ${
            micOn ? "bg-secondary-color text-white" : "bg-gray-300 text-gray-600"
          }`}
        >
          <MicrophoneIcon className="h-6 w-6" />
        </button>
        {!isConnected ? (
          <button
            onClick={connectCall}
            className="p-4 rounded-full bg-accent-color text-white shadow-md hover:bg-green-600 transition transform hover:-translate-y-1"
          >
            <VideoCameraIcon className="h-6 w-6" />
          </button>
        ) : (
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-danger-color text-white shadow-md hover:bg-red-600 transition transform hover:-translate-y-1"
          >
            <PhoneIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {isConnected && (
        <p className="mt-4 text-gray-700 font-medium animate-pulse">
          Video call in progress...
        </p>
      )}
    </div>
  );
}
