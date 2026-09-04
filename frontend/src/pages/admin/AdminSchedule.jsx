import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';

const SRI_LANKA_DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '09:00 AM',
    wasteType: 'Recyclable',
    district: 'Anuradhapura',
    area: ''
  });

  const API_URL = 'https://cleantrack-backend-hst9.onrender.com/api/schedules';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedules(res.data.data || res.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.timeSlot) return;

    try {
      const token = localStorage.getItem('token');
      const selectedDate = new Date(formData.date);
      const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

      const payload = {
        ...formData,
        day: dayName
      };

      const res = await axios.post(
        API_URL,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const newSchedule = res.data.data || res.data;
      setSchedules([newSchedule, ...schedules]);

      setFormData({
        date: '',
        timeSlot: '09:00 AM',
        wasteType: 'Recyclable',
        district: 'Anuradhapura',
        area: ''
      });

      alert('Schedule added successfully!');
    } catch (error) {
      console.error('Error adding schedule:', error);
      alert(error.response?.data?.message || 'Failed to add schedule');
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedules(schedules.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule');
    }
  };

  const getTypeBadgeStyle = (type) => {
    const base = {
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '700',
      textAlign: 'center',
      display: 'inline-block',
      whiteSpace: 'nowrap',
    };
    if (type === 'Non-recyclable') return { ...base, backgroundColor: '#fee2e2', color: '#991b1b' };
    if (type === 'Organic') return { ...base, backgroundColor: '#fef3c7', color: '#92400e' };
    return { ...base, backgroundColor: '#dcfce7', color: '#166534' };
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0px' : '260px',
        padding: isMobile ? '80px 16px 20px 16px' : '32px 24px',
        minWidth: 0
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
          Manage Collection Schedule
        </h1>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px', alignItems: 'flex-start' }}>

          {/* Form Card */}
          <div style={{
            width: isMobile ? '100%' : '320px',
            flexShrink: 0,
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #bbf7d0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#166534', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Add New Entry
            </h3>

            <form onSubmit={handleAddSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>DATE</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>TIME SLOT</label>
                <input
                  type="text"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  placeholder="e.g. 09:00 AM"
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>WASTE TYPE</label>
                <select
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="Recyclable">Recyclable</option>
                  <option value="Non-recyclable">Non-recyclable</option>
                  <option value="Organic">Organic</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>DISTRICT</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  {SRI_LANKA_DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>SPECIFIC AREA (OPTIONAL)</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. Town Centre / Stage 1"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '8px',
                  backgroundColor: '#064e3b',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}
              >
                ADD TO SCHEDULE
              </button>
            </form>
          </div>

          {/* Schedule List / Table */}
          <div style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            overflowX: 'auto'
          }}>
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Loading schedules...</div>
            ) : schedules.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No schedules available</div>
            ) : (
              <div style={{ minWidth: isMobile ? '100%' : '580px' }}>
                {/* Header (Hidden on Mobile for Card View) */}
                {!isMobile && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '110px 100px 130px 1fr 70px',
                    padding: '14px 16px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontSize: '11px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    alignItems: 'center'
                  }}>
                    <div>DATE</div>
                    <div>TIME</div>
                    <div>TYPE</div>
                    <div>DISTRICT</div>
                    <div style={{ textAlign: 'right' }}>ACTION</div>
                  </div>
                )}

                {/* Rows / Cards */}
                {schedules.map((item, index) => (
                  <div
                    key={item._id || index}
                    style={isMobile ? {
                      padding: '16px',
                      borderBottom: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    } : {
                      display: 'grid',
                      gridTemplateColumns: '110px 100px 130px 1fr 70px',
                      padding: '16px',
                      alignItems: 'center',
                      borderBottom: index !== schedules.length - 1 ? '1px solid #f1f5f9' : 'none'
                    }}
                  >
                    {isMobile ? (
                      /* Mobile Card Layout */
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                            {item.date} ({item.timeSlot || item.time})
                          </span>
                          <span style={getTypeBadgeStyle(item.wasteType || item.type)}>
                            {item.wasteType || item.type}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                          <span style={{ fontSize: '13px', color: '#334155' }}>
                            📍 {item.district} {item.area ? `(${item.area})` : ''}
                          </span>
                          <button
                            onClick={() => handleRemove(item._id)}
                            style={{
                              cursor: 'pointer',
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              fontSize: '12px',
                              fontWeight: '600',
                              textDecoration: 'underline',
                              padding: 0
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Desktop Grid Row */
                      <>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', whiteSpace: 'nowrap' }}>{item.date}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>{item.timeSlot || item.time}</div>
                        <div>
                          <span style={getTypeBadgeStyle(item.wasteType || item.type)}>{item.wasteType || item.type}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.district} {item.area ? `(${item.area})` : ''}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => handleRemove(item._id)}
                            style={{
                              cursor: 'pointer',
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              fontSize: '12px',
                              fontWeight: '600',
                              textDecoration: 'underline',
                              padding: 0
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '700',
  color: '#374151',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  backgroundColor: '#e8f5e9',
  border: '1px solid #a7f3d0',
  color: '#064e3b',
  fontWeight: '600',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box'
};

export default AdminSchedule;