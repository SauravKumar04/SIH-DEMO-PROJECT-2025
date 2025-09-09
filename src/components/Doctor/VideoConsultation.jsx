import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  VideoCameraIcon, 
  MicrophoneIcon, 
  PhoneIcon,
  CameraIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  UserIcon,
  ClockIcon,
  CalendarDaysIcon,
  PhoneXMarkIcon
} from "@heroicons/react/24/outline";

export default function VideoConsultationDoctor() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "doctor") {
      navigate("/");
    } else {
      setUser(storedUser);
      
      // Load demo upcoming appointments
      const demoAppointments = [
        {
          id: 1,
          patientName: "John Doe",
          time: "10:30 AM",
          date: "Today",
          type: "Follow-up",
          status: "Scheduled"
        },
        {
          id: 2,
          patientName: "Jane Smith",
          time: "2:00 PM",
          date: "Today",
          type: "Consultation",
          status: "Scheduled"
        },
        {
          id: 3,
          patientName: "Robert Johnson",
          time: "4:15 PM",
          date: "Today",
          type: "Check-up",
          status: "Scheduled"
        }
      ];
      
      setUpcomingAppointments(demoAppointments);
    }
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  const connectCall = (patient) => {
    setCurrentPatient(patient);
    setIsConnected(true);
    setCallDuration(0);
  };

  const endCall = () => {
    setIsConnected(false);
    setCurrentPatient(null);
    setCallDuration(0);
  };

  const toggleMic = () => setMicOn(!micOn);
  const toggleCamera = () => setCameraOn(!cameraOn);
  const toggleSpeaker = () => setSpeakerOn(!speakerOn);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              Video Consultations
            </h1>
            <p className="text-black text-lg font-medium">
              Connect with your patients through secure video calls
            </p>
          </div>
          {isConnected && (
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-lg font-bold text-black">Call Duration</div>
              <div className="text-2xl font-bold text-emerald-600">{formatDuration(callDuration)}</div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{upcomingAppointments.length}</div>
              <div className="text-black font-medium">Today's Calls</div>
            </div>
            <CalendarDaysIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">12</div>
              <div className="text-black font-medium">This Week</div>
            </div>
            <VideoCameraIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">45</div>
              <div className="text-black font-medium">This Month</div>
            </div>
            <ClockIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">
                {isConnected ? 'Active' : 'Ready'}
              </div>
              <div className="text-black font-medium">Status</div>
            </div>
            <div className={`w-8 h-8 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Video Call Area */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            {/* Video Display */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 aspect-video flex items-center justify-center">
              {isConnected ? (
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <UserIcon className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentPatient?.patientName}</h3>
                  <p className="text-gray-300">Connected • {formatDuration(callDuration)}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Call in progress</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <VideoCameraIcon className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Waiting for Patient</h3>
                  <p className="text-gray-300">Select a patient to start video consultation</p>
                </div>
              )}

              {/* Small Video Preview */}
              {isConnected && (
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-white" />
                  <span className="absolute bottom-1 right-1 text-xs text-white">You</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={toggleMic}
                  className={`p-4 rounded-full transition-all duration-300 ${
                    micOn 
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700" 
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  <MicrophoneIcon className="w-6 h-6" />
                </button>
                
                <button
                  onClick={toggleCamera}
                  className={`p-4 rounded-full transition-all duration-300 ${
                    cameraOn 
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700" 
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  <CameraIcon className="w-6 h-6" />
                </button>

                <button
                  onClick={toggleSpeaker}
                  className={`p-4 rounded-full transition-all duration-300 ${
                    speakerOn 
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700" 
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  <SpeakerWaveIcon className="w-6 h-6" />
                </button>

                <button className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300">
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
                </button>

                <button className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300">
                  <ShareIcon className="w-6 h-6" />
                </button>

                {isConnected && (
                  <button
                    onClick={endCall}
                    className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300 ml-4"
                  >
                    <PhoneXMarkIcon className="w-6 h-6" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className={`w-2 h-2 rounded-full ${micOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">Microphone {micOn ? 'On' : 'Off'}</span>
                <div className={`w-2 h-2 rounded-full ml-4 ${cameraOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">Camera {cameraOn ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>

          {/* Call History */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-black mb-4">Recent Consultations</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Sarah Wilson</h4>
                    <p className="text-sm text-gray-600">Yesterday, 3:30 PM • 25 min</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Michael Chen</h4>
                    <p className="text-sm text-gray-600">Nov 14, 2:00 PM • 18 min</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Today's Appointments */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Today's Appointments</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-black">{appointment.patientName}</h4>
                      <span className="text-sm text-emerald-600 font-semibold">{appointment.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{appointment.type}</p>
                    <button
                      onClick={() => connectCall(appointment)}
                      disabled={isConnected}
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                        isConnected
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      }`}
                    >
                      {isConnected ? 'Call in Progress' : 'Start Video Call'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                Schedule New Call
              </button>
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                View Call History
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                Test Connection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
