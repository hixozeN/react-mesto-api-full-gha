import React from "react";
import { Link } from "react-router-dom";
import useFormAndValidation from "../hooks/FormValidation/useFormAndValidation";

const Login = (props) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const { email, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onLogin({ email, password });
    resetForm();
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form name="register" className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          minLength={6}
          placeholder="Email"
          className="auth__input"
          value={email ?? ''}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <span className={`auth__input-error email-error ${errors.email && 'popup__input-error_active'}`}>{errors.email}</span>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="auth__input"
          value={password ?? ''}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <span className={`auth__input-error password-error ${errors.password && 'popup__input-error_active'}`}>{errors.password}</span>
        <button type="submit" className="auth__submit-button" disabled={!isValid}>
          {props.btnName}
        </button>
        <Link to="/sign-up" className="auth__link">
          Нет аккаунта? Зарегистрируйтесь
        </Link>
      </form>
    </div>
  );
};

export default Login;
