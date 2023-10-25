import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,HashRouter } from 'react-router-dom'
import AutoScorllTop from './AutoTop'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <BrowserRouter>
    <HashRouter>
    <AutoScorllTop>
      <App />
    </AutoScorllTop>  
    </HashRouter>  
    // </BrowserRouter>  
  // </React.StrictMode>
);
