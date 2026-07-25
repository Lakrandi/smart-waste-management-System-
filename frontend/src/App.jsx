import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 
//1- import the folder parths 
 
import ComplaintsPage from './pages/resident/ComplaintsPage';




function App() {
  return (
    <Router>
      <Routes>
         
        {/*2 - add roots here */}
        <Route path="/complaints" element={<ComplaintsPage />} />


        {/*  If the url is incorrect its navigate to complaint page  */}
        <Route path="*" element={<Navigate to="/complaints" replace />} />
      </Routes>
    </Router>
  );
}

export default App;