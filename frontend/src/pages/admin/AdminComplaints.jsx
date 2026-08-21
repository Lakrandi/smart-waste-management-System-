import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';

// List of all districts in Sri Lanka, including an option for "All Districts"
const SRI_LANKA_DISTRICTS = [
  "All Districts",
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const AdminComplaints = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');

  // Fetch complaints whenever the selected district changes
  useEffect(() => {
    fetchComplaints();
  }, [selectedDistrict]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let url = 'http://localhost:5000/api/complaints';
      
      if (selectedDistrict !== 'All Districts') {
        url += `?district=${selectedDistrict}`;
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTickets(res.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle marking a complaint as resolved
  const handleMarkResolved = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        { status: 'Resolved' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local state to reflect the change without refetching
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === id ? { ...ticket, status: 'Resolved' } : ticket
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div style={styles.container}>
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.innerContainer}>
          <h1 style={styles.title}>Complaints</h1>
          <p style={styles.subtitle}>
            Review resident complaints and mark them resolved.
          </p>

          {/* District Filter Section */}
          <div style={styles.filterSection}>
            <label style={styles.filterLabel}>FILTER BY DISTRICT:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={styles.filterSelect}
            >
              {SRI_LANKA_DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Ticket Cards List */}
          <div style={styles.ticketList}>
            {loading ? (
              <p style={{ color: '#666' }}>Loading complaints...</p>
            ) : tickets.length === 0 ? (
              <p style={{ color: '#666' }}>No complaints found for this selection.</p>
            ) : (
              tickets.map((ticket) => {
                const isResolved = ticket.status === 'Resolved';
                
                return (
                  <div key={ticket._id} style={styles.card}>
                    {/* Left Side: Ticket Details */}
                    <div style={styles.cardLeft}>
                      <span style={styles.ticketId}>
                        TICKET #{ticket._id.substring(ticket._id.length - 6).toUpperCase()}
                      </span>
                      <h3 style={styles.ticketType}>{ticket.title}</h3>
                      <p style={styles.districtText}>
                        <strong>District:</strong> {ticket.district}
                      </p>
                      <p style={styles.location}>{ticket.description}</p>

                      {/* Status Badge */}
                      <div
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: isResolved ? '#8fc499' : '#D8E2D8',
                          color: isResolved ? '#0d3b14' : '#2d5a34',
                        }}
                      >
                        {isResolved ? '✓ Resolved' : ticket.status}
                      </div>
                    </div>

                    {/* Right Side: Action Button */}
                    <div style={styles.cardRight}>
                      {isResolved ? (
                        <button style={styles.resolvedBtn} disabled>
                          RESOLVED
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkResolved(ticket._id)}
                          style={styles.markBtn}
                        >
                          MARK RESOLVED
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f2f6f3',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    marginLeft: '260px',
    flex: 1,
    padding: '40px 50px',
    display: 'flex',
    justify: 'flex-start',
    boxSizing: 'border-box',
  },
  innerContainer: {
    width: '100%',
    maxWidth: '780px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  title: {
    margin: '0 0 6px 0',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: '14px',
    color: '#555555',
    margin: '0 0 20px 0',
    textAlign: 'left',
  },
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    backgroundColor: '#ffffff',
    padding: '12px 18px',
    borderRadius: '10px',
    border: '1px solid #d0d0d0',
    width: '100%',
    boxSizing: 'border-box',
  },
  filterLabel: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: '0.5px',
  },
  filterSelect: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#0d3b14',
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: '#f8faf8',
  },
  ticketList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #d0d0d0',
    padding: '20px 24px',
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  cardLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    flex: 1,
  },
  ticketId: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#333333',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  ticketType: {
    margin: '6px 0 4px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000000',
  },
  districtText: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    color: '#2d5a34',
  },
  location: {
    margin: '0 0 12px 0',
    fontSize: '13px',
    color: '#555555',
    whiteSpace: 'pre-line',
  },
  statusBadge: {
    width: '100%',
    maxWidth: '280px',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  cardRight: {
    borderLeft: '2px solid #a0a0a0',
    alignSelf: 'stretch',
    paddingLeft: '30px',
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    minWidth: '160px',
  },
  markBtn: {
    backgroundColor: '#0d3b14',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  resolvedBtn: {
    backgroundColor: '#0d3b14',
    color: '#ffffff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'default',
    letterSpacing: '0.5px',
    opacity: 0.9,
  },
};

export default AdminComplaints;