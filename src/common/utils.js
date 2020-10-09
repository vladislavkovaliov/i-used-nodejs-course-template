const R = require('ramda');

const findIndex = R.curry((array, key, value) =>
  R.findIndex(R.propEq(key, value), array)
);

const find = R.curry((array, key, value) =>
  R.find(R.propEq(key, value), array)
);

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

const updateUserId = R.curry((userId, value) =>
  R.when(R.propSatisfies(R.propEq('userId', userId)), R.assoc('userId', value))
);

const updateTasks = R.curry((arr, fn) => R.map(fn, arr));

const propNotEq = R.complement(R.propEq);

const filterByBoardId = R.curry((array, boardId) =>
  R.filter(propNotEq('boardId', boardId), array)
);

const noFilter = R.curry((array, key, value) =>
  R.filter(propNotEq(key, value), array)
);

const filter = R.curry((array, key, value) =>
  R.filter(R.propEq(key, value), array)
);

module.exports = {
  findIndex,
  find,
  noFilter,
  getBoardDataFromBody,
  getUserDataFromBody,
  getTaskDataFromBody,
  updateUserId,
  updateTasks,
  filterByBoardId,
  filter
};
