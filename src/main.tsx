import React from 'react';
import ReactDOM from 'react-dom/client';
import { FavoritesProvider } from './context/FavoritesContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
);