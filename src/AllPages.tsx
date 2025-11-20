import React, { useEffect } from "react";
import { HealthcareSector2 } from "./pages/HealthCareSector2";
import SplashPage from "./pages/SplashPage";
import Dashboard from "./pages/Dashboard";
import HospitalLogin2 from "./pages/HospitalLogin2";
import DentistLogin from "./pages/DentistLogin";
import PharmacyLogin from "./pages/PharmacyLogin";
import Incompatible from "./pages/Incompatible";
import { useAllPageNavigation } from "./contexts/AllPagesNavigationContext";
import LoadingPage from "./pages/LoadingPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

const AllPages: React.FC = () => {
  const { currentView, navigateTo } = useAllPageNavigation();
  const { isAuthenticated, loading } = useAuth();

  const ProtectedDashboard = ProtectedRoute(Dashboard);

  const publicViews = [
    "healthcare",
    "splashscreen",
    "hospital-login",
    "dentist-login",
    "pharmacy-login",
  ];

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (publicViews.includes(currentView)) {
        console.log("Redirecting authenticated user to dashboard...");
        navigateTo("dashboard");
      }
    }
  }, [isAuthenticated, loading, currentView, navigateTo]);

  switch (currentView) {
    case "splashscreen":
      return <SplashPage />;
    case "healthcare":
      // return <HealthcareSector2 />;
      return <LoadingPage />;
    case "dashboard":
      return <ProtectedDashboard />;
    case "hospital-login":
      return <HospitalLogin2 />;
    case "dentist-login":
      return <DentistLogin />;
    case "pharmacy-login":
      return <PharmacyLogin />;
    case "loading":
      return <LoadingPage />;
    case "incompatible":
      return <Incompatible />;
    default:
      return <HealthcareSector2 />;
  }
};

export default AllPages;
