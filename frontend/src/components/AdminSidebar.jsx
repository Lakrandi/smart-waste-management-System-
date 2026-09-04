import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Complaints', path: '/admin/complaints', icon: '📋' },
    { name: 'Manage Schedule', path: '/admin/schedule', icon: '📅' },
    { name: 'Feedbacks', path: '/admin/feedback', icon: '⭐' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Navigation Header */}
      {isMobile && (
        <div style={styles.mobileHeader}>
          <button onClick={() => setIsOpen(!isOpen)} style={styles.hamburgerBtn}>
            ☰
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={styles.logoDot}>●</span>
            <h2 style={{ ...styles.logoText, fontSize: '18px' }}>CleanTrack</h2>
            <span style={{ fontSize: '10px', color: '#a0bfa0', letterSpacing: '1px' }}>COUNCIL</span>
          </div>
        </div>
      )}

      {/* Dark Overlay Backdrop */}
      {isMobile && isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          style={styles.backdrop} 
        />
      )}

      {/* Main Sidebar Drawer */}
      <div
        style={{
          ...styles.sidebar,
          ...(isMobile ? styles.mobileSidebar : styles.desktopSidebar),
          display: isMobile && !isOpen ? 'none' : 'flex',
        }}
      >
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
                  onClick={() => handleNavigation(item.path)}
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

        <button
          onClick={() => {
            localStorage.clear();
            handleNavigation('/admin/login');
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
  sidebar: {
    backgroundColor: '#0d3b14',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justify: 'space-between',
    padding: '30px 20px',
    boxSizing: 'border-box',
    zIndex: 1000,
  },
  desktopSidebar: {
    width: '260px',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  mobileSidebar: {
    width: '270px',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    boxShadow: '4px 0 15px rgba(0,0,0,0.4)',
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  mobileHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#0d3b14',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    gap: '15px',
    zIndex: 101,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  hamburgerBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px',
  },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' },
  logoDot: { color: '#ffffff', fontSize: '18px' },
  logoText: { margin: 0, fontSize: '22px', fontWeight: 'bold', fontFamily: 'sans-serif', color: '#ffffff' },
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
    padding: '16px 0 4px 0',
    marginTop: 'auto',
    borderTop: '1px solid rgba(255,255,255,0.2)',
  }
};

export default AdminSidebar;