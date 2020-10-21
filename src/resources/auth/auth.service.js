const sessionRepo = require('./auth.mongo.repository');

const create = payload => sessionRepo.insertOne(payload);

const getSessionByUserId = payload => sessionRepo.getSessionByUserId(payload);

module.exports = { create, getSessionByUserId };
