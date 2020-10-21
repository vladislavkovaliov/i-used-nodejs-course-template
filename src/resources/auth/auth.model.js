const R = require('ramda');
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    token: {
      type: String
    },
    userId: {
      type: String
    },
    login: {
      type: String
    }
  },
  { timestamp: true }
);

schema.statics.toResponse = auth => {
  return {
    token: R.prop('token', auth)
  };
};

const Session = mongoose.model('Session', schema);

module.exports = Session;
