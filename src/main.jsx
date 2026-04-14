import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TaskDetails from './pages/TaskDetails.jsx'
import Stats from './pages/Stats.jsx'
import Settings from './pages/Settings.jsx'
import FocusMode from './pages/FocusMode.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Landing Page - No Header/Nav */}
        <Route path="/" element={<Landing />} />

        {/* Main App - With Header/Nav */}
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
          <Route path="/focus/:taskId" element={<FocusMode />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
