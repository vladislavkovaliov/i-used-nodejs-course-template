const User = require('./user.model');
const R = require('ramda');
const { find, findIndex } = require('../../common/utils');

const users = [];

const getAll = async () => {
  return users;
};

const getById = async payload => {
  const id = R.prop('id', payload);

  return find(users, 'id', id);
};

const insertOne = async payload => {
  const user = new User({
    name: R.prop('name', payload),
    login: R.prop('login', payload),
    password: R.prop('password', payload)
  });

  users.push(user);

  return user;
};

const updateOne = async payload => {
  const id = R.prop('id', payload);
  const user = new User({
    id,
    name: R.prop('name', payload),
    login: R.prop('login', payload),
    password: R.prop('password', payload)
  });
  const foundedUser = find(users, 'id', id);
  foundedUser.name = user.name;
  foundedUser.login = user.login;
  foundedUser.passive = user.password;

  return user;
};

const deleteOne = async payload => {
  const id = R.prop('id', payload);
  const index = findIndex(users, 'id', id);
  const clone = R.clone(users[index]);

  users.splice(index, 1);

  return clone;
};

module.exports = { getAll, getById, insertOne, updateOne, deleteOne };
