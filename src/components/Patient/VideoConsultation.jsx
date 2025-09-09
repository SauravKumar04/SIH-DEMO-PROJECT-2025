import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  VideoCameraIcon, 
  MicrophoneIcon, 
  PhoneIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  UserIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import {
  VideoCameraIcon as VideoCameraIconSolid,
  MicrophoneIcon as MicrophoneIconSolid,
  SpeakerWaveIcon as SpeakerWaveIconSolid
} from "@heroicons/react/24/solid";

export default function VideoConsultationPatient() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const connectCall = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 3000);
  };

  const endCall = () => {
    setIsConnected(false);
    setCallDuration(0);
    navigate("/patient/dashboard");
  };

  const toggleMic = () => setMicOn(!micOn);
  const toggleVideo = () => setVideoOn(!videoOn);
  const toggleSpeaker = () => setSpeakerOn(!speakerOn);
  const toggleChat = () => setShowChat(!showChat);

  const upcomingAppointments = [
    { doctor: "Dr. Smith", specialty: "Cardiology", time: "Today 3:00 PM", status: "Ready" },
    { doctor: "Dr. Johnson", specialty: "General", time: "Tomorrow 10:00 AM", status: "Scheduled" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Video Consultation
            </h1>
            <p className="text-black text-lg font-medium">
              Connect with healthcare professionals instantly
            </p>
          </div>
          <div className="flex items-center gap-4">
            {isConnected && (
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-black">{formatDuration(callDuration)}</div>
                <div className="text-sm text-black">Call Duration</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isConnected && !isConnecting && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-black">2</div>
                  <div className="text-black font-medium">Available Doctors</div>
                </div>
                <UserIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-black">24/7</div>
                  <div className="text-black font-medium">Available</div>
                </div>
                <ClockIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-black">HD</div>
                  <div className="text-black font-medium">Video Quality</div>
                </div>
                <VideoCameraIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-black">Secure</div>
                  <div className="text-black font-medium">Connection</div>
                </div>
                <Cog6ToothIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Available Appointments */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black">Ready for Video Call</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-black">{appointment.doctor}</h4>
                        <p className="text-gray-600">{appointment.specialty}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        appointment.status === 'Ready' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {appointment.status}
                      </span>
                      {appointment.status === 'Ready' && (
                        <button
                          onClick={connectCall}
                          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                        >
                          Join Call
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Video Call Interface */}
      {(isConnected || isConnecting) && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-2xl shadow-lg overflow-hidden relative" style={{ aspectRatio: '16/9' }}>
              {/* Doctor Video (Main) */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                {isConnecting ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-xl font-semibold">Connecting to Dr. Smith...</p>
                  </div>
                ) : isConnected ? (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserIcon className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-white text-xl font-semibold">Dr. Smith</p>
                    <p className="text-gray-300">Cardiologist</p>
                  </div>
                ) : null}
              </div>

              {/* Patient Video (Picture in Picture) */}
              {isConnected && (
                <div className="absolute bottom-4 right-4 w-48 h-32 bg-gray-700 rounded-xl border-2 border-white overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    {videoOn ? (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <UserIcon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-white text-sm">You</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <VideoCameraIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">Video Off</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Call Status */}
              {isConnected && (
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold">{formatDuration(callDuration)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            {isConnected && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={toggleMic}
                  className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
                    micOn 
                      ? "bg-gray-200 hover:bg-gray-300" 
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {micOn ? (
                    <MicrophoneIconSolid className="w-6 h-6 text-gray-700 mx-auto" />
                  ) : (
                    <MicrophoneIcon className="w-6 h-6 text-white mx-auto" />
                  )}
                </button>

                <button
                  onClick={toggleVideo}
                  className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
                    videoOn 
                      ? "bg-gray-200 hover:bg-gray-300" 
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {videoOn ? (
                    <VideoCameraIconSolid className="w-6 h-6 text-gray-700 mx-auto" />
                  ) : (
                    <VideoCameraIcon className="w-6 h-6 text-white mx-auto" />
                  )}
                </button>

                <button
                  onClick={endCall}
                  className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full shadow-lg transition-all duration-300"
                >
                  <PhoneIcon className="w-6 h-6 text-white mx-auto" />
                </button>

                <button
                  onClick={toggleSpeaker}
                  className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
                    speakerOn 
                      ? "bg-gray-200 hover:bg-gray-300" 
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {speakerOn ? (
                    <SpeakerWaveIconSolid className="w-6 h-6 text-gray-700 mx-auto" />
                  ) : (
                    <SpeakerWaveIcon className="w-6 h-6 text-white mx-auto" />
                  )}
                </button>

                <button
                  onClick={toggleChat}
                  className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-all duration-300"
                >
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white mx-auto" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Call Info */}
          {isConnected && (
            <div>
              {/* Doctor Info */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                <h3 className="text-lg font-bold text-black mb-4">Current Call</h3>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <UserIcon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-black">Dr. Smith</h4>
                  <p className="text-gray-600 text-sm">Cardiologist</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 text-sm">Online</span>
                  </div>
                </div>
              </div>

              {/* Call Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-black mb-4">Call Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-black">{formatDuration(callDuration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality</span>
                    <span className="text-green-600 font-semibold">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Connection</span>
                    <span className="text-green-600 font-semibold">Stable</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
