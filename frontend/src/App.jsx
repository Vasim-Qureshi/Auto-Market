// File: App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// import VehicleCategoryPage from './pages/VehicleCategoryPage';
// import VehicleSubCategoryPage from './pages/VehicleSubCategoryPage';
import TruckList from './components/TruckList';
import BuyerProposalForm from './pages/BuyerProposalForm';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import OrderDetailsPage from './pages/OrderDetailsPage';
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:type" element={<ProtectedRoute>{<TruckList />}</ProtectedRoute>} />
        <Route path="/buyerproposal/:vehicleId" element={<ProtectedRoute>{<BuyerProposalForm />}</ProtectedRoute>} />
        <Route path="/vehicle/:id" element={<ProtectedRoute>{<VehicleDetailsPage />}</ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute>{<ProfilePage />}</ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute>{<Search />}</ProtectedRoute>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* Password Management Routes */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/add-vehicle" element={<ProtectedRoute role="admin"><AddVehiclePage /></ProtectedRoute>} />
        <Route path="/admin/edit-vehicle/:id" element={<ProtectedRoute role="admin"><EditVehiclePage /></ProtectedRoute>} />
        <Route path="/admin/manage-vehicles" element={<ProtectedRoute role="admin"><ManageVehiclePage /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
