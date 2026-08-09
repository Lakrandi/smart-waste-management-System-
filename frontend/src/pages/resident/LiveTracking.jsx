import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import Sidebar from '../../components/Sidebar'; 
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component to auto-focus map when location updates
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

// Socket Connection
const socket = io('http://192.168.8.138:5000');

const LiveTracking = () => {
  // Truck Coordinates State (Default: Colombo)
  const [truckPosition, setTruckPosition] = useState([6.9271, 79.8612]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Socket Connection Status
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    // Listen for Location Updates from Backend
    socket.on('locationUpdate', (data) => {
      if (data && data.lat && data.lng) {
        console.log('Real-time Location Received:', data);
        setTruckPosition([data.lat, data.lng]);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('locationUpdate');
    };
  }, []);

  return (
    <div style={styles.layout}>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Tracking Content */}
      <div style={styles.container}>
        <h1 style={styles.title}>Live Garbage Truck Tracking</h1>
        <p style={styles.subtitle}>Track the garbage collection vehicle in real-time.</p>

        <div style={styles.grid}>
          {/* UPDATED: Modern Truck Details Card */}
          <div style={styles.card}>
            
            {/* Card Header */}
            <div style={styles.cardHeader}>
              <span style={{ fontSize: '20px' }}>🚚</span>
              <h3 style={styles.cardTitle}>Truck Details</h3>
            </div>

            {/* Details List */}
            <div style={styles.detailList}>
              <div style={styles.detailRow}>
                <span style={styles.label}>Truck No</span>
                <span style={styles.value}>WP-3482</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.label}>Driver</span>
                <span style={styles.value}>K. Suneth</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.label}>Status</span>
                <span style={isConnected ? styles.activeBadge : styles.inactiveBadge}>
                  {isConnected ? 'On Route (Live)' : 'Disconnected'}
                </span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.label}>Est. Arrival (ETA)</span>
                <span style={styles.etaBadge}>15 Mins</span>
              </div>
            </div>

            {/* GPS Location Box */}
            <div style={styles.gpsBox}>
              <span style={styles.gpsLabel}>Current GPS Coordinates</span>
              <span style={styles.gpsValue}>
                {truckPosition[0].toFixed(5)}, {truckPosition[1].toFixed(5)}
              </span>
            </div>

          </div>

          {/* Leaflet Interactive Map */}
          <div style={styles.mapCard}>
            <MapContainer
              center={truckPosition}
              zoom={15}
              style={{ height: '380px', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Auto-recenter map view */}
              <RecenterMap center={truckPosition} />

              <Marker position={truckPosition} icon={customIcon}>
                <Popup>
                  <strong>🚚 Garbage Truck (WP-3482)</strong><br />
                  Driver: K. Suneth
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
  },
  container: {
    flex: 1,
    marginLeft: '260px',
    padding: '40px',
    fontFamily: "'Inter', system-ui, sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  title: { color: '#0f172a', fontSize: '24px', fontWeight: '700', margin: 0 },
  subtitle: { color: '#64748b', fontSize: '14px', marginBottom: '28px', marginTop: '4px' },
  grid: { display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' },
  
  // Card Styling Improvements
  card: {
    flex: '1',
    minWidth: '310px',
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    paddingBottom: '14px',
    borderBottom: '1px solid #f1f5f9'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0
  },
  detailList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0'
  },
  label: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  value: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b'
  },
  activeBadge: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700'
  },
  inactiveBadge: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700'
  },
  etaBadge: {
    backgroundColor: '#f0fdf4',
    color: '#166534',
    border: '1px solid #bbf7d0',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    whiteSpace: 'nowrap'
  },
  gpsBox: {
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    padding: '12px 14px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  gpsLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  gpsValue: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'monospace'
  },
  
  mapCard: {
    flex: '2',
    minWidth: '350px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
  }
};

export default LiveTracking;