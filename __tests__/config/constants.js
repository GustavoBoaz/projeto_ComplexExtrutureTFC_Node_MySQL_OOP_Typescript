const { resolve } = require('path');
const uuid = require('uuid').v4;

const evalId = process.env.EVAL_CONTAINER_NAME || `trybe-eval-${uuid()}`;

module.exports = {
  evalId,
  challengesFolder: resolve('app'),
  containerWorkDir: `/${evalId}`,
  containerPorts: {
    frontend: 3000,
    backend: 3001,
    database: 3002,
  },
  defaultDelay: 10000,
};
