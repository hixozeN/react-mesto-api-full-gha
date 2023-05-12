import React from "react";
import statusOkImage from "../images/ok.png";
import statusErrorImage from "../images/error.png";
import Popup from "./Popup";

const InfoTooltip = ({
  errorText = "Что-то пошло не так! Попробуйте ещё раз.",
  ...props
}) => {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      <img
        src={props.isError ? statusErrorImage : statusOkImage}
        alt="Картинка статуса регистрации"
        className="popup__status-image"
      />
      <h2 className="popup__status-title">
        {props.isError ? errorText : `Вы успешно зарегистрировались!`}
      </h2>
    </Popup>
  );
};

export default InfoTooltip;
