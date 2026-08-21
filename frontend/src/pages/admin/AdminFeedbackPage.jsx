import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";

const AdminFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/feedback/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />

      <div style={styles.content}>
        <h1 style={styles.title}>User Feedbacks</h1>
        <p style={styles.subtitle}>Review ratings and comments submitted by residents.</p>

        {loading ? (
          <p style={{ color: "#666" }}>Loading feedbacks...</p>
        ) : feedbacks.length === 0 ? (
          <div style={styles.emptyCard}>No user feedbacks available yet.</div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>USER</th>
                  <th style={styles.th}>EMAIL</th>
                  <th style={styles.th}>TYPE</th>
                  <th style={styles.th}>RATING</th>
                  <th style={styles.th}>COMMENT</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => (
                  <tr key={fb._id} style={styles.tr}>
                    <td style={styles.td}>{fb.user?.name || "Anonymous"}</td>
                    <td style={styles.td}>{fb.user?.email || "N/A"}</td>
                    <td style={styles.td}>
                      <span style={styles.badge}>{fb.serviceType || "General"}</span>
                    </td>
                    <td style={{ ...styles.td, color: "#f39c12", fontWeight: "bold" }}>
                      {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)} ({fb.rating}/5)
                    </td>
                    <td style={styles.td}>{fb.comment || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", minHeight: "100vh", backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif" },
  content: { marginLeft: "260px", flex: 1, padding: "35px 50px", boxSizing: "border-box" },
  title: { margin: "0 0 6px 0", fontSize: "28px", fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: "13px", color: "#555", margin: "0 0 25px 0" },
  emptyCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #ddd", color: "#666" },
  tableWrapper: { backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e0e0e0", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  th: { padding: "14px 18px", fontSize: "11px", fontWeight: "bold", backgroundColor: "#0d3b14", color: "#fff", textTransform: "uppercase" },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "14px 18px", fontSize: "13px", color: "#333" },
  badge: { backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" },
};

export default AdminFeedbackPage;