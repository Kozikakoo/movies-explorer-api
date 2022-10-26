const router = require('express').Router();
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const { userUpdateValidation } = require('../validations/user');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', userUpdateValidation, updateUser);

module.exports = router;
