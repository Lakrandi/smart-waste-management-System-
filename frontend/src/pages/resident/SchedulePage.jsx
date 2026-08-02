import React from 'react';
import Sidebar from '../../components/Sidebar'; //sidebar path

const SchedulePage = () => {
  const scheduleData = [
    {
      id: 1,
      date: '16 Jul 2026',
      day: 'Thursday',
      time: '9:00 AM',
      type: 'Recyclable',
      isRecyclable: true,
    },
    {
      id: 2,
      date: '19 Jul 2026',
      day: 'Sunday',
      time: '8:00 AM',
      type: 'Non-recyclable',
      isRecyclable: false,
    },
    {
      id: 3,
      date: '23 Jul 2026',
      day: 'Thursday',
      time: '9:00 AM',
      type: 'Recyclable',
      isRecyclable: true,
    },
  ];

  return (
    <div style={styles.container}>
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Page Area */}
      <div style={styles.content}>
        {/* Strictly Left-Aligned Header */}
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Collection Schedule</h1>
          <p style={styles.subtitle}>
            Upcoming pickups for Zone 4 • Anuradhapura, published by the council.
          </p>
        </div>

        {/* Table Container Card */}
        <div style={styles.card}>
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
              {scheduleData.map((item, index) => {
                const isNotLastRow = index !== scheduleData.length - 1;
                const cellBorderStyle = isNotLastRow
                  ? { borderBottom: '1px solid rgba(0, 0, 0, 0.15)' }
                  : {};

                return (
                  <tr key={item.id} style={styles.tr}>
                    <td style={{ ...styles.tdDate, ...cellBorderStyle }}>
                      {item.date}
                    </td>
                    <td style={{ ...styles.td, ...cellBorderStyle }}>
                      {item.day}
                    </td>
                    <td style={{ ...styles.td, ...cellBorderStyle }}>
                      {item.time}
                    </td>
                    <td style={{ ...styles.td, ...cellBorderStyle }}>
                      {item.isRecyclable ? (
                        <div style={styles.recyclableTag}>
                          <span>♻</span>
                          <span>{item.type}</span>
                        </div>
                      ) : (
                        <div style={styles.nonRecyclableBadge}>
                          <span>🗑</span>
                          <span>{item.type}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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