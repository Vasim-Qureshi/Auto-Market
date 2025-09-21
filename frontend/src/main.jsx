// File: main.jsx (Vite entry point)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthContext';

// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


// File structure sample:
// - pages/
//   - HomePage.jsx
//   - LoginPage.jsx
//   - SignupPage.jsx
//   - VehicleCategoryPage.jsx
//   - VehicleSubCategoryPage.jsx
//   - VehicleDetailsPage.jsx
//   - CartPage.jsx
//   - CheckoutPage.jsx
//   - OrderDetailsPage.jsx
//   - ProfilePage.jsx
//   - ForgotPasswordPage.jsx
//   - ResetPasswordPage.jsx
//   - admin/
//     - AdminDashboard.jsx
//     - AddVehiclePage.jsx
//     - EditVehiclePage.jsx
//     - ManageVehiclePage.jsx

// - components/
//   - Navbar.jsx
//   - Footer.jsx
//   - VehicleCard.jsx
//   - ProtectedRoute.jsx

// - hooks/
//   - useAuth.js

// - utils/
//   - jwt.js
//   - bcrypt.js

// - styles/
//   - bootstrap.min.css (imported in index.css)

// For backend: use Express.js with JWT for auth and bcrypt for password hashing.

// Let me know if you want me to generate specific page content or backend code as well.
