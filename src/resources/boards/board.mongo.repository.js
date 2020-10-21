const R = require('ramda');
const Board = require('./board.model');

const getAll = async () => {
  try {
    const boards = await Board.find({});
    return Array.from(boards);
  } catch (e) {
    throw new Error(e);
  }
};

const insertOne = async payload => {
  try {
    const board = await Board.create({
      title: R.prop('title', payload),
      columns: R.prop('columns', payload)
    });

    return board._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteOne = async payload => {
  try {
    const id = R.prop('id', payload);
    const result = await Board.findOneAndDelete({ id });
    if (!result) {
      return null;
    }

    return result._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const updateOne = async payload => {
  try {
    const id = R.prop('id', payload);
    const result = await Board.findOneAndUpdate({ id }, payload, {
      new: true
    });
    if (!result) {
      return null;
    }

    return result._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const getById = async payload => {
  try {
    const id = R.prop('id', payload);
    const result = await Board.findOne({ id });
    if (!result) {
      return null;
    }

    return result._doc;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { getAll, insertOne, deleteOne, updateOne, getById };
