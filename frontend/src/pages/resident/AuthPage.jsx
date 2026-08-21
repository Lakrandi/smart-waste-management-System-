import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SRI_LANKA_DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", 
  "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", 
  "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", 
  "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", 
  "Trincomalee", "Vavuniya"
];

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Form Data and Alert States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    district: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Register & Login Submit
  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (isSignUp) {
      // ---------------- REGISTER LOGIC ----------------
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        return;
      }

      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'resident',
          district: formData.district
        });

        // Save token and user details to localStorage on registration (Auto Login)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // Direct navigation to Resident Home
        navigate('/home');
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Try again.');
      }
    } else {
      // ---------------- LOGIN LOGIC ----------------
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });

        // Save Token & User to LocalStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // Role-Based Navigation
        const role = res.data.user?.role;
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'driver') {
          navigate('/driver-dashboard');
        } else {
          navigate('/home');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid email or password.');
      }
    }
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

        {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', fontSize: '14px', marginBottom: '10px' }}>{successMessage}</p>}

        {!isSignUp ? (
          /* Sign In Form */
          <form onSubmit={handleAuth} style={styles.form}>
            <h2 style={styles.formTitle}>Welcome Back</h2>
            <p style={styles.formSubtitle}>Sign in to access your Smart Waste resident account.</p>

            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
              style={styles.input} 
              required 
            />

            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                )}
              </button>
            </div>

            <button type="submit" style={styles.submitBtn}>Sign In</button>

            <p style={styles.footerText}>
              Don't have an account? <span onClick={() => setIsSignUp(true)} style={styles.linkText}>Create one</span>
            </p>
            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}> 
              <p style={{ margin: 0, fontSize: '13px', color: '#666666' }}>
                Are you a Council Officer or Admin?{' '}
                <span
                  onClick={() => navigate('/admin/login')}
                  style={{ color: '#0d3b14', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Admin Login
                </span>
              </p>
            </div>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleAuth} style={styles.form}>
            <h2 style={styles.formTitle}>Create your account</h2>
            <p style={styles.formSubtitle}>Register as a SriLankan resident to get started.</p>

            <label style={styles.label}>Full Name</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. James Okafor"
              style={styles.input} 
              required 
            />

            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
              style={styles.input} 
              required 
            />

            <label style={styles.label}>District</label>
            <select 
              name="district"
              value={formData.district}
              onChange={handleChange}
              style={styles.selectInput} 
              required
            >
              <option value="">— Select your district —</option>
              {SRI_LANKA_DISTRICTS.map((district, idx) => (
                <option key={idx} value={district}>{district}</option>
              ))}
            </select>

            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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
            <div style={styles.backToRoleWrapper}>
              <button 
                type="button" 
                onClick={() => navigate('/')} 
                style={styles.backToRoleBtn}
              >
                ← Back to role selection
              </button>
            </div>
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
  form: { width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'stretch', textAlign: 'left' },
  formTitle: { margin: '0 0 6px 0', fontSize: '28px', color: '#111111', fontWeight: 'bold', textAlign: 'left' },
  formSubtitle: { color: '#666666', fontSize: '14px', marginBottom: '24px', textAlign: 'left' },
  label: { fontSize: '13px', fontWeight: 'bold', margin: '12px 0 6px 0', color: '#111111', textAlign: 'left', display: 'block' },
  input: { padding: '14px', borderRadius: '12px', border: '1px solid #c0ccc0', backgroundColor: '#e3ebe3', marginBottom: '4px', outline: 'none', fontSize: '14px', color: '#333333', width: '100%', boxSizing: 'border-box' },
  selectInput: {
    padding: '14px 40px 14px 14px', borderRadius: '12px', border: '1px solid #c0ccc0', backgroundColor: '#e3ebe3', marginBottom: '4px', outline: 'none', fontSize: '14px', color: '#333333', width: '100%', boxSizing: 'border-box', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23333333' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', textAlign: 'center', textAlignLast: 'center', cursor: 'pointer'
  },
  passwordWrapper: { position: 'relative', width: '100%', marginBottom: '4px' },
  passwordInput: { padding: '14px 45px 14px 14px', borderRadius: '12px', border: '1px solid #c0ccc0', backgroundColor: '#e3ebe3', outline: 'none', fontSize: '14px', color: '#333333', width: '100%', boxSizing: 'border-box' },
  eyeBtn: { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 },
  submitBtn: { backgroundColor: '#0d3b14', color: '#ffffff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '25px', width: '100%' },
  footerText: { textAlign: 'center', fontSize: '14px', color: '#666666', marginTop: '20px' },
  linkText: { color: '#0d3b14', fontWeight: 'bold', cursor: 'pointer' },
  backToRoleWrapper: { marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e0e0e0', textAlign: 'center', width: '100%' },
  backToRoleBtn: { background: 'none', border: 'none', color: '#666666', cursor: 'pointer', fontSize: '13px' }
};

export default AuthPage;