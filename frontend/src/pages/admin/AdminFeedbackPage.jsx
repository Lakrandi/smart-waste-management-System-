import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";


 
// API BASE URL
// Local frontend -> Local backend
// Hosted frontend -> Render backend
 
const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname.startsWith("10.") ||
  window.location.hostname.startsWith("192.168.")
    ? `http://${window.location.hostname}:5000`
    : "https://cleantrack-backend-hst9.onrender.com";


const AdminFeedbackPage = () => {

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);


 
  // GET ALL FEEDBACKS
 
  const fetchFeedbacks = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${API_BASE_URL}/api/feedback/all`
      );

      const feedbackList = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      console.log(
        "Admin feedback data:",
        feedbackList
      );

      setFeedbacks(feedbackList);

    } catch (error) {

      console.error(
        "Error fetching feedbacks:",
        error.response?.data || error.message
      );

      setFeedbacks([]);

    } finally {

      setLoading(false);

    }
  };


   
  // LOAD FEEDBACKS ONLY ONCE
  useEffect(() => {

    fetchFeedbacks();

  }, []);


   
  // UI
 
  return (

    <div style={styles.container}>

      <AdminSidebar />


      <div style={styles.content}>


        {/* Header */}
        <div style={styles.headerRow}>

          <div>

            <h1 style={styles.title}>
              User Feedbacks
            </h1>

            <p style={styles.subtitle}>
              Review ratings and comments submitted by residents.
            </p>

          </div>


          {/* Manual Refresh Button */}
          <button
            onClick={fetchFeedbacks}
            style={styles.refreshButton}
          >
            Refresh
          </button>

        </div>



        {/* Loading */}
        {loading ? (

          <p style={styles.loadingText}>
            Loading feedbacks...
          </p>

        ) : feedbacks.length === 0 ? (

          /* No Feedback */

          <div style={styles.emptyCard}>

            No user feedbacks available yet.

          </div>

        ) : (

          /* Feedback Table */

          <div style={styles.tableWrapper}>

            <table style={styles.table}>


              <thead>

                <tr>

                  <th style={styles.th}>
                    USER
                  </th>

                  <th style={styles.th}>
                    EMAIL
                  </th>

                  <th style={styles.th}>
                    TYPE
                  </th>

                  <th style={styles.th}>
                    RATING
                  </th>

                  <th style={styles.th}>
                    COMMENT
                  </th>

                </tr>

              </thead>


              <tbody>

                {feedbacks.map((fb) => {

                  const rating =
                    Number(fb.rating) || 0;

                  return (

                    <tr
                      key={fb._id}
                      style={styles.tr}
                    >


                      {/* User Name */}
                      <td style={styles.td}>

                        {fb.user?.name ||
                          "Anonymous"}

                      </td>


                      {/* User Email */}
                      <td style={styles.td}>

                        {fb.user?.email ||
                          "N/A"}

                      </td>


                      {/* Feedback Type */}
                      <td style={styles.td}>

                        <span
                          style={styles.badge}
                        >

                          {fb.serviceType ||
                            "General"}

                        </span>

                      </td>


                      {/* Rating */}
                      <td
                        style={{
                          ...styles.td,
                          color: "#f39c12",
                          fontWeight: "bold"
                        }}
                      >

                        {"★".repeat(rating)}

                        {"☆".repeat(
                          Math.max(
                            0,
                            5 - rating
                          )
                        )}

                        {" "}

                        ({rating}/5)

                      </td>


                      {/* Comment */}
                      <td style={styles.td}>

                        {fb.comment || "-"}

                      </td>


                    </tr>

                  );

                })}

              </tbody>


            </table>

          </div>

        )}

      </div>

    </div>

  );
};


 
// STYLES
 
const styles = {

  container: {

    display: "flex",

    minHeight: "100vh",

    backgroundColor: "#f9f9f9",

    fontFamily: "Arial, sans-serif"

  },


  content: {

    marginLeft: "260px",

    flex: 1,

    padding: "35px 50px",

    boxSizing: "border-box"

  },


  headerRow: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "25px"

  },


  title: {

    margin: "0 0 6px 0",

    fontSize: "28px",

    fontWeight: "bold",

    color: "#000000"

  },


  subtitle: {

    fontSize: "13px",

    color: "#555555",

    margin: 0

  },


  refreshButton: {

    backgroundColor: "#0d3b14",

    color: "#ffffff",

    border: "none",

    padding: "10px 18px",

    borderRadius: "8px",

    fontSize: "13px",

    fontWeight: "bold",

    cursor: "pointer"

  },


  loadingText: {

    color: "#666666",

    fontSize: "14px"

  },


  emptyCard: {

    backgroundColor: "#ffffff",

    padding: "20px",

    borderRadius: "8px",

    border: "1px solid #dddddd",

    color: "#666666"

  },


  tableWrapper: {

    backgroundColor: "#ffffff",

    borderRadius: "12px",

    border: "1px solid #e0e0e0",

    overflowX: "auto"

  },


  table: {

    width: "100%",

    borderCollapse: "collapse",

    textAlign: "left"

  },


  th: {

    padding: "14px 18px",

    fontSize: "11px",

    fontWeight: "bold",

    backgroundColor: "#0d3b14",

    color: "#ffffff",

    textTransform: "uppercase"

  },


  tr: {

    borderBottom: "1px solid #eeeeee"

  },


  td: {

    padding: "14px 18px",

    fontSize: "13px",

    color: "#333333"

  },


  badge: {

    backgroundColor: "#e8f5e9",

    color: "#2e7d32",

    padding: "4px 8px",

    borderRadius: "12px",

    fontSize: "11px",

    fontWeight: "bold"

  }

};


export default AdminFeedbackPage;