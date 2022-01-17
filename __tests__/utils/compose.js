const { readCommand } = require('./util');

async function initCompose() {
  await readCommand('docker-compose up --build -d');
}

async function termCompose() {
  await readCommand('docker-compose down');
}

module.exports = { initCompose, termCompose };
