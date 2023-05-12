import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, email, onSignOut }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = (location.pathname === '/sign-in') ? '/sign-up' : '/sign-in';
  const linkName = (location.pathname === '/sign-in') ? 'Регистрация' : 'Войти';

  return (
    <header className="header">
      <div onClick={() => navigate('/')} className="header__logo"></div>
      <div className="header__buttons-wrapper">
        {isLoggedIn
          ? (
            <>
              <p className="header__email">{email}</p>
              <button onClick={onSignOut} className="header__button">Выйти</button>
            </>
          )
          : (
            <>
              <Link to={path} className="header__link">{linkName}</Link>
            </>
          )
        }
      </div>
    </header>
  );
};

export default Header;
