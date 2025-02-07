import React from 'react';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';

function AddPlace() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        console.log('AddPlace: addPlace success - ', newCardFull);
        dispatchEvent(new CustomEvent("add-place-success", {
          detail: { newCard: newCardFull }
        }));
        handleAddPlaceClose();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceClose() {
    setIsAddPlacePopupOpen(false);
  }

  return (
    <>
      <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={handleAddPlaceClose}
      />
    </>
  );
}

export default AddPlace;
