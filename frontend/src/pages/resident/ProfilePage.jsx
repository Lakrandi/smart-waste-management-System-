import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    zone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setFormData({
          fullName: parsed.fullName || parsed.name || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          zone: parsed.zone || parsed.district || '',
          address: parsed.address || '',
        });
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      if (token) {
        const res = await axios.put(
          'https://cleantrack-backend-hst9.onrender.com/api/users/profile',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedData = { ...storedUser, ...formData, ...(res.data.user || res.data) };
        localStorage.setItem('user', JSON.stringify(updatedData));
      } else {
        const updatedData = { ...storedUser, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedData));
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error saving profile:', error);

      const fallbackData = { ...storedUser, ...formData };
      localStorage.setItem('user', JSON.stringify(fallbackData));

      setMessage({ type: 'success', text: 'Profile updated in session!' });
    }
  };

  const initial = formData.fullName && formData.fullName.trim() !== ''
    ? formData.fullName.trim().charAt(0).toUpperCase()
    : 'U';

  return (
    <div className="profile-wrapper">
      <style>{`
        .profile-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: #f9f9f9;
          font-family: Arial, sans-serif;
        }
        .profile-content {
          flex: 1;
          margin-left: 260px;
          padding: 30px 20px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
        }
        .profile-inner {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
        }
        .profile-title {
          margin: 0 0 6px 0;
          font-size: 26px;
          font-weight: bold;
          color: #000000;
          text-align: left;
        }
        .profile-subtitle {
          font-size: 13px;
          color: #555555;
          margin: 0 0 20px 0;
          text-align: left;
        }
        .profile-header-box {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }
        .profile-avatar-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #0d3b14;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: bold;
          flex-shrink: 0;
        }
        .profile-user-name {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
          color: #000000;
          text-align: left;
        }
        .profile-user-sub {
          margin: 2px 0 0 0;
          font-size: 12px;
          color: #666666;
          text-align: left;
        }
        .profile-card {
          background-color: #dcdcdc;
          border-radius: 16px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          text-align: left;
          box-sizing: border-box;
          width: 100%;
        }
        .profile-label {
          display: block;
          font-size: 11px;
          font-weight: bold;
          color: #333333;
          margin-bottom: 6px;
          margin-top: 12px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .profile-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 25px;
          border: none;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
          background-color: #ffffff;
          color: #333333;
        }
        .profile-textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 14px;
          border: none;
          font-size: 13px;
          outline: none;
          resize: none;
          box-sizing: border-box;
          background-color: #ffffff;
          color: #333333;
          font-family: Arial, sans-serif;
        }
        .profile-save-btn {
          width: 100%;
          background-color: #0d3b14;
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 12px;
          cursor: pointer;
          margin-top: 20px;
          letter-spacing: 0.5px;
        }
        
        /* Responsive Fix for Mobile View */
        @media (max-width: 768px) {
          .profile-content {
            margin-left: 0px;
            padding: 20px 15px;
          }
        }
      `}</style>

      <Sidebar />

      <div className="profile-content">
        <div className="profile-inner">
          <h1 className="profile-title">Profile</h1>
          <p className="profile-subtitle">
            Keep your contact details up to date so alerts reach you.
          </p>

          {loading ? (
            <div style={{ padding: '20px 0', color: '#555' }}>Loading user details...</div>
          ) : (
            <>
              <div className="profile-header-box">
                <div className="profile-avatar-circle">{initial}</div>
                <div>
                  <h2 className="profile-user-name">{formData.fullName || 'User Name'}</h2>
                  <p className="profile-user-sub">{formData.zone || 'District / Zone'}</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="profile-card">
                {message.text && (
                  <div
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      marginBottom: '15px',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                      backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                      color: message.type === 'success' ? '#155724' : '#721c24',
                    }}
                  >
                    {message.text}
                  </div>
                )}

                <label className="profile-label" style={{ marginTop: 0 }}>FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="profile-input"
                  required
                />

                <label className="profile-label">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="profile-input"
                  required
                />

                <label className="profile-label">PHONE</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="profile-input"
                />

                <label className="profile-label">ZONE</label>
                <input
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  className="profile-input"
                />

                <label className="profile-label">ADDRESS</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="profile-textarea"
                  rows="2"
                />

                <button type="submit" className="profile-save-btn">
                  SAVE CHANGES
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;