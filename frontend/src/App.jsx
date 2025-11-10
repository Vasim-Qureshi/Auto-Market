// File: App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import "./App.css";

// ✅ Lazy Load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const VehicleCard = lazy(() => import('./components/VehicleCard'));
const BuyerProposalForm = lazy(() => import('./pages/BuyerProposalForm'));
const VehicleDetailsPage = lazy(() => import('./pages/VehicleDetailsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AddVehiclePage = lazy(() => import('./pages/admin/AddVehiclePage'));
const EditVehiclePage = lazy(() => import('./pages/admin/EditVehiclePage'));
const ManageVehiclePage = lazy(() => import('./pages/admin/ManageVehiclePage'));
const ForgotPasswordPage = lazy(() => import('./pages/password/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/password/ResetPasswordPage'));
const VerifyOTPPage = lazy(() => import('./pages/password/VerifyOTPPage'));
const Search = lazy(() => import('./pages/Search'));
const PrivacyPolicy = lazy(() => import('./pages/legalDocs/PrivacyPolicy'));
const TermsAndCondition = lazy(() => import('./pages/legalDocs/Term&Condition'));
const RefundPolicy = lazy(() => import('./pages/legalDocs/RefundPolicy'));
const SellerDashboard = lazy(() => import('./pages/seller/SellerDashboard'));
const SellerAddVehiclePage = lazy(() => import('./pages/seller/SellerAddVehicle'));
const SellerEditVehiclePage = lazy(() => import('./pages/seller/SellerEditVehicle'));
const SellerManageVehiclePage = lazy(() => import('./pages/seller/SellerManageVehicle'));
const BuyerDashboard = lazy(() => import('./pages/buyer/BuyerDashboard'));
const AutoMarketHome = lazy(() => import('./pages/PublicPage'));
const UsersManager = lazy(() => import('./pages/admin/UsersManager'));
const ManageProposals = lazy(() => import('./pages/admin/ManageProposals'));

function App() {
  return (
    <Router>
      <Navbar />

      {/* ✅ Suspense wrapper for lazy loading */}
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>

        <Routes>

          {/* Public Routes */}
          <Route path="/public" element={<AutoMarketHome />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* Seller Routes*/}
          <Route path="/seller/dashboard" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
          <Route path="/seller/add-vehicle" element={<ProtectedRoute role="seller"><SellerAddVehiclePage /></ProtectedRoute>} />
          <Route path="/seller/edit-vehicle/:id" element={<ProtectedRoute role="seller"><SellerEditVehiclePage /></ProtectedRoute>} />
          <Route path="/seller/manage-vehicles" element={<ProtectedRoute role="seller"><SellerManageVehiclePage /></ProtectedRoute>} />

          {/* Buyer Routes*/}
          <Route path="/buyer/dashboard" element={<ProtectedRoute role="buyer"><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/:type" element={<ProtectedRoute role="buyer"><VehicleCard /></ProtectedRoute>} />
          <Route path="/vehicle/:id" element={<ProtectedRoute role="buyer"><VehicleDetailsPage /></ProtectedRoute>} />
          <Route path="/buyerproposal/:vehicleId" element={<ProtectedRoute role="buyer"><BuyerProposalForm /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute role="buyer"><Search /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add-vehicle" element={<ProtectedRoute role="admin"><AddVehiclePage /></ProtectedRoute>} />
          <Route path="/admin/edit-vehicle/:id" element={<ProtectedRoute role="admin"><EditVehiclePage /></ProtectedRoute>} />
          <Route path="/admin/manage-vehicles" element={<ProtectedRoute role="admin"><ManageVehiclePage /></ProtectedRoute>} />
          <Route path="/admin/manage-proposals" element={<ProtectedRoute role="admin"><ManageProposals /></ProtectedRoute>} />
          <Route path="/admin/users-manager" element={<ProtectedRoute role="admin"><UsersManager /></ProtectedRoute>} />

          {/* Password Management Routes */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />

        </Routes>

      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;
