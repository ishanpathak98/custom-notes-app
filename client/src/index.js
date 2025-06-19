import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Matches the default export
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
