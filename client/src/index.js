import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './app.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <main>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </main>

);

