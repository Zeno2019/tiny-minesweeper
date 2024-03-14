import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// import '@radix-ui/themes/styles.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
