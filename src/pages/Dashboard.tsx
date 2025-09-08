import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()

  const stats = [
    { icon: Users, title: 'Total Users', value: '12,345', change: '+12%' },
    { icon: DollarSign, title: 'Revenue', value: '$45,678', change: '+8%' },
    { icon: TrendingUp, title: 'Growth', value: '23.5%', change: '+3%' },
    { icon: BarChart3, title: 'Analytics', value: '89.2%', change: '+5%' }
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <motion.div 
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          <h2>Helda V2</h2>
          <button 
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#" className="active">Dashboard</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1>Dashboard</h1>
          </div>
          
          <div className="header-right">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <button className="settings-btn">
              <Settings size={20} />
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="user-name">{user?.name || 'User'}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="welcome-section">
            <motion.div 
              className="welcome-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Welcome back, {user?.name || 'User'}!</h2>
              <p>Here's what's happening with your business today.</p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-content">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-change positive">{stat.change}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <motion.div
              className="chart-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3>Analytics Overview</h3>
              <div className="chart-placeholder">
                <BarChart3 size={48} />
                <p>Chart visualization would go here</p>
                <p className="chart-note">
                  Connect your Figma designs to replace this placeholder
                </p>
              </div>
            </motion.div>

            <motion.div
              className="activity-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p>New user registered</p>
                    <span>2 minutes ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p>Revenue milestone reached</p>
                    <span>1 hour ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p>System update completed</p>
                    <span>3 hours ago</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
