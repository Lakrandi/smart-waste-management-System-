import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const ProfilePage = () => {
  // Profile state matching design defaults
  const [formData, setFormData] = useState({
    fullName: 'Priyantha Fernando',
    email: 'priyantha@email.com',
    phone: '+94 77 123 657',
    zone: 'Zone 4 - Anuradhapura',
    address: 'No. 24, Temple Road, Anuradhapura',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved Profile Data:', formData);
    alert('Profile updated successfully!');
  };

  // Helper to extract the first letter for the avatar circle
  const initial = formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'P';

  return (
    <div style={styles.container}>
      {/* Shared Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={styles.content}>
        <div style={styles.innerContainer}>
          <h1 style={styles.title}>Profile</h1>
          <p style={styles.subtitle}>
            Keep your contact details up to date so alerts reach you.
          </p>

          {/* User Header Badge */}
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>{initial}</div>
            <div style={styles.headerInfo}>
              <h2 style={styles.userName}>{formData.fullName}</h2>
              <p style={styles.userSubText}>{formData.zone}</p>
            </div>
          </div>

          {/* Form Card Container */}
          <form onSubmit={handleSave} style={styles.card}>
            <label style={styles.label}>FULL NAME</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>PHONE</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>ZONE</label>
            <input
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>ADDRESS</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={styles.textarea}
              rows="2"
            />

            <button type="submit" style={styles.saveBtn}>
              SAVE CHANGES
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    marginLeft: '260px', // Matches sidebar width
    flex: 1,
    padding: '35px 50px',
    display: 'flex',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
  },
  innerContainer: {
    width: '100%',
    maxWidth: '680px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: '0 0 6px 0',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: '13px',
    color: '#555555',
    margin: '0 0 25px 0',
    textAlign: 'left',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '25px',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#0d3b14',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  userName: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000000',
  },
  userSubText: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#666666',
  },
  card: {
    backgroundColor: '#dcdcdc',
    borderRadius: '16px',
    padding: '25px 28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '6px',
    marginTop: '12px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '12px 18px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#333333',
  },
  textarea: {
    width: '100%',
    padding: '12px 18px',
    borderRadius: '16px',
    border: 'none',
    fontSize: '13px',
    outline: 'none',
    resize: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#333333',
    fontFamily: 'Arial, sans-serif',
  },
  saveBtn: {
    width: '100%',
    backgroundColor: '#0d3b14',
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    marginTop: '25px',
    letterSpacing: '0.5px',
  },
};

export default ProfilePage;