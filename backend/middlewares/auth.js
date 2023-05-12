const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../utils/responsesWithError/Unauthorized');

const handleError = (res, req, next) => {
  next(new Unauthorized('С токеном что-то не так.'));
};

// eslint-disable-next-line consistent-return
module.exports = function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) return handleError(res, req, next);

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return handleError(res, req, next);

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleError(res, req, next);
  }

  req.user = payload;

  next();
};
