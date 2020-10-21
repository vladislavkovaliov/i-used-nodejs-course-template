const tasksMongoRepo = require('./task.mongo.repository');

const getAll = boardId => tasksMongoRepo.getAll(boardId);

const getById = (boardId, taskId) => tasksMongoRepo.getById(boardId, taskId);

const create = payload => tasksMongoRepo.insertOne(payload);

const updateOne = payload => tasksMongoRepo.updateOne(payload);

const deleteOne = (boardId, taskId) =>
  tasksMongoRepo.deleteOne(boardId, taskId);

const deleteAllTasksByBoarId = payload =>
  tasksMongoRepo.deleteByBoardId(payload);

const removeUserFromTasksByUserId = payload =>
  tasksMongoRepo.removeUserFromTasksByUserId(payload);

module.exports = {
  getAll,
  getById,
  create,
  updateOne,
  deleteOne,
  deleteAllTasksByBoarId,
  removeUserFromTasksByUserId
};
