const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const {
  uncaughtExceptionLogger,
  unhandledRejectionLogger
} = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
morganBody(app);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    message: err.message
  });
});

// setTimeout(() => {
//   throw new Error('Oops!');
// }, 2000);
//
// setTimeout(() => {
//   Promise.reject(Error('Oops!'));
// }, 4000);

process.on('uncaughtException', err => {
  uncaughtExceptionLogger.error(err.message);
});

process.on('unhandledRejection', err => {
  unhandledRejectionLogger.error(err.message);
});

module.exports = app;
