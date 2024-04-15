import React from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import UserProvider from './provider/UserProvider.tsx';
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
