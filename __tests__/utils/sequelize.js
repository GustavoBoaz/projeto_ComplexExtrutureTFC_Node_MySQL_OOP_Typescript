const { Sequelize } = require('sequelize');
const { exec: callbackExec } = require('child_process');
const util = require('util');
const {
  database, username, password, host, dialect, port,
} = require('./configSequelize');

const exec = util.promisify(callbackExec);

const sequelize = new Sequelize(database, username, password, { host, dialect, port });

async function initSequelize() {
  await exec('npm run db:reset');

  const validate = await sequelize.query('SELECT 1+1 as result', { type: 'SELECT' });

  expect(validate[0]).toHaveProperty('result', 2);

  return sequelize;
}

async function termSequelize() {
  sequelize.close();
}

async function dbReset() {
  await exec('npm run db:reset');
}

module.exports = {
  initSequelize,
  termSequelize,
  dbReset,
  sequelize,
};
