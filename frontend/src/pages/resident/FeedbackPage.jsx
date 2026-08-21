import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const FeedbackPage = () => {
  // Dynamic Resolved Complaints State
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Ticket Feedback States: { [complaintId]: { rating: 0, comment: "" } }
  const [ticketFeedbacks, setTicketFeedbacks] = useState({});

  // General Feedback States
  const [generalRating, setGeneralRating] = useState(0);
  const [generalComment, setGeneralComment] = useState("");

  // Fetch logged-in user's resolved complaints on load
  useEffect(() => {
    fetchResolvedComplaints();
  }, []);

  const fetchResolvedComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/complaints/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter only 'Resolved' complaints
      const resolved = res.data.filter(
        (c) => c.status && c.status.toLowerCase() === "resolved"
      );
      setResolvedComplaints(resolved);
    } catch (error) {
      console.error("Error fetching resolved complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handlers for Ticket Rating and Comment
  const handleRateTicket = (id, rating) => {
    setTicketFeedbacks((prev) => ({
      ...prev,
      [id]: { ...prev[id], rating },
    }));
  };

  const handleCommentTicket = (id, comment) => {
    setTicketFeedbacks((prev) => ({
      ...prev,
      [id]: { ...prev[id], comment },
    }));
  };

  const handleTicketSubmit = async (complaintId, ticketTitle) => {
    const feedbackData = ticketFeedbacks[complaintId];
    if (!feedbackData || !feedbackData.rating || feedbackData.rating === 0) {
      alert("Please select a star rating first.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/feedback",
        {
          complaintId,
          rating: feedbackData.rating,
          comment: feedbackData.comment || "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Feedback for ${ticketTitle} submitted successfully!`);
    } catch (error) {
      console.error("Error submitting ticket feedback:", error);
      alert("Failed to submit ticket feedback.");
    }
  };

  const handleGeneralSubmit = async () => {
    if (generalRating === 0) {
      alert("Please select an overall experience rating.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/feedback",
        {
          rating: generalRating,
          comment: generalComment,
          type: "general",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("General feedback submitted!");
      setGeneralRating(0);
      setGeneralComment("");
    } catch (error) {
      console.error("Error submitting general feedback:", error);
      alert("Failed to submit general feedback.");
    }
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

          {loading ? (
            <p style={{ fontSize: "13px", color: "#666" }}>Loading resolved complaints...</p>
          ) : resolvedComplaints.length === 0 ? (
            <div style={styles.card}>
              <p style={{ fontSize: "13px", color: "#555", margin: 0, fontStyle: "italic" }}>
                No resolved complaints available to rate yet. Once an admin resolves your submitted complaints, they will appear here.
              </p>
            </div>
          ) : (
            resolvedComplaints.map((item) => {
              const ticketTitle = `TICKET #${item._id.substring(item._id.length - 6).toUpperCase()} · ${item.issueType}`;
              const currentRating = ticketFeedbacks[item._id]?.rating || 0;
              const currentComment = ticketFeedbacks[item._id]?.comment || "";

              return (
                <div key={item._id} style={styles.card}>
                  <h4 style={styles.cardTitle}>{ticketTitle}</h4>
                  <StarRating
                    rating={currentRating}
                    onRate={(rating) => handleRateTicket(item._id, rating)}
                  />
                  <input
                    type="text"
                    placeholder="How was it handled...?"
                    value={currentComment}
                    onChange={(e) => handleCommentTicket(item._id, e.target.value)}
                    style={styles.input}
                  />
                  <button
                    onClick={() => handleTicketSubmit(item._id, ticketTitle)}
                    style={styles.smallButton}
                  >
                    SUBMIT
                  </button>
                </div>
              );
            })
          )}

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
    marginLeft: "260px",
    flex: 1,
    padding: "35px 50px",
    display: "flex",
    justifyContent: "flex-start",
    boxSizing: "border-box",
  },
  innerContainer: {
    width: "100%",
    maxWidth: "680px",
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
    alignItems: "flex-start",
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