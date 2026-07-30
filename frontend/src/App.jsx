import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 
//1- import the folder parths for resident pages
import ComplaintsPage from './pages/resident/ComplaintsPage';
import FeedbackPage from './pages/resident/FeedbackPage';


//1- import the folder parths for admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminComplaints from './pages/admin/AdminComplaints';




function App() {
  return (
    <Router>
      <Routes>
         
        {/*2 - add roots here for resident pages */}
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />

    

        {/*2 - add roots here for admin pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />



        {/*  If the url is incorrect its navigate to complaint page  */}
        <Route path="*" element={<Navigate to="/complaints" replace />} />
      </Routes>
    </Router>
  );
}

export default App;