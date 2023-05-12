import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm";
import useFormAndValidation from "../../hooks/FormValidation/useFormAndValidation";

const PopupEditAvatar = (props) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const { avatar } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar
    });
  };

  useEffect(() => {
    resetForm();
    setValues({avatar: ""});
  }, [props.isOpen, resetForm, setValues]);

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      btnName={props.btnName}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className="popup__input popup__input_field_ava-url"
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        id="avatar"
        value={avatar ?? ''}
        onChange={handleChange}
        required
      />
      <span className={`popup__input-error avaurl-error ${errors.avatar && 'popup__input-error_active'}`}>{errors.avatar}</span>
    </PopupWithForm>
  );
};

export default PopupEditAvatar;
