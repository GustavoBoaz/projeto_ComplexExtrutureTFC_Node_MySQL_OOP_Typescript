const { BASE_URL } = require('../utils/urls');
const { sequelize, dbReset } = require('../utils/sequelize');
const { initBrowser, termBrowser } = require('../config/setupPuppeteer');
const { clubs } = require('../expected_results/women_soccer');

const { pageMatchSettings, header, pageMatchs } = require('../utils/dataTestIds');
const { logAdmin } = require('../utils/logInto');
const { select } = require('../utils/query');

let page;
let database;

const oneGoal = '1';
const twoGoals = '2';
const fiveGoals = '5';
const lastInsert = (list) => list[list.length - 1];
const finish = 'Finalizado';

beforeAll(async () => {
  database = sequelize;
});

afterAll(async () => {
  await database.close();
});

beforeEach(async () => {
  await dbReset();
  page = await initBrowser();
  await page.goto(BASE_URL);
});

afterEach(async () => {
  await termBrowser();
});

describe('10 - Implemente página de Editar Partida', () => {
  it('Será avaliado que é possivel aterar o resultado de uma partida', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const editMatchButton = await page.$(pageMatchs.matchStatusBtn(48));
    await editMatchButton.click();

    await page.waitForTimeout(500);

    const selectQuantityGoalsHomeTeam = await page.$(pageMatchSettings.selectQuantityGoalsHomeTeam);
    const selectQuantityGoalsAwayTeam = await page.$(pageMatchSettings.selectQuantityGoalsAwayTeam);
    await page.waitForTimeout(500);

    await selectQuantityGoalsHomeTeam.click({ clickCount: 3 });
    await selectQuantityGoalsHomeTeam.type(fiveGoals);
    await page.waitForTimeout(500);

    await selectQuantityGoalsAwayTeam.click({ clickCount: 3 });
    await selectQuantityGoalsAwayTeam.type(twoGoals);

    const SaveEditMatchButton = await page.$(pageMatchSettings.editMatchButton);
    await SaveEditMatchButton.click();
    await page.waitForTimeout(500);

    const rows = await database.query(select.all.matchs, { type: 'SELECT' });
    expect(lastInsert(rows).home_team).toBe(clubs[12].id);
    expect(lastInsert(rows).away_team).toBe(clubs[1].id);
    expect(lastInsert(rows).home_team_goals.toString()).toBe(fiveGoals);
    expect(lastInsert(rows).away_team_goals.toString()).toBe(twoGoals);
    expect(lastInsert(rows).in_progress).toBe(1);
  });

  it('Será avaliado que é possivel finalizar uma partida em andamento', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const editMatchButton = await page.$(pageMatchs.matchStatusBtn(48));
    await editMatchButton.click();

    await page.waitForTimeout(500);

    const finishMatchButton = await page.$(pageMatchSettings.finishMatchButton);
    await finishMatchButton.click();

    await page.waitForTimeout(500);

    const buttonShowMatchs = await page.$(header.showMatchsButton);
    await buttonShowMatchs.click();

    await page.waitForTimeout(500);

    const homeTeam = await page.$eval(pageMatchs.homeTeam(48), (el) => el.innerText);
    const awayTeam = await page.$eval(pageMatchs.awayTeam(48), (el) => el.innerText);
    const matchStatus = await page.$eval(pageMatchs.matchStatus(48), (el) => el.innerText);

    const rows = await database.query(select.all.matchs, { type: 'SELECT' });

    await expect(homeTeam).toBe(clubs[12].club_name);
    await expect(awayTeam).toBe(clubs[1].club_name);
    await expect(matchStatus).toBe(finish);
    expect(lastInsert(rows).home_team).toBe(clubs[12].id);
    expect(lastInsert(rows).away_team).toBe(clubs[1].id);
    expect(lastInsert(rows).home_team_goals.toString()).toBe(oneGoal);
    expect(lastInsert(rows).away_team_goals.toString()).toBe(oneGoal);
    expect(lastInsert(rows).in_progress).toBe(0);
  });
});
