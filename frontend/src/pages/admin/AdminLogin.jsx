import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  //UPDATED: State variables for input values & password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={{ fontSize: '18px', color: '#0d3b14' }}>●</span>
          <h2 style={{ margin: 0, fontSize: '20px' }}>CleanTrack Admin</h2>
        </div>
        <p style={styles.subtitle}>Sign in to manage complaints and collection schedules</p>


        <form onSubmit={handleLogin}>
          <label style={styles.label}>STAFF EMAIL</label>
          <input 
            type="email" 
            placeholder="admin@council.lk" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input} 
            required 
          />

          <label style={styles.label}>PASSWORD</label>
          <div style={styles.passwordWrapper}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.passwordInput} 
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              style={styles.eyeBtn}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              )}
            </button>
          </div>

          <button type="submit" style={styles.loginBtn}>LOG IN</button>
        </form>

        <div style={styles.noteBox}>
          Prototype note: any email/password logs you in as demo admin, Zone 4 council office.
        </div>

        <button onClick={() => navigate('/')} style={styles.backBtn}>
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
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxSizing: 'border-box',
    border: '1px solid #e0e0e0',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.03)',
  },
  
  header: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' },
  subtitle: { textAlign: 'center', color: '#666', fontSize: '13px', marginBottom: '30px' },
  label: { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#333' },

  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '10px',
    border: '1px solid #cce0c8',
    backgroundColor: '#ebf5e9',
    marginBottom: '20px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
  },

  
  passwordWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ebf5e9',
    border: '1px solid #cce0c8',
    borderRadius: '10px',
    padding: '0 15px',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },

  passwordInput: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    padding: '12px 0',
    fontSize: '14px',
    outline: 'none',
    color: '#333333',
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

  eyeBtn: {
    background: 'none',  
    border: 'none',      
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
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