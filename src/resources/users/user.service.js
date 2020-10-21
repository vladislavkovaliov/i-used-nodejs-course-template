const usersMongoRepo = require('./user.mongo.repository');

const getAll = () => usersMongoRepo.getAll();

const getById = payload => usersMongoRepo.getById(payload);

const create = payload => usersMongoRepo.insertOne(payload);

const updateOne = payload => usersMongoRepo.updateOne(payload);

const deleteOne = payload => usersMongoRepo.deleteOne(payload);

module.exports = { getAll, getById, create, updateOne, deleteOne };
