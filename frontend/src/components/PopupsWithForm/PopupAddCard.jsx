import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm";
import useFormAndValidation from "../../hooks/FormValidation/useFormAndValidation";

const PopupAddCard = (props) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const { placeName, placeLink } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  };

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      btnName={props.btnName}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className="popup__input popup__input_field_placename"
        type="text"
        placeholder="Название"
        name="placeName"
        id="placename"
        minLength="2"
        maxLength="30"
        value={placeName ?? ""}
        onChange={handleChange}
        required
      />
      <span
        className={`popup__input-error placename-error ${
          errors.placeName && "popup__input-error_active"
        }`}
      >
        {errors.placeName}
      </span>
      <input
        className="popup__input popup__input_field_placeurl"
        type="url"
        placeholder="Ссылка на картинку"
        name="placeLink"
        id="placeLink"
        value={placeLink ?? ""}
        onChange={handleChange}
        required
      />
      <span
        className={`popup__input-error placeurl-error ${
          errors.placeLink && "popup__input-error_active"
        }`}
      >
        {errors.placeLink}
      </span>
    </PopupWithForm>
  );
};

export default PopupAddCard;
