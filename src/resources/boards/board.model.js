const uuid = require('uuid');
const R = require('ramda');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = 'COLUMNS' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    return {
      id: R.prop('id', board),
      title: R.prop('title', board),
      columns: R.prop('columns', board)
    };
  }
}

module.exports = Board;
