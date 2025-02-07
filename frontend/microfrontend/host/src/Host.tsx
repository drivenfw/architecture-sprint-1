import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from './components/App';

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

console.log('%c Host is running', 'color:red');
