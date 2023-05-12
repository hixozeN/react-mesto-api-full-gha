const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const { validateLogin, validateRegistration } = require('../utils/validationConfig');
const NotFound = require('../utils/responsesWithError/NotFound');

router.use('/users', authMiddleware, require('./userRouter'));
router.use('/cards', authMiddleware, require('./cardRouter'));

router.use('/signin', validateLogin, login);
router.use('/signup', validateRegistration, createUser);

router.use('*', authMiddleware, (req, res, next) => {
  next(new NotFound('Указанный путь не найден.'));
});

module.exports = router;
