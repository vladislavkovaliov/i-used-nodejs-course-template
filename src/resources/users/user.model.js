const uuid = require('uuid');
const R = require('ramda');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    return {
      id: R.prop('id', user),
      name: R.prop('name', user),
      login: R.prop('login', user)
    };
  }
}

module.exports = User;
