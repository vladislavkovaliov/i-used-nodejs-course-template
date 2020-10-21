const uuid = require('uuid');
const R = require('ramda');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

schema.statics.saltPassword = async password => {
  try {
    const hash = await bcrypt.hash(password, `${process.env.SALT}`);

    return hash;
  } catch (e) {
    throw new Error(e);
  }
};

const User = mongoose.model('User', schema);

module.exports = User;
