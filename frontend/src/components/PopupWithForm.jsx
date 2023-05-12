import React from "react";
import Popup from "./Popup";

const PopupWithForm = (props) => {
  return (
    <Popup isOpen={props.isOpen} name={props.name} title={props.title} onClose={props.onClose}>
      <h2 className='popup__title'>{props.title}</h2>
      <form
        className={`popup__form popup__form_type_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate
      >
        {props.children}
        <button className={`popup__submit-button ${!props.isValid && 'popup__submit-button_inactive'}`} type="submit" disabled={!props.isValid}>
          {props.btnName}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
