import React from "react";
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
// import { HealthcareSector } from "./pages/HealthcareSector";
// import HospitalLogin from "./pages/HospitalLogin";
import DentistLogin from "./pages/DentistLogin";
import PharmacyLogin from "./pages/PharmacyLogin";
import LoadingPage from "./pages/LoadingPage";
import "./App.css";
import "./index.css";
import "antd/dist/reset.css";

import DeviceGuard from "./components/common/DeviceGuard";
import Incompatible from "./pages/Incompatible";
import { HealthcareSector2 } from "./pages/HealthCareSector2";
import HospitalLogin2 from "./pages/HospitalLogin2";
import { ToastProvider } from "./providers/ToastProvider";
import Dashboard2 from "./pages/Dashboard2";
import Pricing from "./pages/Pricing";
import Patient from "./pages/Patient";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Revenue from "./pages/Revenue";
import Profile from "./pages/Profile";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <DeviceGuard>
            <div className="app">
              {/* <Suspense fallback={<LoadingPage />}> */}
              <Routes>
                {/* <Route path="/" element={<SplashPage />} /> */}
                <Route
                  path="/"
                  element={
                    localStorage.getItem("splashSeen") === "true" ? (
                      <Navigate to="/healthcare" replace />
                    ) : (
                      <SplashPage />
                    )
                  }
                />
                <Route path="/healthcare" element={<HealthcareSector2 />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/hospital-login" element={<HospitalLogin2 />} />
                <Route path="/dentist-login" element={<DentistLogin />} />
                <Route path="/pharmacy-login" element={<PharmacyLogin />} />
                <Route path="/loading" element={<LoadingPage />} />
                <Route path="/animations" element={<AnimationShowcase />} />
                <Route path="/incompatible" element={<Incompatible />} />
                <Route
                  path="/dashboard2"
                  element={<ProtectedRoute>{<Dashboard />}</ProtectedRoute>}
                />

                <Route
                  path="/dashboard"
                  element={<ProtectedRoute>{<Dashboard2 />}</ProtectedRoute>}
                />
                <Route
                  path="/pricing"
                  element={<ProtectedRoute>{<Pricing />}</ProtectedRoute>}
                />
                <Route
                  path="/revenue"
                  element={<ProtectedRoute>{<Revenue />}</ProtectedRoute>}
                />
                <Route
                  path="/patient"
                  element={<ProtectedRoute>{<Patient />}</ProtectedRoute>}
                />
                <Route
                  path="/ai-assistant"
                  element={<ProtectedRoute>{<AIAssistant />}</ProtectedRoute>}
                />
                <Route
                  path="/settings"
                  element={<ProtectedRoute>{<Settings />}</ProtectedRoute>}
                />

                <Route
                  path="/profile"
                  element={<ProtectedRoute>{<Profile />}</ProtectedRoute>}
                />
              </Routes>
              {/* </Suspense> */}
            </div>
          </DeviceGuard>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
