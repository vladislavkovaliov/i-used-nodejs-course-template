const Task = require('./task.model');
const R = require('ramda');
const {
  findIndex,
  filter,
  find,
  updateTasks,
  updateUserId,
  noFilter
} = require('../../common/utils');

let tasks = [];

const getAll = async boardId => {
  return filter(tasks, 'boardId', boardId);
};

const getById = async (boardId, taskId) => {
  const filteredTasksByBoardId = filter(tasks, 'boardId', boardId);

  return find(filteredTasksByBoardId, 'id', taskId);
};

const insertOne = async payload => {
  const task = new Task({
    title: R.prop('title', payload),
    order: R.prop('order', payload),
    description: R.prop('description', payload),
    userId: R.prop('userId', payload),
    boardId: R.prop('boardId', payload),
    columnId: R.prop('columnId', payload)
  });

  tasks.push(task);

  return task;
};

const updateOne = async payload => {
  const boardId = R.prop('boardId', payload);
  const filteredTaskByBoardId = filter(tasks, 'boardId', boardId);
  const taskId = R.prop('id', payload);
  const task = new Task({
    id: taskId,
    title: R.prop('title', payload),
    order: R.prop('order', payload),
    description: R.prop('description', payload),
    userId: R.prop('userId', payload),
    boardId: R.prop('boardId', payload),
    columnId: R.prop('columnId', payload)
  });

  const foundedTask = find(filteredTaskByBoardId, 'id', taskId);

  foundedTask.title = task.title;
  foundedTask.order = task.order;
  foundedTask.description = task.description;
  foundedTask.boardId = task.boardId;
  foundedTask.userId = task.userId;
  foundedTask.columnId = task.columnId;

  return task;
};

const deleteOne = async (boardId, taskId) => {
  const filteredTasksByBoardId = filter(tasks, 'boardId', boardId);
  const index = findIndex(filteredTasksByBoardId, 'id', taskId);
  const clone = R.clone(tasks[index]);

  tasks.splice(index, 1);

  return clone;
};

const deleteByBoardId = async payload => {
  const id = R.prop('id', payload);
  const filterTasksWithoutBoardId = noFilter(tasks, 'boardId', id);

  tasks = [...filterTasksWithoutBoardId];
};

const removeUserFromTasksByUserId = async payload => {
  const id = R.prop('id', payload);
  const updatedTasks = updateTasks(tasks, updateUserId(id, null));

  tasks = [...updatedTasks];
};

module.exports = {
  getAll,
  getById,
  insertOne,
  updateOne,
  deleteOne,
  deleteByBoardId,
  removeUserFromTasksByUserId
};
