import React, { useContext, useState } from "react";
import noPhoto from "../images/no-photo.jpg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const [isErrorLoading, setErrorLoading] = useState(false); // стейт под ошибку загрузки изображения карточки
  const [isDeleting, setDeleting] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.cardData.owner._id === currentUser._id;
  const isLiked = props.likes.find((user) => user._id === currentUser._id);
  
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  const handleClick = () => {
    props.onCardClick(props.cardData);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.cardData);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.cardData);
    setDeleting(true);
  };

  const handleOnError = () => setErrorLoading(true); // хэндлер отлова ошибки загрузки изображения

  return (
    <div className="card">
      <div className="card__heading">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{props.likes.length}</p>
        </div>
      </div>
      <img
        className="card__image"
        onError={handleOnError} // ошибка загрузки - меняем стейт
        src={isErrorLoading ? noPhoto : props.link} // есть ошибка загрузки - вешаем заглушку, нет - показываем изображение
        alt={props.name}
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
