import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [selectedDistrict]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let url = 'https://cleantrack-backend-hst9.onrender.com/api/complaints';
      
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

  const handleMarkResolved = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://cleantrack-backend-hst9.onrender.com/api/complaints/${id}`,
        { status: 'Resolved' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
      <AdminSidebar />

      <div
        style={{
          ...styles.content,
          marginLeft: isMobile ? '0px' : '260px',
          padding: isMobile ? '80px 15px 20px 15px' : '40px 50px',
        }}
      >
        <div style={styles.innerContainer}>
          <h1 style={styles.title}>Complaints</h1>
          <p style={styles.subtitle}>
            Review resident complaints and mark them resolved.
          </p>

          <div
            style={{
              ...styles.filterSection,
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
            }}
          >
            <label style={styles.filterLabel}>FILTER BY DISTRICT:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={{
                ...styles.filterSelect,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              {SRI_LANKA_DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.ticketList}>
            {loading ? (
              <p style={{ color: '#666' }}>Loading complaints...</p>
            ) : tickets.length === 0 ? (
              <p style={{ color: '#666' }}>No complaints found for this selection.</p>
            ) : (
              tickets.map((ticket) => {
                const isResolved = ticket.status === 'Resolved';
                
                return (
                  <div
                    key={ticket._id}
                    style={{
                      ...styles.card,
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      gap: isMobile ? '14px' : '20px',
                    }}
                  >
                    <div style={styles.cardLeft}>
                      <div style={styles.cardHeaderRow}>
                        <span style={styles.ticketId}>
                          TICKET #{ticket._id.substring(ticket._id.length - 6).toUpperCase()}
                        </span>
                        <span
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: isResolved ? '#8fc499' : '#fcd34d',
                            color: isResolved ? '#0d3b14' : '#78350f',
                          }}
                        >
                          {isResolved ? '✓ Resolved' : ticket.status || 'Pending'}
                        </span>
                      </div>

                      <h3 style={styles.ticketType}>{ticket.title}</h3>
                      <p style={styles.districtText}>
                        <strong>District:</strong> {ticket.district}
                      </p>
                      <p style={styles.location}>{ticket.description}</p>
                    </div>

                    {!isResolved && (
                      <div
                        style={{
                          ...styles.cardRight,
                          borderLeft: isMobile ? 'none' : '1px solid #d0d0d0',
                          borderTop: isMobile ? '1px solid #e0e0e0' : 'none',
                          paddingLeft: isMobile ? '0' : '20px',
                          paddingTop: isMobile ? '12px' : '0',
                          width: isMobile ? '100%' : 'auto',
                        }}
                      >
                        <button
                          onClick={() => handleMarkResolved(ticket._id)}
                          style={{
                            ...styles.markBtn,
                            width: isMobile ? '100%' : 'auto',
                          }}
                        >
                          MARK RESOLVED
                        </button>
                      </div>
                    )}
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
    flex: 1,
    display: 'flex',
    justify: 'flex-start',
    boxSizing: 'border-box',
    width: '100%',
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
    gap: '16px',
    width: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid #d0d0d0',
    padding: '18px 20px',
    display: 'flex',
    justify: 'space-between',
    boxSizing: 'border-box',
    width: '100%',
  },
  cardLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    flex: 1,
    width: '100%',
  },
  cardHeaderRow: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '6px',
  },
  ticketId: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#666666',
    letterSpacing: '0.5px',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold',
    display: 'inline-block',
  },
  ticketType: {
    margin: '4px 0',
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
    margin: '0',
    fontSize: '13px',
    color: '#555555',
    whiteSpace: 'pre-line',
  },
  cardRight: {
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    boxSizing: 'border-box',
  },
  markBtn: {
    backgroundColor: '#0d3b14',
    color: '#ffffff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
};

export default AdminComplaints;