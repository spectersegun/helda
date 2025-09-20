import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
const SplashPage = React.lazy(() => import("./pages/SplashPage"));
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AnimationShowcase from "./pages/AnimationShowcase";
import { HealthcareSector } from "./pages/HealthcareSector";
import HospitalLogin from "./pages/HospitalLogin";
import DentistLogin from "./pages/DentistLogin";
import PharmacyLogin from "./pages/PharmacyLogin";
import LoadingPage from "./pages/LoadingPage";
import "./App.css";
import "./index.css";

import DeviceGuard from "./components/common/DeviceGuard";
import Incompatible from "./pages/Incompatible";
import { HealthcareSector2 } from "./pages/HealthCareSector2";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <DeviceGuard>
          <div className="app">
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/healthcare" element={<HealthcareSector2 />} />
                <Route path="/healthcare2" element={<HealthcareSector />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/hospital-login" element={<HospitalLogin />} />
                <Route path="/dentist-login" element={<DentistLogin />} />
                <Route path="/pharmacy-login" element={<PharmacyLogin />} />
                <Route path="/loading" element={<LoadingPage />} />
                <Route path="/animations" element={<AnimationShowcase />} />
                <Route path="/incompatible" element={<Incompatible />} />
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute>{<Dashboard />}</ProtectedRoute>}
                />
              </Routes>
            </Suspense>
          </div>
        </DeviceGuard>
      </Router>
    </AuthProvider>
  );
}

export default App;
