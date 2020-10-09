const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const R = require('ramda');
const { getTaskDataFromBody } = require('../../common/utils');

router.route('/:boardId/tasks').get(async (req, res) => {
  const boardId = R.prop('boardId', req.params);
  const tasks = await tasksService.getAll(boardId);
  await res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const boardId = R.prop('boardId', req.params);
  const taskId = R.prop('taskId', req.params);
  const task = await tasksService.getById(boardId, taskId);

  if (!task) {
    await res.status(404).json(404);
    return;
  }

  await res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const boardId = R.prop('boardId', req.params);
  const { title, order, description, userId, columnId } = getTaskDataFromBody(
    req.body
  );
  const task = await tasksService.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });

  await res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const boardId = R.prop('boardId', req.params);
  const taskId = R.prop('taskId', req.params);
  const task = await tasksService.getById(boardId, taskId);
  const { title, order, description, userId, columnId } = getTaskDataFromBody(
    req.body
  );

  if (!task) {
    await res.status(404).json(404);
    return;
  }

  const updatedTask = await tasksService.updateOne({
    id: taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });

  await res.json(Task.toResponse(updatedTask));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const boardId = R.prop('boardId', req.params);
  const taskId = R.prop('taskId', req.params);
  const task = await tasksService.deleteOne(boardId, taskId);

  if (!task) {
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
