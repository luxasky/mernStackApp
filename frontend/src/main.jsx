import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ArtworksProvider } from './context/ArtworksContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ArtworksProvider>
        <App />
      </ArtworksProvider>
    </AuthProvider>
  </React.StrictMode>
);
