import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Complaints', path: '/admin/complaints', icon: '📋' },
    { name: 'Manage Schedule', path: '/admin/schedule', icon: '📅' },
    { name: 'Feedbacks', path: '/admin/feedback', icon: '⭐' },
  ];

  return (
    <div style={styles.sidebar}>
      <div>
        <div style={styles.logoContainer}>
          <span style={styles.logoDot}>●</span>
          <h2 style={styles.logoText}>CleanTrack</h2>
        </div>
        <p style={styles.councilLabel}>COUNCIL</p>

        <nav style={styles.nav}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                style={{
                  ...styles.navItem,
                  backgroundColor: isActive ? '#637d63' : 'transparent',
                  color: '#ffffff',
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              >
                <span style={{ marginRight: '10px' }}>{item.icon}</span>
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <button onClick={() => navigate('/admin/login')} style={styles.logoutBtn}>
        <span>⏻</span> Log out
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: '#0d3b14',
    color: '#ffffff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '30px 20px',
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' },
  logoDot: { color: '#ffffff', fontSize: '18px' },
  logoText: { margin: 0, fontSize: '22px', fontWeight: 'bold', fontFamily: 'sans-serif' },
  councilLabel: { margin: '0 0 30px 0', fontSize: '10px', color: '#a0bfa0', letterSpacing: '1px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '10px' },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    textAlign: 'left',
    fontSize: '14px',
    cursor: 'pointer',
    transition: '0.2s',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '12px 0',
    borderTop: '1px solid rgba(255,255,255,0.2)',
  }
};

export default AdminSidebar;