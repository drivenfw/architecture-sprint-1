import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from './components/App';

import "./index.css";

const AuthTest = lazy(() => import('auth/AuthTest').catch(() => {
  return { default: () => <div className='error'>Auth is not available!</div> };
}));

const ProfileTest = lazy(() => import('profile/ProfileTest').catch(() => {
  return { default: () => <div className='error'>Profile is not available!</div> };
}));

const GalleryTest = lazy(() => import('gallery/GalleryTest').catch(() => {
  return { default: () => <div className='error'>Gallery is not available!</div> };
})); 

/*const App = () => (
  <div className="container">
    <AuthTest />
    <ProfileTest />
    <GalleryTest />
  </div>
);*/

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

console.log('%c Host is running', 'color:red');
