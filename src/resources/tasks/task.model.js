const uuid = require('uuid');
const R = require('ramda');
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    title: {
      type: String,
      default: 'No title'
    },
    order: {
      type: Number
    },
    description: {
      type: String,
      default: 'No description'
    },
    userId: {
      type: String
    },
    boardId: {
      type: String
    },
    columnId: {
      type: String
    }
  },
  { timestamps: true }
);

schema.statics.toResponse = task => {
  return {
    id: R.prop('id', task),
    title: R.prop('title', task),
    order: R.prop('order', task),
    description: R.prop('description', task),
    userId: R.prop('userId', task),
    boardId: R.prop('boardId', task),
    columnId: R.prop('columnId', task)
  };
};

const Task = mongoose.model('Task', schema);

module.exports = Task;
