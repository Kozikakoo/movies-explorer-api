const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV , JWT_SECRET } = process.env;

//const JWT_SECRET = "some-secret-key"

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => res.send({
      token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
    }))

    .catch(() => {
      next(new UnauthorizedError('Ошибка авторизации'));
    });
};
