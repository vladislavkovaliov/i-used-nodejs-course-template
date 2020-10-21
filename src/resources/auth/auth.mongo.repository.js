const Session = require('./auth.model');
const jwt = require('jsonwebtoken');

const insertOne = async payload => {
  try {
    const { login, userId } = payload;
    const token = jwt.sign({ userId, login }, `${process.env.JWT_SECRET_KEY}`);
    const auth = await Session.create({
      token,
      userId,
      login
    });

    return auth._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const getSessionByUserId = async payload => {
  try {
    const { userId } = payload;
    const auth = await Session.findOne({
      userId
    });
    if (!auth) {
      throw new Error(`Session with userId=${userId} not found`);
    }

    return auth._doc;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { insertOne, getSessionByUserId };
