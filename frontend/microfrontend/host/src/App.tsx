import React, { lazy } from "react";
import ReactDOM from "react-dom/client";

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

const App = () => (
  <div className="container">
    <AuthTest />
    <ProfileTest />
    <GalleryTest />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
