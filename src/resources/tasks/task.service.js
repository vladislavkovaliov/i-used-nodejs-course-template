const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const create = payload => tasksRepo.insertOne(payload);

const updateOne = payload => tasksRepo.updateOne(payload);

const deleteOne = (boardId, taskId) => tasksRepo.deleteOne(boardId, taskId);

const deleteAllTasksByBoarId = payload => tasksRepo.deleteByBoardId(payload);

const removeUserFromTasksByUserId = payload =>
  tasksRepo.removeUserFromTasksByUserId(payload);

module.exports = {
  getAll,
  getById,
  create,
  updateOne,
  deleteOne,
  deleteAllTasksByBoarId,
  removeUserFromTasksByUserId
};
