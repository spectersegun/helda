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

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/healthcare" />;
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

                {/* 🔑 The whole app lives here as ONE route */}
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute>{<Dashboard2 />}</ProtectedRoute>}
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
