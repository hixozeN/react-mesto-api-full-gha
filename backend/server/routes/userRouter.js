const userRouter = require('express').Router();
const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { validateUserId, validateUserUpdate, validateUpdateAvatar } = require('../utils/validationConfig');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateUserId, getUser);
userRouter.patch('/me', validateUserUpdate, updateUser);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = userRouter;
