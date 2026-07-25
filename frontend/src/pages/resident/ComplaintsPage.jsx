import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar'; 

const ComplaintsPage = () => {
   
  const [complaints, setComplaints] = useState([
    {
      id: 'A-247',
      type: 'Overflowing bin',
      location: 'Temple Junction',
      reviewStatus: 'In review',
      status: 'Pending'
    },
    {
      id: 'A-245',
      type: 'Illegal dumping',
      location: 'Canal Rd',
      reviewStatus: 'Resolved',
      status: 'Closed'
    }
  ]);

   
  const [issueType, setIssueType] = useState('Overflowing bin');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

   
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!location.trim()) {
      alert('Please enter a location!');
      return;
    }

    const newTicket = {
      id: `A-${Math.floor(100 + Math.random() * 900)}`,
      type: issueType,
      location: location,
      reviewStatus: 'In review',
      status: 'Pending'
    };

     
    setComplaints([newTicket, ...complaints]);

     
    setLocation('');
    setDescription('');
    setPhoto(null);
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', padding: '40px', flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>Complaints</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>
          Report overflowing bins or illegal dumping - the council is notified instantly.
        </p>

        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Form Side */}
          <form onSubmit={handleSubmit} style={{ flex: 1, backgroundColor: '#dce5dc', padding: '25px', borderRadius: '12px' }}>
            <h3 style={{ marginTop: 0 }}>NEW COMPLAINT</h3>
            
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

            <label style={labelStyle}>LOCATION</label>
            <input 
              type="text" 
              placeholder="e.g. Near the temple junction" 
              style={inputStyle} 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <label style={labelStyle}>PHOTO</label>
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
          <div style={{ flex: 1 }}>
            <h3 style={{ marginTop: 0 }}>YOUR COMPLAINTS</h3>

            {complaints.map((ticket) => (
              <div key={ticket.id} style={ticketCard}>
                <div>
                  <span style={{ fontSize: '11px', color: '#777' }}>TICKET #{ticket.id}</span>
                  <h4 style={{ margin: '5px 0' }}>{ticket.type}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{ticket.location}</p>
                  <span style={pillBtn}>{ticket.reviewStatus}</span>
                </div>
                <div style={statusRight}>
                  <span style={{ fontSize: '10px', color: '#888' }}>STATUS</span>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{ticket.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', margin: '12px 0 4px 0' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #bbb', boxSizing: 'border-box' };
const photoDrop = { display: 'block', border: '2px dashed #999', padding: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '13px', color: '#555', cursor: 'pointer', backgroundColor: '#fff' };
const greenBtn = { backgroundColor: '#0d3b14', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' };
const ticketCard = { backgroundColor: '#dcdcdc', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', marginBottom: '15px' };
const statusRight = { borderLeft: '1px dotted #999', paddingLeft: '15px', textAlign: 'center' };
const pillBtn = { display: 'inline-block', backgroundColor: '#fff', padding: '3px 12px', borderRadius: '10px', fontSize: '11px', marginTop: '8px', border: '1px solid #ccc' };

export default ComplaintsPage;