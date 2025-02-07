import React, { lazy } from 'react';
import Card from './Card';

const Profile = lazy(() => import('profile/Profile').catch(() => {
  return { default: () => <div className='error'>Profile is not available!</div> };
}));

function Main({ cards, onCardClick, onCardLike, onCardDelete }) {
  return (
    <main className="content">
      <Profile />
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
