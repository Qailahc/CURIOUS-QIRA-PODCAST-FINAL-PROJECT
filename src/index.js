import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Use createRoot from react-dom/client
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
