const R = require('ramda');
const User = require('./user.model');

const getAll = async () => {
  try {
    const users = await User.find({});
    return Array.from(users);
  } catch (e) {
    throw new Error(e);
  }
};

const insertOne = async payload => {
  try {
    const user = await User.create({
      name: R.prop('name', payload),
      login: R.prop('login', payload),
      password: R.prop('password', payload)
    });

    return user._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteOne = async payload => {
  try {
    const id = R.prop('id', payload);
    const result = await User.findOneAndDelete({ id });
    if (!result) {
      throw new Error(`User with id=${id} not found`);
    }

    return result._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const updateOne = async payload => {
  try {
    const id = R.prop('id', payload);
    const result = await User.findOneAndUpdate({ id }, payload, {
      new: true
    });
    if (!result) {
      throw new Error(`User with id=${id} not found`);
    }

    return result._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const getById = async payload => {
  try {
    const id = R.prop('id', payload);
    const result = await User.findOne({ id });
    if (!result) {
      throw new Error(`User with id=${id} not found`);
    }

    return result._doc;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { getAll, insertOne, deleteOne, updateOne, getById };
