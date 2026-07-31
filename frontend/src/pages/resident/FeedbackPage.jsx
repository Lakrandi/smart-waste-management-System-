import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const FeedbackPage = () => {
  // Ticket Feedback States
  const [ticket1Rating, setTicket1Rating] = useState(0);
  const [ticket1Comment, setTicket1Comment] = useState("");

  const [ticket2Rating, setTicket2Rating] = useState(0);
  const [ticket2Comment, setTicket2Comment] = useState("");

  // General Feedback States
  const [generalRating, setGeneralRating] = useState(0);
  const [generalComment, setGeneralComment] = useState("");

  // Handlers
  const handleTicketSubmit = (ticketId, rating, comment) => {
    if (rating === 0) {
      alert("Please select a star rating first.");
      return;
    }
    console.log(`Submitted for ${ticketId}:`, { rating, comment });
    alert(`Feedback for ${ticketId} submitted!`);
  };

  const handleGeneralSubmit = () => {
    if (generalRating === 0) {
      alert("Please select an overall experience rating.");
      return;
    }
    console.log("Submitted General Feedback:", { rating: generalRating, comment: generalComment });
    alert("General feedback submitted!");
  };

  // 5-Star Interactive Rating Component
  const StarRating = ({ rating, onRate }) => (
    <div style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          style={{
            cursor: "pointer",
            fontSize: "22px",
            color: star <= rating ? "#111111" : "#777777",
            marginRight: "6px",
            userSelect: "none",
          }}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Page Area with Space on the Right */}
      <div style={styles.content}>
        <div style={styles.innerContainer}>
          <h1 style={styles.title}>Feedback</h1>
          <p style={styles.subtitle}>
            Rate how resolved complaints were handled, or leave general feedback about the service.
          </p>

          {/* Section 1: Resolved Complaints */}
          <h4 style={styles.sectionHeader}>RATE A RESOLVED COMPLAINT</h4>

          {/* Ticket 1 Card */}
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>TICKET #A-231 · Overflowing bin</h4>
            <StarRating rating={ticket1Rating} onRate={setTicket1Rating} />
            <input
              type="text"
              placeholder="How was it handled...?"
              value={ticket1Comment}
              onChange={(e) => setTicket1Comment(e.target.value)}
              style={styles.input}
            />
            <button
              onClick={() => handleTicketSubmit("Ticket #A-231", ticket1Rating, ticket1Comment)}
              style={styles.smallButton}
            >
              SUBMIT
            </button>
          </div>

          {/* Ticket 2 Card */}
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>TICKET #A-245 · Illegal dumping</h4>
            <StarRating rating={ticket2Rating} onRate={setTicket2Rating} />
            <input
              type="text"
              placeholder="How was it handled...?"
              value={ticket2Comment}
              onChange={(e) => setTicket2Comment(e.target.value)}
              style={styles.input}
            />
            <button
              onClick={() => handleTicketSubmit("Ticket #A-245", ticket2Rating, ticket2Comment)}
              style={styles.smallButton}
            >
              SUBMIT
            </button>
          </div>

          {/* Section 2: General Feedback */}
          <h4 style={{ ...styles.sectionHeader, marginTop: "35px" }}>GENERAL FEEDBACK</h4>

          <div style={styles.card}>
            <label style={styles.label}>OVERALL EXPERIENCE</label>
            <StarRating rating={generalRating} onRate={setGeneralRating} />

            <label style={{ ...styles.label, marginTop: "14px" }}>COMMENTS</label>
            <input
              type="text"
              placeholder="Tell us what's working and what isn't"
              value={generalComment}
              onChange={(e) => setGeneralComment(e.target.value)}
              style={styles.input}
            />

            <button onClick={handleGeneralSubmit} style={styles.fullButton}>
              SEND FEEDBACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    marginLeft: "260px", // Accommodate fixed sidebar
    flex: 1,
    padding: "35px 50px",
    display: "flex",
    justifyContent: "flex-start",
    boxSizing: "border-box",
  },
  innerContainer: {
    width: "100%",
    maxWidth: "680px", // Leaves space on the right side
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000000",
    textAlign: "left",
  },
  subtitle: {
    fontSize: "13px",
    color: "#555555",
    margin: "0 0 25px 0",
    textAlign: "left",
  },
  sectionHeader: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#333333",
    letterSpacing: "0.5px",
    margin: "0 0 12px 0",
    textAlign: "left",
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#dcdcdc",
    borderRadius: "16px",
    padding: "22px 26px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Left aligns all children elements
    textAlign: "left",
  },
  cardTitle: {
    margin: "0 0 10px 0",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#111111",
    textAlign: "left",
  },
  starContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    justifyContent: "flex-start",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "6px",
    textAlign: "left",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "25px",
    border: "none",
    fontSize: "13px",
    outline: "none",
    marginBottom: "14px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    color: "#333333",
  },
  smallButton: {
    backgroundColor: "#0d3b14",
    color: "#ffffff",
    border: "none",
    padding: "10px 28px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "11px",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  fullButton: {
    width: "100%",
    backgroundColor: "#0d3b14",
    color: "#ffffff",
    border: "none",
    padding: "14px",
    borderRadius: "25px",
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer",
    marginTop: "6px",
    letterSpacing: "0.5px",
  },
};

export default FeedbackPage;