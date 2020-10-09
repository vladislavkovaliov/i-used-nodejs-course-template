const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
const R = require('ramda');
const { getBoardDataFromBody } = require('../../common/utils');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  await res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = R.prop('id', req.params);
  const board = await boardsService.getById({ id });

  if (!board) {
    await res.status(404).json(404);
    return;
  }

  await res.json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const { title, columns } = getBoardDataFromBody(req.body);
  const board = await boardsService.create({
    title,
    columns
  });

  await res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
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
});

router.route('/:id').delete(async (req, res) => {
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
});

module.exports = router;
