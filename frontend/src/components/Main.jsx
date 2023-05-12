import React, { useContext } from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = (props) => {
  const userData = useContext(CurrentUserContext);

  return (
    <main className="page">
      {props.isLoading ? (
        <div className="page__loading">
          <span className="page__loading-text">Идет загрузка</span>
          <div className="page__loading-circle"></div>
        </div>
      ) : (
        <>
          <section className="head-profile">
            <div className="head-profile__user-section">
              <div className="head-profile__avatar-section">
                <img
                  className="head-profile__avatar"
                  src={userData.avatar}
                  alt="Аватар пользователя"
                />
                <button
                  className="head-profile__edit-avatar-button"
                  type="button"
                  aria-label="Редактировать аватар"
                  onClick={props.onEditAvatar}
                ></button>
              </div>
              <div className="head-profile__userinfo">
                <div className="head-profile__username-and-edit">
                  <h1 className="head-profile__username">{userData.name}</h1>
                  <button
                    className="head-profile__edit-button"
                    type="button"
                    aria-label="Редактировать имя и деятельность"
                    onClick={props.onEditProfile}
                  ></button>
                </div>
                <p className="head-profile__job">{userData.about}</p>
              </div>
            </div>
            <button
              className="head-profile__add-button"
              type="button"
              aria-label="Добавить фото в ленту"
              onClick={props.onAddPlace}
            ></button>
          </section>

          <section
            className="photo-feed"
            aria-label="Лента с карточками фото-мест"
          >
            {props.cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  cardData={card}
                  name={card.name}
                  link={card.link}
                  likes={card.likes}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </section>
        </>
      )}
    </main>
  );
};

export default Main;
