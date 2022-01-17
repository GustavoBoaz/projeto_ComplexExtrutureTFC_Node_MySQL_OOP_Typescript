/* eslint-disable no-async-promise-executor */
/* eslint-disable no-promise-executor-return */
const { promisify } = require('util');
const { log: consoleLog, warn: consoleWarn } = require('console');

const { evalId, defaultDelay } = require('../config/constants');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const exec = promisify(require('child_process').exec);

const validate = (command = '') => {
  if (
    !command
    || (
      !command.startsWith('docker ')
      && !command.startsWith('docker-compose ')
    )
    || (
      command.includes('&')
      || command.includes('|')
      || command.includes('(')
      || command.includes(')')
      || command.includes(';')
    )
  ) {
    throw new Error(`Comando inválido\n'${command}'`);
  }
  return true;
};

const readCommand = async (
  inputCommand = '',
  log = true,
) => {
  const command = inputCommand.replace(/\n$/, '').trim();
  if (validate(command)) {
    const { stdout: current, stderr } = await exec(`docker exec ${evalId} /bin/sh -c '${command}'`);

    await delay(Math.round(defaultDelay / 3));

    if (log) {
      if (current) {
        consoleLog(`\n----\nSaída do comando '${command}':\n\n${current}----\n`);
      }
      if (stderr) {
        consoleWarn(`\n----\nAlerta ou Erro do comando '${command}':\n\n${stderr}----\n`);
      }
    }

    return {
      stdout: current.replace(/\n$/, '').trim(),
      stderr,
    };
  }

  return false;
};

module.exports = {
  delay,
  exec,
  readCommand,
  validate,
};
