import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Home and Authentication
import HomePage from "./components/HomePage";
import Login from "./components/Login";

// Patient Components
import PatientLogin from "./components/Patient/Login";
import PatientDashboard from "./components/Patient/Dashboard";
import SymptomChecker from "./components/Patient/SymptomChecker";
import AIHealthAssistant from "./components/Patient/AIHealthAssistant";
import HealthRecords from "./components/Patient/HealthRecords";
import Appointments from "./components/Patient/Appointments";
import VideoConsultationPatient from "./components/Patient/VideoConsultation.jsx";
import MedicineTracker from "./components/Patient/MedicineTracker";

// Doctor Components
import DoctorDashboard from "./components/Doctor/Dashboard";
import DoctorAppointments from "./components/Doctor/Appointments";
import PatientDetails from "./components/Doctor/PatientDetails";
import Prescriptions from "./components/Doctor/Prescriptions";
import VideoConsultationDoctor from "./components/Doctor/VideoConsultation.jsx";

// Admin Components
import AdminDashboard from "./components/Admin/Dashboard";
import AdminUsers from "./components/Admin/Users";
import AdminAnalytics from "./components/Admin/Analytics";
import AdminSettings from "./components/Admin/Settings";
import AdminSecurity from "./components/Admin/Security";

// Pharmacy Components
import PharmacyDashboard from "./components/Pharmacy/Dashboard";
import Inventory from "./components/Pharmacy/Inventory";
import Orders from "./components/Pharmacy/Orders";
import Delivery from "./components/Pharmacy/Delivery";
import Analytics from "./components/Pharmacy/Analytics";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Authentication Routes */}
            <Route path="/login/:userType" element={<Login />} />
            
            {/* Legacy Patient Login Route */}
            <Route path="/patient/login" element={<PatientLogin />} />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/symptom-checker" element={<SymptomChecker />} />
            <Route path="/patient/ai-assistant" element={<AIHealthAssistant />} />
            <Route path="/patient/health-records" element={<HealthRecords />} />
            <Route path="/patient/appointments" element={<Appointments />} />
            <Route path="/patient/medicine-tracker" element={<MedicineTracker />} />
            <Route path="/patient/video" element={<VideoConsultationPatient />} />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/patients" element={<PatientDetails />} />
            <Route path="/doctor/video" element={<VideoConsultationDoctor />} />
            <Route path="/doctor/prescriptions" element={<Prescriptions />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/security" element={<AdminSecurity />} />

            {/* Pharmacy Routes */}
            <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
            <Route path="/pharmacy/inventory" element={<Inventory />} />
            <Route path="/pharmacy/orders" element={<Orders />} />
            <Route path="/pharmacy/delivery" element={<Delivery />} />
            <Route path="/pharmacy/analytics" element={<Analytics />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
