import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';


const AdminSchedule = () => {
  // Initial state with existing schedule items
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      date: '16 Jul 2026',
      time: '9:00 AM',
      type: 'Recyclable',
      zone: 'Zone 4 — Anuradhapura',
    },
    {
      id: 2,
      date: '17 Jul 2026',
      time: '8:30 AM',
      type: 'Recyclable',
      zone: 'Zone 1 — Town Centre',
    },
    {
      id: 3,
      date: '19 Jul 2026',
      time: '9:00 AM',
      type: 'Non-recyclable',
      zone: 'Zone 4 — Anuradhapura',
    },
    {
      id: 4,
      date: '23 Jul 2026',
      time: '9:00 AM',
      type: 'Recyclable',
      zone: 'Zone 4 — Anuradhapura',
    },
  ]);

  // Form input state
  const [formData, setFormData] = useState({
    date: '',
    time: '09:00 AM',
    type: 'Recyclable',
    zone: 'Zone 4 — Anuradhapura',
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding new schedule item
  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time) return;

    const newEntry = {
      id: Date.now(),
      date: formData.date,
      time: formData.time,
      type: formData.type,
      zone: formData.zone,
    };

    setSchedules([...schedules, newEntry]);
    setFormData({
      date: '',
      time: '09:00 AM',
      type: 'Recyclable',
      zone: 'Zone 4 — Anuradhapura',
    });
  };

  // Handle removing a schedule item
  const handleRemove = (id) => {
    setSchedules(schedules.filter((item) => item.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f2f5f2', fontFamily: 'sans-serif' }}>
      {/* Imported AdminSidebar Component */}
      <AdminSidebar />

      {/* Main Content Container */}
      <div style={{ flex: 1, padding: '40px' }}>
        {/* Header */}
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0', color: '#000' }}>
          Manage Collection Schedule
        </h1>
        <p style={{ color: '#555', fontSize: '14px', marginBottom: '32px' }}>
          Add or remove upcoming collection days — residents see this instantly on their Schedule page.
        </p>

        {/* Content Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Form: Add Collection Day */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#111', marginBottom: '20px', letterSpacing: '0.5px' }}>
              ADD COLLECTION DAY
            </h3>

            <form onSubmit={handleAddSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#555', marginBottom: '6px' }}>
                  DATE
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#bde2b9',
                    border: 'none',
                    outline: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#555', marginBottom: '6px' }}>
                  TIME
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#bde2b9',
                    border: 'none',
                    outline: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#555', marginBottom: '6px' }}>
                  WASTE TYPE
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#bde2b9',
                    border: 'none',
                    outline: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Recyclable">Recyclable</option>
                  <option value="Non-recyclable">Non-recyclable</option>
                  <option value="Organic">Organic</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#555', marginBottom: '6px' }}>
                  ZONE
                </label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#bde2b9',
                    border: 'none',
                    outline: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Zone 4 — Anuradhapura">Zone 4 — Anuradhapura</option>
                  <option value="Zone 1 — Town Centre">Zone 1 — Town Centre</option>
                  <option value="Zone 2 — North Suburbs">Zone 2 — North Suburbs</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '12px',
                  backgroundColor: '#173f1a',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}
              >
                ADD TO SCHEDULE
              </button>
            </form>
          </div>

          {/* Right Section: Published Schedule Table */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#111', marginBottom: '20px', letterSpacing: '0.5px' }}>
              PUBLISHED SCHEDULE — ALL ZONES
            </h3>

            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #173f1a',
              overflow: 'hidden'
            }}>
              {/* Header Row */}
              <div style={{
                backgroundColor: '#173f1a',
                color: '#ffffff',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1.3fr 2fr 1fr',
                padding: '14px 24px',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '0.5px'
              }}>
                <div>DATE</div>
                <div>TIME</div>
                <div>TYPE</div>
                <div>ZONE</div>
                <div></div>
              </div>

              {/* Data Rows */}
              {schedules.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1.3fr 2fr 1fr',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: index !== schedules.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}
                >
                  <div style={{ fontWeight: '800', fontSize: '14px' }}>{item.date}</div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.time}</div>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: item.type === 'Non-recyclable' ? '#000000' : '#d2ebd0',
                      color: item.type === 'Non-recyclable' ? '#ffffff' : '#000000',
                      padding: '6px 16px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}>
                      {item.type}
                    </span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#222' }}>{item.zone}</div>
                  <div style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleRemove(item.id)}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #333',
                        borderRadius: '20px',
                        padding: '6px 16px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSchedule;

