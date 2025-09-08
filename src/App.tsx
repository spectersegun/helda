import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AnimationShowcase from './pages/AnimationShowcase'
import { HealthcareSector } from './pages/HealthcareSector'
import HospitalLogin from './pages/HospitalLogin'
import DentistLogin from './pages/DentistLogin'
import PharmacyLogin from './pages/PharmacyLogin'
import LoadingPage from './pages/LoadingPage'
import './App.css'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/healthcare" element={<HealthcareSector />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hospital-login" element={<HospitalLogin />} />
            <Route path="/dentist-login" element={<DentistLogin />} />
            <Route path="/pharmacy-login" element={<PharmacyLogin />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/animations" element={<AnimationShowcase />} />
            <Route 
              path="/dashboard" 
              element={<Dashboard />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
