import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user data from localStorage", err);
      }
    }
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: '#f9fbf9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', padding: '40px', flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}> 
          Hi, {user?.name || 'User'} 👋
        </h1>

        <p style={{ color: '#666', fontSize: '13px', marginTop: '4px', marginRight: '4px' }}>
          {user?.district ? `${user.district} District` : 'Anuradhapura District'}
        </p>

        {/* Top Two Cards */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          {/* Card 1: Next Pickup */}
          <div style={{ ...cardStyle, flex: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#666', letterSpacing: '0.5px' }}>
                NEXT PICKUP - {user?.district ? user.district.toUpperCase() : 'DISTRICT'}
              </span>
              <h2 style={{ margin: '8px 0 12px 0', fontSize: '20px' }}>Thursday, 9:00 AM</h2>
              <span style={{ backgroundColor: '#aed2ae', color: '#0d3b14', padding: '5px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                ♻️ Recyclable Waste
              </span>
            </div>
            <div style={{ borderLeft: '1px solid #ccc', paddingLeft: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', color: '#888' }}>TICKET</span>
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '16px' }}>#A-118</p>
            </div>
          </div>

          {/* Card 2: Report Issue */}
          <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Report an issue</h3>
            <button 
              onClick={() => navigate('/complaints')} 
              style={{ backgroundColor: '#0d3b14', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              + New complaints
            </button>
          </div>
        </div>

        {/* Bottom Three Counter Cards */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '25px' }}>
          <div style={counterCard}>
            <h1 style={{ margin: 0, fontSize: '28px' }}>1</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#555', fontWeight: 'bold' }}>OPEN COMPLAINTS</p>
          </div>

          <div style={counterCard}>
            <h1 style={{ margin: 0, fontSize: '28px' }}>2</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#555', fontWeight: 'bold' }}>RESOLVED</p>
          </div>

          <div style={counterCard}>
            <h1 style={{ margin: 0, fontSize: '28px' }}>Thu</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#555', fontWeight: 'bold' }}>NEXT COLLECTION</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const cardStyle = { backgroundColor: '#edf2ed', padding: '25px', borderRadius: '12px', border: '1px solid #d5dfd5' };
const counterCard = { flex: 1, backgroundColor: '#edf2ed', padding: '20px', borderRadius: '12px', border: '1px solid #d5dfd5' };

export default HomePage;