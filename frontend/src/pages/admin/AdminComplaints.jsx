import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminComplaints = () => {
  const [tickets, setTickets] = useState([
    {
      id: 'A-247',
      type: 'Overflowing bin',
      location: 'Temple Junction',
      status: 'In review',
      isResolved: false,
    },
    {
      id: 'A-245',
      type: 'Illegal dumping',
      location: 'Canal Rd',
      status: 'Resolved',
      isResolved: true,
    },
    {
      id: 'A-231',
      type: 'Overflowing bin',
      location: 'Main St',
      status: 'Resolved',
      isResolved: true,
    },
  ]);

  const handleMarkResolved = (id) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: 'Resolved', isResolved: true }
          : ticket
      )
    );
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

          {/* Ticket Cards List */}
          <div style={styles.ticketList}>
            {tickets.map((ticket) => (
              <div key={ticket.id} style={styles.card}>
                {/* Left Side: Ticket Details */}
                <div style={styles.cardLeft}>
                  <span style={styles.ticketId}>TICKET #{ticket.id}</span>
                  <h3 style={styles.ticketType}>{ticket.type}</h3>
                  <p style={styles.location}>{ticket.location}</p>

                  {/* Long status badge with #D8E2D8 for "In review" */}
                  <div
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: ticket.isResolved ? '#8fc499' : '#D8E2D8',
                      color: ticket.isResolved ? '#0d3b14' : '#2d5a34',
                    }}
                  >
                    {ticket.isResolved ? '✓ Resolved' : ticket.status}
                  </div>
                </div>

                {/* Right Side: Action Button + Vertical Line */}
                <div style={styles.cardRight}>
                  {ticket.isResolved ? (
                    <button style={styles.resolvedBtn} disabled>
                      RESOLVED
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkResolved(ticket.id)}
                      style={styles.markBtn}
                    >
                      MARK RESOLVED
                    </button>
                  )}
                </div>
              </div>
            ))}
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
    justifyContent: 'flex-start',
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
    margin: '0 0 30px 0',
    textAlign: 'left',
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
    justifyContent: 'space-between',
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
  location: {
    margin: '0 0 12px 0',
    fontSize: '13px',
    color: '#555555',
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
    justifyContent: 'center',
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