const R = require('ramda');
const Task = require('./task.model');

const getAll = async boardId => {
  try {
    const tasks = await Task.find({
      boardId
    });
    return Array.from(tasks);
  } catch (e) {
    throw new Error(e);
  }
};

const insertOne = async payload => {
  try {
    const taskId = R.prop('id', payload);
    const task = await Task.create({
      id: taskId,
      title: R.prop('title', payload),
      order: R.prop('order', payload),
      description: R.prop('description', payload),
      userId: R.prop('userId', payload),
      boardId: R.prop('boardId', payload),
      columnId: R.prop('columnId', payload)
    });

    return task._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteOne = async (boardId, taskId) => {
  try {
    const result = await Task.findOneAndDelete({ id: taskId, boardId });
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
    const result = await Task.findOneAndUpdate({ id }, payload, {
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

const getById = async (boardId, taskId) => {
  try {
    const result = await Task.findOne({ id: taskId, boardId });
    if (!result) {
      return null;
    }

    return result._doc;
  } catch (e) {
    throw new Error(e);
  }
};

const removeUserFromTasksByUserId = async payload => {
  try {
    const id = R.prop('id', payload);
    await Task.updateMany(
      { userId: id },
      {
        userId: null
      }
    );
  } catch (e) {
    throw new Error(e);
  }
};

const deleteByBoardId = async payload => {
  try {
    const id = R.prop('id', payload);
    await Task.deleteMany({
      boardId: id
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getAll,
  insertOne,
  deleteOne,
  updateOne,
  getById,
  deleteByBoardId,
  removeUserFromTasksByUserId
};
