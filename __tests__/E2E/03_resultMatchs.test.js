const { URL } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { pageMatchs, header } = require('../utils/dataTestIds');
const { logAdmin, logUser } = require('../utils/logInto');
const { allMatchs, onlyInProgress, onlyFinished } = require('../entities/matchs');
const { validateMatchs } = require('../utils/validateMatchs');
const { dbReset, initSequelize, termSequelize } = require('../config/sequelize');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const { getRequirement } = require('../utils/util');

const IN_PROGRESS = 'Em andamento';
const FINISH = 'Finalizado';
const ALL_MATCHS = 'Todos os Jogos';

let database, browser, page;

beforeAll(async () => {
  database = await initSequelize();
});

afterAll(async () => termSequelize(database));

beforeEach(async () => {
  await dbReset();
  [browser, page] = await initBrowser();
  await page.goto(URL(containerPorts.frontend).BASE_URL);
});

afterEach(async () => {
  await termBrowser(browser);
});

describe(getRequirement(15), () => {
  it('Será validado que a página apresentará todos os dados de partidas sem nenhum filtro', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatchs(page, ALL_MATCHS, allMatchs, false);
  });
});

describe(getRequirement(17), () => {
  it('Será validado que ao escolher a opção de partidas em andamento será filtrado todas as partidas em andamento', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatchs(page, IN_PROGRESS, onlyInProgress, false);
  });
});

describe(getRequirement(19), () => {
  it('Será validado que ao escolher a opção de partidas finalizadas será filtrado todas as partidas finalizadas', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatchs(page, FINISH, onlyFinished, false);
  });
});
