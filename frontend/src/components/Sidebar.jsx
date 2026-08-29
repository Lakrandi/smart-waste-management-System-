import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/home', icon: '🏠' },
    { name: 'Live Tracking', path: '/tracking', icon: '📍' },
    { name: 'Complaints', path: '/complaints', icon: '📋' },
    { name: 'Feedback', path: '/feedback', icon: '⭐' },
    { name: 'Collection Schedule', path: '/schedule', icon: '📅' },
    { name: 'Profile', path: '/profile', icon: '👤' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
  ];

  return (
    <>
      {/* Mobile Top Header (Hamburger & Logo Left-Aligned) */}
      <div className="mobile-header">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '24px', cursor: 'pointer', padding: '4px' }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 'bold', fontSize: '18px' }}>
          <span>●</span> CleanTrack
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer Container */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div>
          <div style={styles.logoContainer}>
            <span style={{ color: '#ffffff', fontSize: '18px' }}>●</span>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', fontFamily: 'sans-serif', color: '#ffffff' }}>CleanTrack</h2>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '15px',
                    cursor: 'pointer',
                    width: '100%',
                    backgroundColor: isActive ? '#637d63' : 'transparent',
                    color: '#ffffff',
                    fontWeight: isActive ? '600' : 'normal',
                  }}
                >
                  <span style={{ marginRight: '12px' }}>{item.icon}</span>
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={() => {
            setIsOpen(false);
            navigate('/auth');
          }}
          style={styles.logoutBtn}
        >
          <span>⏻</span> Log out
        </button>
      </div>
    </>
  );
};

const styles = {
  logoContainer: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '12px 0',
    borderTop: '1px solid rgba(255,255,255,0.2)',
    width: '100%',
  }
};

export default Sidebar;