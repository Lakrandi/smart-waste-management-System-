import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={{ fontSize: '18px' }}>●</span>
          <h2 style={{ margin: 0, fontSize: '20px' }}>CleanTrack Admin</h2>
        </div>
        <p style={styles.subtitle}>Sign in to manage complaints and collection schedules</p>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>STAFF EMAIL</label>
          <input 
            type="email" 
            defaultValue="admin@council.lk" 
            style={styles.input} 
            required 
          />

          <label style={styles.label}>PASSWORD</label>
          <input 
            type="password" 
            defaultValue="........" 
            style={styles.input} 
            required 
          />

          <button type="submit" style={styles.loginBtn}>LOG IN</button>
        </form>

        <div style={styles.noteBox}>
          Prototype note: any email/password logs you in as demo admin, Zone 4 council office.
        </div>

        <button onClick={() => navigate('/auth')} style={styles.backBtn}>
          ← Back to role selection
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#eef3ed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid #dcdcdc',
    boxSizing: 'border-box',
  },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' },
  subtitle: { textAlign: 'center', color: '#666', fontSize: '12px', marginBottom: '30px' },
  label: { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#333' },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '10px',
    border: '1px solid #cfd8cf',
    backgroundColor: '#eaf3e6',
    marginBottom: '20px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#0d3b14',
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '5px',
  },
  noteBox: {
    backgroundColor: '#eaf3e6',
    border: '1px solid #cfd8cf',
    borderRadius: '10px',
    padding: '12px 15px',
    fontSize: '12px',
    color: '#555',
    marginTop: '25px',
    lineHeight: '1.4',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#333',
    fontSize: '13px',
    fontWeight: 'bold',
    display: 'block',
    margin: '20px auto 0 auto',
    cursor: 'pointer',
  }
};

export default AdminLogin;