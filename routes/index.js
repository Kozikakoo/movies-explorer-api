const router = require('express').Router();
const { userLoginValidation, userRegisterValidation } = require('../validations/user');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', userLoginValidation, login);
router.post('/signup', userRegisterValidation, createUser);

router.use(auth);

router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
