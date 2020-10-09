const Board = require('./board.model');
const R = require('ramda');
const { findIndex, find } = require('../../common/utils');

const boards = [];

const getAll = async () => {
  return boards;
};

const getById = async payload => {
  const id = R.prop('id', payload);
  return find(boards, 'id', id);
};

const insertOne = async payload => {
  const board = new Board({
    title: R.prop('title', payload),
    columns: R.prop('columns', payload)
  });

  boards.push(board);

  return board;
};

const updateOne = async payload => {
  const id = R.prop('id', payload);
  const board = new Board({
    title: R.prop('title', payload),
    columns: R.prop('columns', payload)
  });
  const boardFromArray = find(boards, 'id', id);

  boardFromArray.title = board.title;
  boardFromArray.columns = board.columns;

  return board;
};

const deleteOne = async payload => {
  const id = R.prop('id', payload);
  const index = findIndex(boards, 'id', id);
  const clone = R.clone(boards[index]);

  boards.splice(index, 1);

  return clone;
};

module.exports = { getAll, getById, insertOne, updateOne, deleteOne };
