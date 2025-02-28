import React, { lazy } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
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
  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    auth.then(({ checkLoggedIn }) => {
      checkLoggedIn()
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

  function closeAllPopups() {
    setIsInfoToolTipOpen(false);
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
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
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
