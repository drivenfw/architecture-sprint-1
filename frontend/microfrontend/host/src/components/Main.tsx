import React, { lazy } from 'react';

const Gallery = lazy(() => import('gallery/Gallery').catch(() => {
  return { default: () => <div className='error'>Gallery is not available!</div> };
}));

const Profile = lazy(() => import('profile/Profile').catch(() => {
  return { default: () => <div className='error'>Profile is not available!</div> };
}));

function Main() {
  return (
    <main className="content">
      <Profile />
      <Gallery />
    </main>
  );
}

export default Main;
