import React, { useContext, useState } from "react";
import noPhoto from "../images/no-photo.jpg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ cardData, likes, name, link, onCardClick, onCardLike, onCardDelete }) => {
  const [isErrorLoading, setErrorLoading] = useState(false); // стейт под ошибку загрузки изображения карточки
  const [isDeleting, setDeleting] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardData.owner === currentUser._id;
  const isLiked = likes.some((user) => user === currentUser._id);
  
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  const handleClick = () => {
    onCardClick(cardData);
  };

  const handleLikeClick = () => {
    onCardLike(cardData);
  };

  const handleDeleteClick = () => {
    onCardDelete(cardData);
    setDeleting(true);
  };

  const handleOnError = () => setErrorLoading(true); // хэндлер отлова ошибки загрузки изображения

  return (
    <div className="card">
      <div className="card__heading">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
      <img
        className="card__image"
        onError={handleOnError} // ошибка загрузки - меняем стейт
        src={isErrorLoading ? noPhoto : link} // есть ошибка загрузки - вешаем заглушку, нет - показываем изображение
        alt={name}
        onClick={handleClick}
      />

      {isOwn &&
        (isDeleting ? (
          <div className="card__loading-status"></div>
        ) : (
          <button
            className="card__delete-button"
            name="button_card_delete"
            id="button_card_delete"
            type="button"
            aria-label="Удалить карточку"
            onClick={handleDeleteClick}
          />
        ))}
    </div>
  );
};

export default Card;
