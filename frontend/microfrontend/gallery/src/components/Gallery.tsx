import React from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import './styles.css';

function Gallery() {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    addEventListener('current-user-success', handleCurrentUserSuccess);
    return () => removeEventListener('current-user-success', handleCurrentUserSuccess);
  }, []);

  React.useEffect(() => {
    addEventListener('add-place-success', handleAddPlaceSuccess);
    return () => removeEventListener('add-place-success', handleAddPlaceSuccess);
  }, [cards]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleImagePopupClose() {
    setSelectedCard(null);
  }

  function handleCurrentUserSuccess({ detail: { userData } }) {
    console.log('Gallery: currentUser success', userData);
    setCurrentUser(userData);
  }

  function handleAddPlaceSuccess({ detail: { newCard } }) {
    console.log('Gallery: addPlace success', newCard);
    setCards([newCard, ...cards]);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
        <ImagePopup card={selectedCard} onClose={handleImagePopupClose} />
      </section>
    </CurrentUserContext.Provider>
  );
}

export default Gallery;
