const uuid = require('uuid');
const R = require('ramda');
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    name: {
      type: String,
      default: 'No name'
    },
    login: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
);

schema.statics.toResponse = user => {
  return {
    id: R.prop('id', user),
    name: R.prop('name', user),
    login: R.prop('login', user)
  };
};

const User = mongoose.model('User', schema);

module.exports = User;
