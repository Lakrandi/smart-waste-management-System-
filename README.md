#  CleanTrack - Smart Waste Management System

CleanTrack is a web-based smart waste management system designed to improve waste collection services in Sri Lanka.

The system connects residents, council administrators, and waste collection drivers through one platform. It allows residents to view collection schedules, submit complaints, provide feedback, and track garbage collection vehicles in real time.

---

 

## Project Objectives

The main objectives of CleanTrack are:

- Improve communication between residents and local councils
- Provide clear waste collection schedules
- Allow residents to report waste-related problems
- Track garbage collection vehicles in real time
- Send SMS arrival notifications to residents
- Help council staff manage complaints and collection schedules
- Reduce uncollected waste and improve community cleanliness

---

## User Roles

### Resident

Residents can:

- Create an account
- Login to the system
- View waste collection schedules
- Submit complaints
- Track complaint status
- Submit feedback
- View live garbage truck location
- Update profile details

### Admin / Council Officer

Administrators can:

- Access the admin dashboard
- View resident complaints
- Filter complaints by district
- Update complaint status
- Add collection schedules
- Delete collection schedules
- View resident feedback

### Driver

Drivers can:

- Access the driver page
- Share GPS location
- Start and stop live tracking
- Select a district
- Send SMS arrival alerts to residents

---

## Main Features

- Resident registration and login
- JWT-based authentication
- Complaint management
- Collection schedule management
- Resident feedback system
- User profile management
- Real-time garbage truck tracking
- GPS location sharing
- SMS notifications
- Admin management dashboard
- District-based services
- Responsive web interface

---

## System Architecture

CleanTrack follows a **3-Tier Architecture**.

### Tier 1 - Presentation Layer

**Technology:** React + Vite  
**Hosting:** Vercel

Responsible for:

- Resident interface
- Admin interface
- Driver interface
- Forms and dashboards
- Live tracking interface

### Tier 2 - Application Layer

**Technology:** Node.js + Express.js  
**Hosting:** Render

Responsible for:

- REST APIs
- Authentication
- User management
- Complaint management
- Schedule management
- Feedback management
- GPS location processing
- SMS notification processing
- Real-time communication using Socket.IO

### Tier 3 - Data Layer

**Technology:** MongoDB Atlas

Stores:

- Users
- Complaints
- Feedback
- Collection schedules
- Waste requests
- Other application data

---

## External Services

### Notify.lk

Used to send SMS arrival notifications to registered residents.

### Socket.IO

Used for real-time communication between the driver and resident live tracking pages.

### OpenStreetMap + Leaflet

Used to display the garbage truck location on an interactive map.

---

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- CSS
- Axios
- Leaflet
- Socket.IO Client

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Socket.IO

### Cloud Services

- Vercel - Frontend Hosting
- Render - Backend Hosting
- MongoDB Atlas - Cloud Database
- Notify.lk - SMS Service

---

##  Project Structure

```text
smart-waste-management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   └── pages/
│   │       ├── admin/
│   │       ├── driver/
│   │       └── resident/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
