const boardsMongoRepo = require('./board.mongo.repository');

const getAll = () => boardsMongoRepo.getAll();

const getById = payload => boardsMongoRepo.getById(payload);

const create = payload => boardsMongoRepo.insertOne(payload);

const updateOne = payload => boardsMongoRepo.updateOne(payload);

const deleteOne = payload => boardsMongoRepo.deleteOne(payload);

module.exports = { getAll, getById, create, updateOne, deleteOne };
