import React from "react";
import HandlerCloseByEsc from "../hooks/CloseByEsc/CloseByEsc";

const ImagePopup = (props) => {
  return (
    <>
      {props.isOpen && <HandlerCloseByEsc onClose={props.onClose} />}
      <div className={`popup popup_preview ${props.isOpen && "popup_opened"}`} onClick={(evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          props.onClose();
        }
      }}>
        <div className="popup__image-content">
          <button
            type="button"
            name="button_form_close"
            id="button_form-preview_close"
            className="popup__close-button"
            aria-label="Закрыть превью"
            onClick={props.onClose}
          ></button>
          <img
            className="popup__image-preview"
            alt={props.card.name}
            src={props.card.link}
          />
          <h2 className="popup__title-preview">{props.card.name}</h2>
        </div>
      </div>
    </>
  );
};

export default ImagePopup;
