const R = require('ramda');

const getUserDataFromBody = R.pickAll(['id', 'name', 'login', 'password']);

const getBoardDataFromBody = R.pickAll(['id', 'title', 'columns']);

const getTaskDataFromBody = R.pickAll([
  'id',
  'title',
  'order',
  'description',
  'userId',
  'boardId',
  'columnId'
]);

const filter = R.curry((array, key, value) =>
  R.filter(R.propEq(key, value), array)
);

module.exports = {
  getBoardDataFromBody,
  getUserDataFromBody,
  getTaskDataFromBody,
  filter
};
