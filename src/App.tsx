// import React from "react";
import {
  BrowserRouter as Router,
  // Routes,
  // Route,
  // Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ChatHistoryProvider } from "./contexts/ChatHistoryContext";
import { StreamingProvider } from "./contexts/StreamingContext";
import "./App.css";
import "./index.css";
import "antd/dist/reset.css";

import DeviceGuard from "./components/common/DeviceGuard";
import { ToastProvider } from "./providers/ToastProvider";
import { AllPageNavigationProvider } from "./contexts/AllPagesNavigationContext";
import AllPages from "./AllPages";

function App() {
  return (
    <ToastProvider>
      <AllPageNavigationProvider>
        <AuthProvider>
          <DataProvider>
            <ChatHistoryProvider>
              <StreamingProvider>
                <Router>
                  <DeviceGuard>
                    <div className="app">
                      <AllPages />
                    </div>
                  </DeviceGuard>
                </Router>
              </StreamingProvider>
            </ChatHistoryProvider>
          </DataProvider>
        </AuthProvider>
      </AllPageNavigationProvider>
    </ToastProvider>
  );
}

export default App;
