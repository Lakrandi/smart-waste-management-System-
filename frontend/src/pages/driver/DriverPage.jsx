import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Replace 'localhost' with your computer's IP address when connecting via mobile (e.g., http://192.168.1.5:5000)
const socket = io('http://localhost:5000'); 

const DriverPage = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);

  const toggleTracking = () => {
    if (isTracking) {
      socket.emit('stopLocation');
    }
    setIsTracking(!isTracking);
  };


  useEffect(() => {
    let watchId;

    if (isTracking) {
      // Enable mobile device GPS (Geolocation API)
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentCoords({ lat: latitude, lng: longitude });

            // Send Driver's real GPS location to Backend via Socket.io
            socket.emit('updateLocation', { lat: latitude, lng: longitude });
          },
          (error) => {
            alert('GPS Error: ' + error.message);
          },
          {
            enableHighAccuracy: true, // Request precise GPS coordinates
            maximumAge: 0,
            timeout: 5000,
          }
        );
      } else {
        alert('Your phone does not support GPS tracking.');
      }
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isTracking]);

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
};

export default DriverPage;