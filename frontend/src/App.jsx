// File: App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VehicleCard from './components/VehicleCard';
import BuyerProposalForm from './pages/BuyerProposalForm';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddVehiclePage from './pages/admin/AddVehiclePage';
import EditVehiclePage from './pages/admin/EditVehiclePage';
import ManageVehiclePage from './pages/admin/ManageVehiclePage';
import ForgotPasswordPage from './pages/password/ForgotPasswordPage';
import ResetPasswordPage from './pages/password/ResetPasswordPage';
import VerifyOTPPage from './pages/password/VerifyOTPPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Search from "./pages/Search";
import PrivacyPolicy from './pages/legalDocs/PrivacyPolicy';
import TermAndCondition from './pages/legalDocs/Term&Condition';
import RefundPolicy from './pages/legalDocs/RefundPolicy';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerAddVehiclePage from './pages/seller/SellerAddVehicle';
import SellerEditVehiclePage from './pages/seller/SellerEditVehicle';
import SellerManageVehiclePage from './pages/seller/SellerManageVehicle';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import "./App.css";
import AutoMarketHome from './pages/PublicPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/public" element={<AutoMarketHome />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute>{<ProfilePage />}</ProtectedRoute>} />

        {/* Seller Routes*/}
        <Route path="/seller/dashboard" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
        <Route path="/seller/add-vehicle" element={<ProtectedRoute role="seller"><SellerAddVehiclePage /></ProtectedRoute>} />
        <Route path="/seller/edit-vehicle/:id" element={<ProtectedRoute role="seller"><SellerEditVehiclePage /></ProtectedRoute>} />
        <Route path="/seller/manage-vehicles" element={<ProtectedRoute role="seller"><SellerManageVehiclePage /></ProtectedRoute>} />

        {/* Buyer Routes*/}
        <Route path="/buyer/dashboard" element={<ProtectedRoute role="buyer"><BuyerDashboard /></ProtectedRoute>} />
        <Route path="/:type" element={<ProtectedRoute role="buyer">{<VehicleCard />}</ProtectedRoute>} />
        <Route path="/vehicle/:id" element={<ProtectedRoute role="buyer">{<VehicleDetailsPage />}</ProtectedRoute>} />
        <Route path="/buyerproposal/:vehicleId" element={<ProtectedRoute role="buyer">{<BuyerProposalForm />}</ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute role="buyer">{<Search />}</ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/add-vehicle" element={<ProtectedRoute role="admin"><AddVehiclePage /></ProtectedRoute>} />
        <Route path="/admin/edit-vehicle/:id" element={<ProtectedRoute role="admin"><EditVehiclePage /></ProtectedRoute>} />
        <Route path="/admin/manage-vehicles" element={<ProtectedRoute role="admin"><ManageVehiclePage /></ProtectedRoute>} />

        {/* Password Management Routes */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
