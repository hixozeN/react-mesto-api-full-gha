import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupEditProfile from "./PopupsWithForm/PopupEditProfile";
import PopupEditAvatar from "./PopupsWithForm/PopupEditAvatar";
import PopupAddCard from "./PopupsWithForm/PopupAddCard";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as apiAuth from "../utils/apiAuth";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  // Стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  // Стейты карточек
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  // Стейт текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState(null);
  // Стейты под загрузку контента, данных через апи
  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(true);
  // Стейт логина
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  // Стейты для проброса ошибок
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState(``);
  // Навигация
  const navigate = useNavigate();
  // Контроль попапов
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleOpenInfoPopup = () => setIsInfoPopupOpen(true);
  const handleCardClick = (cardData) => {
    setIsImagePopupOpen(true);
    setSelectedCard(cardData);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoPopupOpen(false);
  };
  // Подгрузка данных при логине
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardList]) => {
          setCurrentUser(userData);
          setCards(cardList);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
      }
    }, [isLoggedIn]);
    // Добавление карточки
    const handleAddPlaceSubmit = ({ name, link }) => {
      setFetching(true);
      api
        .createCard({ name, link })
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch((err) => console.error(err))
        .finally(() => setFetching(false));
    };
  // Лайк карточки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch((err) => console.error(err));
  };
  // Удаление карточки
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.error(err));
  };
  // Изменение данных пользователя
  const handleUpdateUser = ({ name, about }) => {
    setFetching(true);
    api
      .setUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setFetching(false));
  };
  // Изменение аватара
  const handleUpdateAvatar = ({ avatar }) => {
    setFetching(true);
    api
      .setUserAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setFetching(false));
  };
  // Проверка токена
  const checkJWT = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    checkJWT();
  }, []);
  // Регистрация
  const handleRegister = ({ email, password }) => {
    setFetching(true);
    apiAuth
      .register({ email, password })
      .then(() => {
        setError(() => false);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setError(() => true);
        setErrorText(() => `${err}`);
      })
      .finally(() => {
        handleOpenInfoPopup();
        setFetching(false);
      });
  };
  // Авторизация
  const handleLogin = ({ email, password }) => {
    setFetching(true);
    apiAuth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        // Можете говорить что угодно за эту строчку, но такое хранение позволяет избежать рендера Login, пока поменяется стейт isLoggedIn
        localStorage.setItem("isLoggedIn", true);
        setEmail(email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(() => true);
        setErrorText(() => `${err}`);
        handleOpenInfoPopup();
      })
      .finally(() => setFetching(false));
  };
  // Логаут
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} onSignOut={handleSignOut} email={email} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login
              onLogin={handleLogin}
              btnName={isFetching ? "Вход..." : "Войти"}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register
              onRegister={handleRegister}
              btnName={isFetching ? "Регистрация..." : "Зарегистрироваться"}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {isLoggedIn && <Footer />}
      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        btnName={isFetching ? "Сохранение..." : "Сохранить"}
      />
      <PopupEditAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        btnName={isFetching ? "Сохранение..." : "Сохранить"}
      />
      <PopupAddCard
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        btnName={isFetching ? "Создание..." : "Создать"}
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        isError={isError}
        errorText={errorText}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
