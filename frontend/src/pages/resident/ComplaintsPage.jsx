import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

// List of all districts in Sri Lanka
const SRI_LANKA_DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [issueType, setIssueType] = useState('Overflowing bin');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('Anuradhapura');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  // 1. Fetch complaints of the logged-in user when the component mounts
  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const res = await axios.get('http://localhost:5000/api/complaints/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle form submission for new complaints
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location.trim()) {
      alert('Please enter a location!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const fullDescription = `Location: ${location}${description ? ` | Details: ${description}` : ''}`;

      const res = await axios.post(
        'http://localhost:5000/api/complaints',
        {
          title: issueType,
          description: fullDescription,
          district: district
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update the complaints list with the newly added complaint
      setComplaints([res.data.data, ...complaints]);
      setLocation('');
      setDescription('');
      setPhoto(null);
      alert('Complaint submitted successfully!');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert(error.response?.data?.message || 'Failed to submit complaint');
    }
  };

  const getStatusBadgeStyle = (status) => {
    if (status === 'Resolved') return { backgroundColor: '#dcfce7', color: '#166534' };
    if (status === 'In Progress') return { backgroundColor: '#fef3c7', color: '#92400e' };
    return { backgroundColor: '#fee2e2', color: '#991b1b' }; // Pending
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', padding: '40px', flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>Complaints</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>
          Report overflowing bins or illegal dumping - the council is notified instantly.
        </p>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* Form Side */}
          <form onSubmit={handleSubmit} style={{ flex: '1 1 380px', backgroundColor: '#dce5dc', padding: '25px', borderRadius: '12px' }}>
            <h3 style={{ marginTop: 0, fontSize: '14px', fontWeight: '800', color: '#0d3b14' }}>NEW COMPLAINT</h3>
            
            <label style={labelStyle}>ISSUE TYPE</label>
            <select 
              style={inputStyle} 
              value={issueType} 
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option value="Overflowing bin">Overflowing bin</option>
              <option value="Illegal dumping">Illegal dumping</option>
              <option value="Damaged bin">Damaged bin</option>
              <option value="Missed collection">Missed collection</option>
            </select>

            <label style={labelStyle}>DISTRICT</label>
            <select
              style={inputStyle}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              {SRI_LANKA_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            <label style={labelStyle}>LOCATION</label>
            <input 
              type="text" 
              placeholder="e.g. Near the temple junction" 
              style={inputStyle} 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <label style={labelStyle}>PHOTO (OPTIONAL)</label>
            <label style={photoDrop}>
              {photo ? `📷 Selected: ${photo.name}` : '📷 Tap to add a photo of the issue'}
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </label>

            <label style={labelStyle}>DESCRIPTION (OPTIONAL)</label>
            <textarea 
              placeholder="Any extra detail that helps the crew" 
              style={{ ...inputStyle, height: '70px' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button type="submit" style={{ ...greenBtn, width: '100%' }}>SUBMIT COMPLAINT</button>
          </form>

          {/* List Side */}
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ marginTop: 0, fontSize: '14px', fontWeight: '800' }}>YOUR COMPLAINTS</h3>

            {loading ? (
              <p style={{ color: '#666' }}>Loading complaints...</p>
            ) : complaints.length === 0 ? (
              <p style={{ color: '#666' }}>No complaints submitted yet.</p>
            ) : (
              complaints.map((ticket) => (
                <div key={ticket._id} style={ticketCard}>
                  <div style={{ flex: 1, paddingRight: '10px' }}>
                    <span style={{ fontSize: '11px', color: '#777', fontWeight: '600' }}>
                      ID: #{ticket._id.substring(ticket._id.length - 6).toUpperCase()}
                    </span>
                    <h4 style={{ margin: '4px 0', fontSize: '15px' }}>{ticket.title}</h4>
                    <p style={{ margin: '2px 0', fontSize: '12px', color: '#555' }}>
                      <strong>District:</strong> {ticket.district}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666', whiteSpace: 'pre-line' }}>
                      {ticket.description}
                    </p>
                  </div>
                  <div style={statusRight}>
                    <span style={{ fontSize: '10px', color: '#888', fontWeight: '700' }}>STATUS</span>
                    <p style={{
                      margin: '6px 0 0 0',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      ...getStatusBadgeStyle(ticket.status)
                    }}>
                      {ticket.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', margin: '12px 0 4px 0' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #bbb', boxSizing: 'border-box' };
const photoDrop = { display: 'block', border: '2px dashed #999', padding: '12px', borderRadius: '8px', textAlign: 'center', fontSize: '12px', color: '#555', cursor: 'pointer', backgroundColor: '#fff' };
const greenBtn = { backgroundColor: '#0d3b14', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' };
const ticketCard = { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' };
const statusRight = { borderLeft: '1px solid #eee', paddingLeft: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '90px' };

export default ComplaintsPage;