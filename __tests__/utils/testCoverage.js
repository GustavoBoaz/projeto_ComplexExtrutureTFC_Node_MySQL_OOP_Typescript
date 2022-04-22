const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { readFile } = require('fs').promises;
const { resolve } = require('path');

const testCoverage = async (app) => {
  const appPath = resolve(__dirname, '..', '..', 'app', app);
  const testCommand = `npm --prefix ${appPath} run test:coverage:json &> /dev/null`;

  await exec(testCommand)
    .catch((error) => console
      .error(`Erro na execução do teste de cobertura no "${app}":\n"${error.message || ''}"`));

  const path = resolve(appPath, 'coverage', 'coverage-summary.json');

  const { stdout } = await exec(`cat ${path}`).catch(err => true);

  console
    .warn(`Rodando o comando '${testCommand}' para gerar e colher a cobertura de testes:\n\n`, JSON.parse(stdout || {}));

  const { skipped, pct, covered } = await readFile(path, 'utf-8')
    .then((coverageTxt) => JSON.parse(coverageTxt))
    .then(({ total: { lines } }) => lines)
    .catch((error) => {
      console.error(error.message);
      return ({ skipped: null, pct: null, covered: null });
    });

  await exec(`rm -rf ${resolve(appPath, 'coverage')} ${resolve(appPath, '.nyc_output')}`)
    .catch(() => true);

  return {
    path,
    skipped,
    pct,
    covered,
  };
};

module.exports = testCoverage;
