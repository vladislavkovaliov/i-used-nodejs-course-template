const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
const R = require('ramda');
const { getBoardDataFromBody } = require('../../common/utils');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    await res.json(boards.map(Board.toResponse));
  } catch (e) {
    next(e);
    return;
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = R.prop('id', req.params);
    const board = await boardsService.getById({ id });

    if (!board) {
      await res.status(404).json(404);
      return;
    }

    await res.json(Board.toResponse(board));
  } catch (e) {
    next(e);
    return;
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { title, columns } = getBoardDataFromBody(req.body);
    const board = await boardsService.create({
      title,
      columns
    });

    await res.json(Board.toResponse(board));
  } catch (e) {
    next(e);
    return;
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = R.prop('id', req.params);
    const board = await boardsService.getById({ id });

    if (!board) {
      await res.status(404);
      return;
    }

    const { title, columns } = getBoardDataFromBody(req.body);
    const updatedBoard = await boardsService.updateOne({
      id,
      title,
      columns
    });

    await res.json(Board.toResponse(updatedBoard));
  } catch (e) {
    next(e);
    return;
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = R.prop('id', req.params);
    const board = await boardsService.getById({ id });

    if (!board) {
      await res.status(404);
      return;
    }

    const deletedBoard = await boardsService.deleteOne(board);
    await tasksService.deleteAllTasksByBoarId({ id });

    if (!deletedBoard) {
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
