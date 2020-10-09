const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = payload => usersRepo.getById(payload);

const create = payload => usersRepo.insertOne(payload);

const updateOne = payload => usersRepo.updateOne(payload);

const deleteOne = payload => usersRepo.deleteOne(payload);

module.exports = { getAll, getById, create, updateOne, deleteOne };
