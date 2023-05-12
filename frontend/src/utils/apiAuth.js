const BASE_URL = "http://api.mesto.hixozen.ru";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => {
    // парсим и прокидываем ошибку бэкенда, пока не сделан либо свой бэк с ошибками, либо обработка кодов на фронте
    throw JSON.parse(text).message || JSON.parse(text).error;
  });
};

export const register = ({ email, password }) => {
  return fetch(BASE_URL + "/signup", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const login = ({ email, password }) => {
  return fetch(BASE_URL + "/signin", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const checkToken = (token) => {
  return fetch(BASE_URL + "/users/me", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  }).then((res) => checkResponse(res));
};
