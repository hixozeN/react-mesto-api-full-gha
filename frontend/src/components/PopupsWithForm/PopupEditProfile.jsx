import React, { useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/FormValidation/useFormAndValidation";

const PopupEditProfile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const { username, userjob } = values;

  useEffect(() => {
    resetForm();
    setValues({
      username: currentUser.name,
      userjob: currentUser.about
    })
  }, [currentUser, props.isOpen, resetForm, setValues]);

  const handleSumbit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser({
      name: username, about: userjob
    })
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      btnName={props.btnName}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSumbit}
      isValid={isValid}
    >
      <input
        className="popup__input popup__input_field_name"
        type="text"
        placeholder="Как Вас зовут?"
        name="username"
        id="username"
        minLength="2"
        maxLength="40"
        value={username ?? ''}
        onChange={handleChange}
        required
      />
      <span className={`popup__input-error username-error ${errors.username && 'popup__input-error_active'}`}>{errors.username}</span>
      <input
        className="popup__input popup__input_field_job"
        type="text"
        placeholder="Кем Вы работаете?"
        name="userjob"
        id="userjob"
        minLength="2"
        maxLength="200"
        value={userjob ?? ''}
        onChange={handleChange}
        required
      />
      <span className={`popup__input-error userjob-error ${errors.userjob && 'popup__input-error_active'}`}>{errors.userjob}</span>
    </PopupWithForm>
  );
};

export default PopupEditProfile;
