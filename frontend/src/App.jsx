import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 
//1- import the folder parths for resident pages
import ComplaintsPage from './pages/resident/ComplaintsPage';
import HomePage from './pages/resident/HomePage';
import AboutPage from './pages/resident/AboutPage';



//1- import the folder parths for admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSchedule from './pages/admin/AdminSchedule';





function App() {
  return (
    <Router>
      <Routes>
         
        {/*2 - add roots here for resident pages */}
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/Home" element={<HomePage/>} />
        <Route path="/About" element={<AboutPage/>} />
      

        {/*2 - add roots here for admin pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/schedule" element={<AdminSchedule />} />

 

        {/*  If the url is incorrect its navigate to complaint page  */}
        <Route path="*" element={<Navigate to="/complaints" replace />} />
      </Routes>
    </Router>
  );
}

export default App;