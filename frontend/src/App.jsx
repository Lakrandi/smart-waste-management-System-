import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Resident Pages
import AuthPage from './pages/resident/AuthPage';
import HomePage from './pages/resident/HomePage';
import ComplaintsPage from './pages/resident/ComplaintsPage';
import FeedbackPage from './pages/resident/FeedbackPage';
import SchedulePage from './pages/resident/SchedulePage';
import ProfilePage from './pages/resident/ProfilePage';
import AboutPage from './pages/resident/AboutPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminSchedule from './pages/admin/AdminSchedule';

function App() {
  return (
    <Router>
      <Routes>
        {/* Resident Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route path="/admin/schedule" element={<AdminSchedule />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;