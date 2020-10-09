const uuid = require('uuid');
const R = require('ramda');

class Task {
  constructor({
    id = uuid(),
    title = 'TITLE',
    order = 'ORDER',
    description = 'DESCRIPTION',
    userId = 'USER_ID',
    boardId = 'BOARD_ID',
    columnId = 'COLUMN_ID'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    return {
      id: R.prop('id', task),
      title: R.prop('title', task),
      order: R.prop('order', task),
      description: R.prop('description', task),
      userId: R.prop('userId', task),
      boardId: R.prop('boardId', task),
      columnId: R.prop('columnId', task)
    };
  }
}

module.exports = Task;
