import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 
//1- import the folder parths for resident pages
import AuthPage from './pages/resident/AuthPage';
import HomePage from './pages/resident/HomePage';
import LiveTracking from './pages/resident/LiveTracking';
import ComplaintsPage from './pages/resident/ComplaintsPage';
import FeedbackPage from './pages/resident/FeedbackPage';
import SchedulePage from './pages/resident/SchedulePage';
import ProfilePage from './pages/resident/ProfilePage';
import AboutPage from './pages/resident/AboutPage';
 



//1- import the folder parths for admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminSchedule from './pages/admin/AdminSchedule';
 
// 3. Import Driver Page
import DriverPage from './pages/driver/DriverPage';
       



function App() {
  return (
    <Router>
      <Routes>
         
        {/*2 - add roots here for resident pages */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/Home" element={<HomePage/>} />
        <Route path="/tracking" element={<LiveTracking />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/About" element={<AboutPage/>} />
        
 

        {/*2 - add roots here for admin pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route path="/admin/schedule" element={<AdminSchedule />} />

        {/* Driver Route */}
        <Route path="/driver" element={<DriverPage />} />

         
 
 

 

        {/*  If the url is incorrect its navigate to complaint page  */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;