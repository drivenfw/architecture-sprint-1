import React, { lazy } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

const auth = import('auth/auth').catch(() => {
  console.log('auth is not available')
});

const Login = lazy(() => import('auth/Login').catch(() => {
  return { default: () => <div className='error'>Login is not available!</div> };
}));

const Register = lazy(() => import('auth/Register').catch(() => {
  return { default: () => <div className='error'>Register is not available!</div> };
}));

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData]) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.then(({ checkToken }) => {
        checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
      });
    }
  }, [history]);

  React.useEffect(() => {
    addEventListener('login-success', handleLoginSuccess);
    addEventListener('login-failure', handleLoginFailure);
    return () => {
      removeEventListener('login-success', handleLoginSuccess);
      removeEventListener('login-failure', handleLoginFailure);
    };
  }, []);

  React.useEffect(() => {
    addEventListener('register-success', handleRegisterSuccess);
    addEventListener('register-failure', handleRegisterFailure);
    return () => {
      removeEventListener('register-success', handleRegisterSuccess);
      removeEventListener('register-failure', handleRegisterFailure);
    };
  }, []);

  React.useEffect(() => {
    addEventListener('current-user-success', handleCurrentUserSuccess);
    return () => removeEventListener('current-user-success', handleCurrentUserSuccess);
  }, []);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
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

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegisterSuccess({ detail: { email } }) {
    console.log('App: register success - ', email);
    setTooltipStatus("success");
    setIsInfoToolTipOpen(true);
    history.push("/signin");
  }

  function handleRegisterFailure({ detail: { email } }) {
    console.log('App: register failure - ', email);
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
  }

  function handleLoginSuccess({ detail: { email } }) {
    console.log('App: login success - ', email);
    setIsLoggedIn(true);
    setEmail(email);
    history.push("/");
  }

  function handleLoginFailure({ detail: { email } }) {
    console.log('App: login failure - ', email);
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
  }

  function handleCurrentUserSuccess({ detail: { userData } }) {
    console.log('App: currentUser success', userData);
    setCurrentUser(userData);
  }

  async function onSignOut() {
    (await auth).signOut();
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
        </Switch>
        <Footer />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
