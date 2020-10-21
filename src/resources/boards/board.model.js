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
    columns: {
      type: Array
    }
  },
  { timestamps: true }
);

schema.statics.toResponse = board => {
  return {
    id: R.prop('id', board),
    title: R.prop('title', board),
    columns: R.prop('columns', board)
  };
};

const Board = mongoose.model('Board', schema);

module.exports = Board;
