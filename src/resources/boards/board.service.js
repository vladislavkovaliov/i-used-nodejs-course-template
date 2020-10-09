const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = payload => boardsRepo.getById(payload);

const create = payload => boardsRepo.insertOne(payload);

const updateOne = payload => boardsRepo.updateOne(payload);

const deleteOne = payload => boardsRepo.deleteOne(payload);

module.exports = { getAll, getById, create, updateOne, deleteOne };
