const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const R = require('ramda');
const { getUserDataFromBody } = require('../../common/utils');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    await res.json(users.map(User.toResponse));
  } catch (e) {
    next(e);
    return;
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = R.prop('id', req.params);
    const user = await usersService.getById({ id });

    await res.json(User.toResponse(user));
  } catch (e) {
    next(e);
    return;
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { name, login, password } = getUserDataFromBody(req.body);
    const user = await usersService.create({
      name,
      login,
      password
    });

    await res.json(User.toResponse(user));
  } catch (e) {
    next(e);
    return;
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = R.prop('id', req.params);
    const user = await usersService.getById({ id });

    if (!user) {
      await res.status(404);
      return;
    }

    const { name, login, password } = getUserDataFromBody(req.body);
    const updatedUser = await usersService.updateOne({
      id,
      name,
      login,
      password
    });

    await res.json(User.toResponse(updatedUser));
  } catch (e) {
    next(e);
    return;
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = R.prop('id', req.params);
    const user = await usersService.getById({ id });

    if (!user) {
      await res.status(404);
      return;
    }

    const deletedUser = await usersService.deleteOne(user);
    await tasksService.removeUserFromTasksByUserId({ id });

    if (!deletedUser) {
      await res.json({
        status: 204
      });
      return;
    }

    await res.json({
      status: 200
    });
  } catch (e) {
    next(e);
    return;
  }
});

module.exports = router;
