const Card = require('../models/card');
const { NotFoundError, WrongIdError, AuthorizedButForbidden } = require('../middlewares/error-handler');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        throw new NotFoundError('Нет карточек');
      }
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
};

const delCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Нет карточки с таким ID'))
    .then((card) => {
      const cardOwnerId = card.owner.toString();
      if (cardOwnerId !== userId) {
        throw new AuthorizedButForbidden('Попытка удалить/редактировать информацию другого пользователя');
      }
      return Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.status(200).send(deletedCard));
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  if (!cardId || cardId.length !== 24) throw new WrongIdError('Неправильный ID');
  Card.findByIdAndUpdate(cardId, {
    $addToSet: {
      likes: _id,
    },
  },
  {
    runValidators: true,
    new: true,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким ID');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const delLike = (req, res, next) => {
  const { cardId } = req.params;
  if (!cardId || cardId.length !== 24) throw new WrongIdError('Неправильный ID');
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, {
    $pull: {
      likes: _id,
    },
  },
  {
    runValidators: true,
    new: true,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким ID');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  createCard, getCards, addLike, delLike, delCard,
};
