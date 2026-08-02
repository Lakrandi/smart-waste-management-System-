import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
  const collectionsData = [
    { date: '16 Jul 2026', day: 'Thursday', time: '9:00 AM', type: 'Recyclable' },
    { date: '17 Jul 2026', day: 'Friday', time: '8:30 AM', type: 'Recyclable' },
    { date: '19 Jul 2026', day: 'Sunday', time: '8:00 AM', type: 'Non-recyclable' },
    { date: '23 Jul 2026', day: 'Thursday', time: '9:00 AM', type: 'Recyclable' },
  ];

  return (
    <div style={styles.container}>
      <AdminSidebar />

      <div style={styles.mainContent}>
        {/* Title Section */}
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Zone 4 overview</p>
        </div>

        {/* Top Summary Cards */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <span style={styles.cardNumber}>1</span>
            <span style={styles.cardLabel}>OPEN COMPLAINTS</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardNumber}>2</span>
            <span style={styles.cardLabel}>RESOLVED</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardNumber}>4</span>
            <span style={styles.cardLabel}>UPCOMING COLLECTIONS</span>
          </div>
        </div>

        {/* Collections Table Section */}
        <h3 style={styles.sectionTitle}>NEXT FEW COLLECTIONS</h3>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={{ ...styles.th, width: '25%' }}>DATE</th>
                <th style={{ ...styles.th, width: '25%' }}>DAY</th>
                <th style={{ ...styles.th, width: '25%' }}>TIME</th>
                <th style={{ ...styles.th, width: '25%' }}>WASTE TYPE</th>
              </tr>
            </thead>
            <tbody>
              {collectionsData.map((row, index) => {
                const isLastRow = index === collectionsData.length - 1;
                return (
                  <tr
                    key={index}
                    style={{
                      ...styles.tableRow,
                      borderBottom: isLastRow ? 'none' : '1px solid #dcdcdc',
                    }}
                  >
                    <td style={styles.td}>{row.date}</td>
                    <td style={styles.td}>{row.day}</td>
                    <td style={styles.td}>{row.time}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor:
                            row.type === 'Recyclable' ? '#7cc38a' : '#c8c8c8',
                          color:
                            row.type === 'Recyclable' ? '#0f2913' : '#333333',
                        }}
                      >
                        {row.type}
                      </span>
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

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#e0e0e0',
    fontFamily: 'Inter, sans-serif, system-ui',
  },
  mainContent: {
    marginLeft: '260px',
    flex: 1,
    padding: '40px 50px',
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  headerContainer: {
    textAlign: 'left',
    marginBottom: '24px',
  },
  title: {
    margin: 0,
    fontSize: '26px',
    fontWeight: '700',
    color: '#000000',
    textAlign: 'left',
  },
  subtitle: {
    margin: '6px 0 0 0',
    fontSize: '14px',
    color: '#444444',
    textAlign: 'left',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '35px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #b0b0b0',
    borderRadius: '10px',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90px',
    boxSizing: 'border-box',
  },
  cardNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: '1',
    marginBottom: '6px',
  },
  cardLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#111111',
    letterSpacing: '0.5px',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.8px',
    margin: '0 0 14px 0',
    color: '#111111',
    textAlign: 'left',
    display: 'block',
    width: '100%',
    textTransform: 'uppercase',
  },
  tableWrapper: {
    border: '1px solid #a0a0a0',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '13.5px',
  },
  tableHeaderRow: {
    backgroundColor: '#1b3b1e', // Figma Exact Dark Green
    color: '#ffffff',
  },
  th: {
    padding: '16px 24px',
    fontWeight: '600',
    fontSize: '11px',
    letterSpacing: '0.8px',
    textAlign: 'left',
    boxSizing: 'border-box',
  },
  tableRow: {
    backgroundColor: '#ffffff',
    height: '56px', // සියලුම Rows එකම උසින් තැබීමට
  },
  td: {
    padding: '0 24px',
    color: '#111111',
    fontWeight: '500',
    textAlign: 'left',
    verticalAlign: 'middle',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    width: '130px', // Badge එක එකම සයිස් එකෙන් තැබීමට
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    boxSizing: 'border-box',
  },
};

export default AdminDashboard;