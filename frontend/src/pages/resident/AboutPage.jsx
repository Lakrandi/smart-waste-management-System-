import React from "react";
import Sidebar from "../../components/Sidebar";

const About = () => {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        <h1 style={styles.heading}>About CleanTrack</h1>

        <p style={styles.subHeading}>
          Connecting residents and the local council to keep the city clean.
        </p>

        {/* About Box */}
        <div style={styles.aboutBox}>
          <p style={styles.text}>
            CleanTrack is a web platform that lets residents report overflowing
            bins and illegal dumping in seconds, and lets the local council
            publish collection schedules and respond to issues faster. Our goal
            is simple: less uncollected waste, fewer health risks, and a cleaner
            Anuradhapura.
          </p>
        </div>

        {/* Contact Section */}
        <h2 style={styles.contactHeading}>CONTACT DETAILS</h2>

        <div style={styles.contactBox}>
          <div style={styles.row}>
            <div>
              <p style={styles.label}>📞 COUNCIL HOTLINE</p>
              <p style={styles.value}>+94 25 222 1234</p>
            </div>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.row}>
            <div>
              <p style={styles.label}>✉️ EMAIL</p>
              <p style={styles.value}>
                support@cleantrack-anuradhapura.lk
              </p>
            </div>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.row}>
            <div>
              <p style={styles.label}>📍 OFFICE</p>
              <p style={styles.value}>
                Anuradhapura Municipal Council, New Town Road
              </p>
            </div>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.row}>
            <div>
              <p style={styles.label}>🕒 OFFICE HOURS</p>
              <p style={styles.value}>
                Mon–Fri, 8:30 AM – 4:30 PM
              </p>
            </div>
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
    backgroundColor: "#f5f6f2",
  },

  main: {
    marginLeft: "260px",
    flex: 1,
    padding: "35px",
  },

  heading: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#111",
  },

  subHeading: {
    marginTop: "15px",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#333",
  },

  aboutBox: {
    background: "#fff",
    border: "1px solid #999",
    borderRadius: "10px",
    padding: "22px",
    lineHeight: "1.8",
    marginBottom: "40px",
  },

  text: {
    fontSize: "14px",
    color: "#222",
    margin: 0,
  },

  contactHeading: {
    fontSize: "24px",
    marginBottom: "18px",
    color: "#111",
  },

  contactBox: {
    background: "#fff",
    border: "1px solid #999",
    borderRadius: "10px",
    padding: "10px 18px",
  },

  row: {
    padding: "12px 0",
  },

  divider: {
    borderBottom: "1px solid #ddd",
  },

  label: {
    margin: 0,
    fontSize: "14px",
    color: "#444",
    fontWeight: "500",
  },

  value: {
    margin: "8px 0 0 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111",
  },
};

export default About;

