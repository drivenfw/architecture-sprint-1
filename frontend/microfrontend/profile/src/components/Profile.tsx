import React, { lazy } from 'react';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import api from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import './styles.css';

const AddPlace = lazy(() => import('gallery/AddPlace').catch(() => {
  return { default: () => <div className='error'>AddPlace is not available!</div> };
}));

function Profile() {
  const [currentUser, setCurrentUser] = React.useState<{ name: string, about: string }>({ name: '', about: '' });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(userData => {
        console.log('Profile: currentUser success - ', userData);
        setCurrentUser(userData);
        dispatchEvent(new CustomEvent("current-user-success", {
          detail: { userData }
        }));
      })
      .catch((err) => {
        console.log('Profile: currentUser failure - ', err);
        dispatchEvent(new CustomEvent("current-user-failure", {
          detail: err
        }));
      });
  }, []);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditAvatarClose() {
    setIsEditAvatarPopupOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditProfileClose() {
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleEditProfileClose();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleEditAvatarClose();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="profile page__section">
        <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <AddPlace />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={handleEditAvatarClose}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={handleEditProfileClose}
        />
      </section>
    </CurrentUserContext.Provider>
  );
}

export default Profile;
