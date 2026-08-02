import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    navigate('/home');  
  };

  return (
    <div style={styles.container}>
      {/* Left Green Banner Panel */}
      <div style={styles.leftPanel}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <span style={{ color: '#fff', fontSize: '20px' }}>●</span>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>CleanTrack</h2>
          </div>
          
          <p style={{ color: '#a0bfa0', fontSize: '12px', margin: '0 0 30px 0', whiteSpace: 'nowrap' }}>
            Sri Lankan Smart Waste Management System
          </p>

          <h1 style={styles.leftTitle}>
            Welcome to the<br />Resident Portal
          </h1>
          <p style={styles.leftDesc}>
            Manage your household waste collection, submit complaints, and stay updated with your local council services across Sri Lanka.
          </p>

          {/* Recycle Emoji */}
          <div style={styles.iconBox}>♻️</div>
        </div>

        {/* Feature List */}
        <div style={styles.featureList}>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🗓️</span>
            <span style={styles.featureText}>View waste collection schedules</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>📷</span>
            <span style={styles.featureText}>Report uncollected waste with photos</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>📝</span>
            <span style={styles.featureText}>Track complaints and service requests</span>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div style={styles.rightPanel}>
        {/* Top Tab Switcher */}
        <div style={styles.tabContainer}>
          <button 
            type="button"
            onClick={() => setIsSignUp(false)} 
            style={{ 
              ...styles.tabBtn, 
              backgroundColor: !isSignUp ? '#ffffff' : 'transparent', 
              color: !isSignUp ? '#0d3b14' : '#666666',
              fontWeight: !isSignUp ? 'bold' : 'normal',
              boxShadow: !isSignUp ? '0px 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}>
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => setIsSignUp(true)} 
            style={{ 
              ...styles.tabBtn, 
              backgroundColor: isSignUp ? '#ffffff' : 'transparent', 
              color: isSignUp ? '#0d3b14' : '#666666',
              fontWeight: isSignUp ? 'bold' : 'normal',
              boxShadow: isSignUp ? '0px 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}>
            Create Account
          </button>
        </div>

        {!isSignUp ? (
          /* Sign In Form */
          <form onSubmit={handleAuth} style={styles.form}>
            <h2 style={styles.formTitle}>Welcome Back</h2>
            <p style={styles.formSubtitle}>Sign in to access your Smart Waste resident account.</p>

            <label style={styles.label}>Email Address</label>
            <input type="email" placeholder="you@example.com" style={styles.input} required />

            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                style={styles.passwordInput} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                style={styles.eyeBtn}
              >
                {showPassword ? (
                  /* Password visible -> Open Eye Icon */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  /* Password hidden -> Closed/Slashed Eye Icon */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                )}
              </button>
            </div>

            <button type="submit" style={styles.submitBtn}>Sign In</button>

            <p style={styles.footerText}>
              Don't have an account? <span onClick={() => setIsSignUp(true)} style={styles.linkText}>Create one</span>
            </p>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleAuth} style={styles.form}>
            <h2 style={styles.formTitle}>Create your account</h2>
            <p style={styles.formSubtitle}>Register as a SriLankan resident to get started.</p>

            <label style={styles.label}>Full Name</label>
            <input type="text" placeholder="e.g. James Okafor" style={styles.input} required />

            <label style={styles.label}>Email Address</label>
            <input type="email" placeholder="you@example.com" style={styles.input} required />

            <label style={styles.label}>Home Zone</label>
            <select style={styles.selectInput} required>
              <option value="">— Select your zone —</option>
              <option value="Zone 1">Zone 1 - Colombo</option>
              <option value="Zone 4">Zone 4 - Anuradhapura</option>
            </select>

            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Min. 6 characters" 
                style={styles.passwordInput} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                style={styles.eyeBtn}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                )}
              </button>
            </div>

            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Repeat password" 
                style={styles.passwordInput} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                style={styles.eyeBtn}
              >
                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                )}
              </button>
            </div>

            <button type="submit" style={styles.submitBtn}>Create Account</button>

            <p style={styles.footerText}>
              Already have an account? <span onClick={() => setIsSignUp(false)} style={styles.linkText}>Sign in</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
  leftPanel: { width: '38%', backgroundColor: '#0d3b14', color: '#fff', padding: '50px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' },
  leftTitle: { fontSize: '36px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#ffffff', lineHeight: '1.2', textAlign: 'left' },
  leftDesc: { color: '#c3d8c3', fontSize: '14px', lineHeight: '1.6', textAlign: 'left' },
  
  iconBox: { fontSize: '75px', textAlign: 'center', margin: '50px 0 30px 0' },
  
  featureList: { fontSize: '14px', color: '#dce5dc', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' },
  featureItem: { display: 'flex', alignItems: 'flex-start', gap: '10px', textAlign: 'left' },
  featureIcon: { fontSize: '16px', flexShrink: 0, lineHeight: '1.4' },
  featureText: { textAlign: 'left', lineHeight: '1.4' },
  
  rightPanel: { flex: 1, backgroundColor: '#ffffff', padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  tabContainer: { display: 'flex', backgroundColor: '#e2e8e2', borderRadius: '12px', padding: '4px', width: '400px', marginBottom: '35px' },
  tabBtn: { flex: 1, border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s ease' },
  
  form: { 
    width: '400px', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'stretch', 
    textAlign: 'left' 
  },
  formTitle: { margin: '0 0 6px 0', fontSize: '28px', color: '#111111', fontWeight: 'bold', textAlign: 'left' },
  formSubtitle: { color: '#666666', fontSize: '14px', marginBottom: '24px', textAlign: 'left' },
  label: { 
    fontSize: '13px', 
    fontWeight: 'bold', 
    margin: '12px 0 6px 0', 
    color: '#111111', 
    textAlign: 'left', 
    display: 'block' 
  },
  input: { 
    padding: '14px', 
    borderRadius: '12px', 
    border: '1px solid #c0ccc0', 
    backgroundColor: '#e3ebe3', 
    marginBottom: '4px', 
    outline: 'none', 
    fontSize: '14px', 
    color: '#333333',
    width: '100%',
    boxSizing: 'border-box'
  },
  
  selectInput: {
    padding: '14px 40px 14px 14px',
    borderRadius: '12px',
    border: '1px solid #c0ccc0',
    backgroundColor: '#e3ebe3',
    marginBottom: '4px',
    outline: 'none',
    fontSize: '14px',
    color: '#333333',
    width: '100%',
    boxSizing: 'border-box',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23333333' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    textAlign: 'center',
    textAlignLast: 'center',
    cursor: 'pointer'
  },
  
  passwordWrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: '4px'
  },
  passwordInput: {
    padding: '14px 45px 14px 14px',
    borderRadius: '12px',
    border: '1px solid #c0ccc0',
    backgroundColor: '#e3ebe3',
    outline: 'none',
    fontSize: '14px',
    color: '#333333',
    width: '100%',
    boxSizing: 'border-box'
  },
  eyeBtn: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 0
  },

  submitBtn: { 
    backgroundColor: '#0d3b14', 
    color: '#ffffff', 
    border: 'none', 
    padding: '16px', 
    borderRadius: '12px', 
    fontWeight: 'bold', 
    fontSize: '16px', 
    cursor: 'pointer', 
    marginTop: '25px', 
    width: '100%' 
  },
  footerText: { textAlign: 'center', fontSize: '14px', color: '#666666', marginTop: '20px' },
  linkText: { color: '#0d3b14', fontWeight: 'bold', cursor: 'pointer' }
};

export default AuthPage;