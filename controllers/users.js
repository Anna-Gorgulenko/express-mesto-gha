const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../utils/constants');
const User = require('../models/user');
const AuthenticationError = require('../errors/AuthenticationError');
const NotFoundError = require('../errors/NotFoundError');
const DuplicateDataError = require('../errors/DuplicateDataError');
const InvalidDataError = require('../errors/InvalidDataError');

// Регистрация пользователя
function registrationUser(req, res, next) {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateDataError('Пользователь с данным электронным адресом уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new InvalidDataError('Передача некорректных данные при регистрации пользователя'));
      } else {
        next(err);
      }
    });
}

// Логин пользователя
function loginUser(req, res, next) {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign(
          { userId },
          SECRET_KEY,
          { expiresIn: '7d' },
        );

        return res.send({ _id: token });
      }

      throw new AuthenticationError('Неправильные почта или пароль');
    })
    .catch(next);
}

// Получение всех пользователей из базы данных
function getUsersInfo(_, res, next) {
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

// Поиск конкретного пользователя по его ID:
function getUserId(req, res, next) {
  const { id } = req.params;

  User
    .findById(id)

    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError('Передача некорректного id'));
      } else {
        next(err);
      }
    });
}

// Пользователь
function getUserInfo(req, res, next) {
  const { userId } = req.user;

  User
    .findById(userId)
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError('Передача некорректного id'));
      } else {
        next(err);
      }
    });
}

// редактирование данных пользователя
function editProfileUserInfo(req, res, next) {
  const { name, about } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(
      userId,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InvalidDataError('Передача некорректных данных при попытке обновления профиля'));
      } else {
        next(err);
      }
    });
}

// Редактирование аватара пользователя
function changeUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(
      userId,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InvalidDataError('Передача некорректных данных при попытке обновления аватара'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  registrationUser,
  loginUser,
  getUsersInfo,
  getUserId,
  getUserInfo,
  editProfileUserInfo,
  changeUserAvatar,
};
