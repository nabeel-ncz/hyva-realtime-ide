import React from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import SocketProvider from './provider/SocketProvider';
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider >
      <App />
    </SocketProvider>
  </React.StrictMode>,
)
