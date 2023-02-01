const { URL } = require('../utils/urls');
const { dbReset, initSequelize, termSequelize } = require('../config/sequelize');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { teams } = require('../expected_results/trybe_football_club');
const { pageMatchSettings, header, pageMatches } = require('../utils/dataTestIds');
const { logAdmin } = require('../utils/logInto');
const { select } = require('../utils/query');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const { normalize, getRequirement, delay } = require('../utils/util');
const waitForResponse = require('../utils/waitForResponse');
const axios = require('axios').default;

const oneGoal = 1;
const twoGoals = "2";
const threeGoals = 3;
const fiveGoals = "5";
const lastInsert = (list) => list[list.length - 1];

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


describe(getRequirement(28), () => {
  it('Será validado na API que não é possível alterar o resultado de uma partida sem um token', async () => {
    const dadosInsert = {
      homeTeam: teams[1].teamName,
      awayTeam: teams[3].teamName,
      homeTeamGoals: threeGoals,
      awayTeamGoals: oneGoal
    }

    const { data: { token } } = await axios.post(`${URL(containerPorts.backend).BASE_URL}/login`, {
      "email": "admin@admin.com",
      "password": "secret_admin"
    });

    expect(token).not.toBeNull();

    const result = await axios
      .patch(
        `${URL(containerPorts.backend).BASE_URL}/matches/2`,
        dadosInsert,
      )
      .then(({ status, data: { message } }) => ({ status, message }))
      .catch(({ response: { status, data: { message } } }) => ({ status, message }));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("message");
    expect(result.status).toBe(401);
    expect(result.message).toBe("Token not found");
  });

  it('Será validado na API que não é possível alterar o resultado de uma partida com um token inválido', async () => {
    const dadosInsert = {
      homeTeam: teams[1].teamName,
      awayTeam: teams[3].teamName,
      homeTeamGoals: threeGoals,
      awayTeamGoals: oneGoal
    }

    const { data: { token } } = await axios.post(`${URL(containerPorts.backend).BASE_URL}/login`, {
      "email": "admin@admin.com",
      "password": "secret_admin"
    });

    expect(token).not.toBeNull();

    const result = await axios
      .patch(
        `${URL(containerPorts.backend).BASE_URL}/matches/2`,
        dadosInsert,
        {
          headers: {
            authorization: 'token'
          }
        }
      )
      .then(({ status, data: { message } }) => ({ status, message }))
      .catch(({ response: { status, data: { message } } }) => ({ status, message }));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("message");
    expect(result.status).toBe(401);
    expect(result.message).toBe("Token must be a valid token");
  });

  it('Será avaliado que é possível alterar o resultado de uma partida', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await logAdmin(page, containerPorts.frontend);

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const testMatchId = 48;

    const editMatchButton = await page.$(pageMatches.matchStatusBtn(testMatchId));
    await editMatchButton.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const selectQuantityGoalsHomeTeam = await page.$(pageMatchSettings.selectQuantityGoalsHomeTeam);
    const selectQuantityGoalsAwayTeam = await page.$(pageMatchSettings.selectQuantityGoalsAwayTeam);
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await selectQuantityGoalsHomeTeam.click({ clickCount: 3 });
    await selectQuantityGoalsHomeTeam.type(fiveGoals);
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await selectQuantityGoalsAwayTeam.click({ clickCount: 3 });
    await selectQuantityGoalsAwayTeam.type(twoGoals);

    const SaveEditMatchButton = await page.$(pageMatchSettings.editMatchButton);

    await waitForResponse({
      page,
      trigger: () => SaveEditMatchButton.click(),
      expectedRequestType: 'script',
      expectedRequestMethod: 'PATCH',
      expectedResponseStatus: 200,
      expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/matches/${testMatchId}`,
      timeOut: 100000
    });

    const matches = await database.query(select.all.matches, { type: 'SELECT' });
    const normalizeMatches = normalize(matches);
    const lastInsertedRow = lastInsert(normalizeMatches);

    expect(lastInsertedRow.homeTeamId).toBe(teams[12].id);
    expect(lastInsertedRow.awayTeamId).toBe(teams[1].id);
    expect(lastInsertedRow.homeTeamGoals.toString()).toBe(fiveGoals);
    expect(lastInsertedRow.awayTeamGoals.toString()).toBe(twoGoals);
    expect(lastInsertedRow.inProgress).toBe(1);
  });
});
