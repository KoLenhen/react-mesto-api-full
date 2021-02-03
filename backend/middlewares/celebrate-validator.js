const { celebrate, Joi } = require('celebrate');
// /https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=\S]*)/
// /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=\S]*)/),
  }),
});

const getUserByIDValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const userInfoUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const userAvatarUpdateValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=\S]*)/),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=\S]*)/).required(),
  }),
});

const delCardValidator = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const addLikeValidator = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const delLikeValidator = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  loginValidator,
  createUserValidator,
  getUserByIDValidator,
  userInfoUpdateValidator,
  userAvatarUpdateValidator,
  createCardValidator,
  delCardValidator,
  addLikeValidator,
  delLikeValidator,
};
