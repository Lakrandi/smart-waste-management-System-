import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('https://cleantrack-backend-hst9.onrender.com', {
  transports: ['websocket', 'polling']
});

const SRI_LANKA_DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const DriverPage = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [district, setDistrict] = useState('Gampaha');
  const [loading, setLoading] = useState(false);

  const toggleTracking = async () => {
    if (isTracking) {
      try {
        await axios.post('https://cleantrack-backend-hst9.onrender.com/api/location/status', {
          status: 'Disconnected',
          isTracking: false,
          district: district
        });
      } catch (error) {
        console.error('Failed to update stop status in DB:', error);
      }

      socket.emit('stopLocation', { district: district });
      setIsTracking(false);
      setCurrentCoords(null);
    } else {
      const activeCoords = currentCoords || { lat: 6.9271, lng: 79.8612 };
      try {
        await axios.post('https://cleantrack-backend-hst9.onrender.com/api/location/status', {
          status: 'On Route',
          isTracking: true,
          district: district,
          lat: activeCoords.lat,
          lng: activeCoords.lng
        });
      } catch (error) {
        console.error('Failed to update start status in DB:', error);
      }

      socket.emit('locationUpdate', {
        lat: activeCoords.lat,
        lng: activeCoords.lng,
        district: district
      });

      setIsTracking(true);
    }
  };

  const handleSendSMSAlert = async (selectedDistrict) => {
    setLoading(true);
    try {
      await axios.post('https://cleantrack-backend-hst9.onrender.com/api/sms/send-alert', { district: selectedDistrict });
      alert(`SMS Alert sent for ${selectedDistrict} district!`);
    } catch (error) {
      console.error('Failed to send SMS alerts:', error);
      alert('Failed to send SMS alerts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let watchId;
    let intervalId;

    if (isTracking) {
      const sendLocationUpdate = (coords) => {
        setCurrentCoords(coords);
        socket.emit('locationUpdate', {
          lat: coords.lat,
          lng: coords.lng,
          district: district
        });
      };

      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            sendLocationUpdate({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          (error) => {
            console.warn('GPS Warning:', error.message);
            sendLocationUpdate(currentCoords || { lat: 6.9271, lng: 79.8612 });
          },
          { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        intervalId = setInterval(() => {
          sendLocationUpdate(currentCoords || { lat: 6.9271, lng: 79.8612 });
        }, 3000);
      }
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTracking, district, currentCoords]);

  return (
    <div style={styles.container}>
      <h2>🚚 Driver GPS Transmitter</h2>
      <p>Driver Status: {isTracking ? '🟢 Live Tracking ACTIVE' : '🔴 Tracking OFF'}</p>

      <button
        onClick={toggleTracking}
        style={{
          ...styles.button,
          backgroundColor: isTracking ? '#dc3545' : '#28a745',
        }}
      >
        {isTracking ? 'Stop Sharing Location' : 'Start Trip (Share Location)'}
      </button>

      {currentCoords && (
        <div style={styles.infoBox}>
          <p><strong>Current Lat:</strong> {currentCoords.lat}</p>
          <p><strong>Current Lng:</strong> {currentCoords.lng}</p>
        </div>
      )}

      <div style={styles.smsBox}>
        <h3>📲 Send Arrival SMS Alert</h3>
        <div style={{ marginBottom: '15px' }}>
          <label><strong>Select District: </strong></label>
          <select 
            value={district} 
            onChange={(e) => setDistrict(e.target.value)}
            style={styles.input}
          >
            {SRI_LANKA_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => handleSendSMSAlert(district)} 
          disabled={loading}
          style={styles.smsButton}
        >
          {loading ? 'Sending SMS...' : `📢 Notify ${district} Residents`}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', textAlign: 'center', fontFamily: 'sans-serif' },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  infoBox: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e9ecef',
    borderRadius: '8px',
    display: 'inline-block',
  },
  smsBox: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: '30px auto 0 auto',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginLeft: '10px',
  },
  smsButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default DriverPage;