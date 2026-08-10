import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, date: '16 Jul 2026', time: '09:00 AM', type: 'Recyclable', zone: 'Zone 4 — Anuradhapura' },
    { id: 2, date: '17 Jul 2026', time: '08:30 AM', type: 'Recyclable', zone: 'Zone 1 — Town Centre' },
    { id: 3, date: '19 Jul 2026', time: '09:00 AM', type: 'Non-recyclable', zone: 'Zone 4 — Anuradhapura' },
    { id: 4, date: '23 Jul 2026', time: '09:00 AM', type: 'Recyclable', zone: 'Zone 4 — Anuradhapura' },
  ]);

  const [formData, setFormData] = useState({
    date: '',
    time: '09:00 AM',
    type: 'Recyclable',
    zone: 'Zone 4 — Anuradhapura',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time) return;

    const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newEntry = {
      id: Date.now(),
      date: formattedDate,
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

  const handleRemove = (id) => {
    setSchedules(schedules.filter((item) => item.id !== id));
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

      <div style={{ flex: 1, marginLeft: '260px', padding: '32px 24px', minWidth: 0 }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
          Manage Collection Schedule
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          
          {/* UPDATED: Light Green Form Card */}
          <div style={{
            flex: '1 1 300px',
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #bbf7d0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#166534', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Add New Entry
            </h3>

            <form onSubmit={handleAddSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                  DATE
                </label>
                {/* UPDATED: Light Green Input Fill */}
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{
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
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                  TIME
                </label>
                {/* UPDATED: Light Green Input Fill */}
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="e.g. 09:00 AM"
                  style={{
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
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                  WASTE TYPE
                </label>
                {/* UPDATED: Light Green Select Box */}
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#e8f5e9',
                    border: '1px solid #a7f3d0',
                    color: '#064e3b',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Recyclable">Recyclable</option>
                  <option value="Non-recyclable">Non-recyclable</option>
                  <option value="Organic">Organic</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                  ZONE
                </label>
                {/* UPDATED: Light Green Select Box */}
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#e8f5e9',
                    border: '1px solid #a7f3d0',
                    color: '#064e3b',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    outline: 'none',
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

          {/* Table Section */}
          <div style={{
            flex: '2 1 480px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '95px 85px 125px 1fr 65px',
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
              <div>ZONE</div>
              <div style={{ textAlign: 'right' }}>ACTION</div>
            </div>

            {schedules.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '95px 85px 125px 1fr 65px',
                  padding: '16px',
                  alignItems: 'center',
                  borderBottom: index !== schedules.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', whiteSpace: 'nowrap' }}>{item.date}</div>
                <div style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>{item.time}</div>
                <div>
                  <span style={getTypeBadgeStyle(item.type)}>{item.type}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.zone}</div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handleRemove(item.id)}
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
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSchedule;