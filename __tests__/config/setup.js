const { exec, delay } = require('../utils/util');
const {
  evalId,
  challengesFolder: dockerDir,
  containerWorkDir: workDir,
  defaultDelay,
  containerPorts,
} = require('./constants');
const { initCompose, termCompose } = require('../utils/compose');
const { initSequelize, termSequelize } = require('../utils/sequelize');

global.beforeAll(async () => {
  await exec('docker rm -fv $(docker ps -qaf name=trybe-eval-)')
    .catch(() => true);

  await exec([
    'docker run',
    `--name ${evalId}`,
    '--privileged',
    '-d',
    `-w ${workDir}`,
    `-v ${dockerDir}:${workDir}`,
    `-p ${containerPorts.frontend}:${containerPorts.frontend}`,
    `-p ${containerPorts.backend}:${containerPorts.backend}`,
    `-p ${containerPorts.database}:${containerPorts.database}`,
    'mjgargani/docker:dind-trybe1.0',
  ].join(' '));

  await delay(defaultDelay);
  await initCompose();
  await delay(defaultDelay);
  await initSequelize();
});

global.afterAll(async () => {
  await termSequelize();
  await termCompose();
  await exec('docker rm -fv $(docker ps -qaf name=trybe-eval-)')
    .catch(() => true);
});
