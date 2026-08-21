import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [userDistrict, setUserDistrict] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve stored user and authentication token
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // Redirect to login if user or token is missing
    if (!storedUser || !token) {
      navigate('/');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      const district = parsedUser?.district || 'Colombo';
      setUserDistrict(district);

      // Fetch schedules using district and JWT token
      fetchSchedules(district, token);
    } catch (err) {
      console.error("Error parsing user data from localStorage", err);
      setErrorMsg("Failed to read user session. Please sign in again.");
      setLoading(false);
    }
  }, [navigate]);

  const fetchSchedules = async (district, token) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/schedules?district=${district}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSchedules(res.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setErrorMsg(error.response?.data?.message || "Failed to load collection schedules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Page Area */}
      <div style={styles.content}>
        {/* Dynamic Header with District */}
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Collection Schedule</h1>
          <p style={styles.subtitle}>
            Upcoming pickups for {userDistrict ? `${userDistrict} District` : 'your district'}, published by the council.
          </p>
        </div>

        {/* Table Container Card */}
        <div style={styles.card}>
          {loading ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#333' }}>
              Loading schedules...
            </div>
          ) : errorMsg ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#d9534f' }}>
              {errorMsg}
            </div>
          ) : schedules.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#555' }}>
              No pickup schedules found for {userDistrict} district.
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={{ ...styles.th, width: '22%' }}>DATE</th>
                  <th style={{ ...styles.th, width: '24%' }}>DAY</th>
                  <th style={{ ...styles.th, width: '22%' }}>TIME</th>
                  <th style={{ ...styles.th, width: '32%' }}>WASTE TYPE</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((item, index) => {
                  const isNotLastRow = index !== schedules.length - 1;
                  const cellBorderStyle = isNotLastRow
                    ? { borderBottom: '1px solid rgba(0, 0, 0, 0.15)' }
                    : {};

                  const isRecyclable = item.wasteType?.toLowerCase().includes('recyclable') && !item.wasteType?.toLowerCase().includes('non');

                  return (
                    <tr key={item._id || index} style={styles.tr}>
                      <td style={{ ...styles.tdDate, ...cellBorderStyle }}>
                        {item.date}
                      </td>
                      <td style={{ ...styles.td, ...cellBorderStyle }}>
                        {item.day || '-'}
                      </td>
                      <td style={{ ...styles.td, ...cellBorderStyle }}>
                        {item.timeSlot || item.time || '-'}
                      </td>
                      <td style={{ ...styles.td, ...cellBorderStyle }}>
                        {isRecyclable ? (
                          <div style={styles.recyclableTag}>
                            <span>♻</span>
                            <span>{item.wasteType}</span>
                          </div>
                        ) : (
                          <div style={styles.nonRecyclableBadge}>
                            <span>🗑</span>
                            <span>{item.wasteType}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: 'sans-serif',
  },
  content: {
    marginLeft: '260px',
    flex: 1,
    padding: '40px 50px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerContainer: {
    marginBottom: '20px',
    textAlign: 'left',
    width: '100%',
    maxWidth: '900px',
  },
  title: {
    margin: '0 0 6px 0',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    margin: 0,
    fontSize: '13.5px',
    color: '#666666',
  },
  card: {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: '#D9D9D9',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  headerRow: {
    backgroundColor: '#0d3b14',
  },
  th: {
    padding: '14px 20px',
    textAlign: 'left',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.6px',
    boxSizing: 'border-box',
  },
  tr: {
    backgroundColor: '#D9D9D9',
  },
  tdDate: {
    padding: '12px 20px',
    fontSize: '13.5px',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    boxSizing: 'border-box',
  },
  td: {
    padding: '12px 20px',
    fontSize: '13.5px',
    color: '#333333',
    textAlign: 'left',
    boxSizing: 'border-box',
  },
  recyclableTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#1e7e34',
    fontWeight: 'bold',
    fontSize: '13.5px',
    whiteSpace: 'nowrap',
  },
  nonRecyclableBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#9ca99d',
    color: '#2a332c',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '12.5px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
};

export default SchedulePage;