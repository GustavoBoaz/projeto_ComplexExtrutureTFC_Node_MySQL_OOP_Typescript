const { BASE_URL } = require('../utils/urls');
const { sequelize, dbReset } = require('../utils/sequelize');
const { initBrowser, termBrowser } = require('../config/setupPuppeteer');
const { pageMatchSettings, header, pageMatchs } = require('../utils/dataTestIds');
const { logAdmin } = require('../utils/logInto');
const { clubs } = require('../expected_results/women_soccer');
const { select } = require('../utils/query');

let page;
const twoGoals = '2';
const oneGoal = '1';
const lastInsert = (list) => list[list.length - 1];

let database;

beforeAll(async () => {
  database = sequelize;
});

afterAll(async () => {
  await database.close();
});

beforeEach(async () => {
  page = await initBrowser();
  await page.goto(BASE_URL);
});

afterEach(async () => {
  await termBrowser();
});

describe('9 - Implemente a página de Adicionar Partida', () => {
  it('Será avaliado que existem todos os componentes na tela', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const addNewMatchButton = await page.$(pageMatchs.addNewMatchButton);
    addNewMatchButton.click();

    await page.waitForTimeout(500);

    const selectHomeTeam = await page.$(pageMatchSettings.selectHomeTeam);
    const selectQuantityGoalsHomeTeam = await page.$(pageMatchSettings.selectQuantityGoalsHomeTeam);
    const selectQuantityGoalsAwayTeam = await page.$(pageMatchSettings.selectQuantityGoalsAwayTeam);
    const selectAwayTeam = await page.$(pageMatchSettings.selectAwayTeam);
    const saveMatchButton = await page.$(pageMatchSettings.saveMatchButton);
    const finishMatchButton = await page.$(pageMatchSettings.finishMatchButton);

    expect(selectHomeTeam).not.toBeNull();
    expect(selectQuantityGoalsHomeTeam).not.toBeNull();
    expect(selectQuantityGoalsAwayTeam).not.toBeNull();
    expect(selectAwayTeam).not.toBeNull();
    expect(saveMatchButton).not.toBeNull();
    expect(finishMatchButton).not.toBeNull();
  });

  it('Será validado que é possível salvar um jogo no banco de dados e ver o jogo na página de jogos', async () => {
    await dbReset();
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const addNewMatchButton = await page.$(pageMatchs.addNewMatchButton);
    addNewMatchButton.click();

    await page.waitForTimeout(500);

    await page.select(pageMatchSettings.selectHomeTeam, clubs[3].club_name);

    await page.select(pageMatchSettings.selectAwayTeam, clubs[8].club_name);

    const selectQuantityGoalsHomeTeam = await page.$(
      pageMatchSettings.selectQuantityGoalsHomeTeam,
    );
    await selectQuantityGoalsHomeTeam.type(twoGoals);

    const selectQuantityGoalsAwayTeam = await page.$(
      pageMatchSettings.selectQuantityGoalsAwayTeam,
    );
    await selectQuantityGoalsAwayTeam.type(oneGoal);
    await page.waitForTimeout(500);

    const saveMatchButton = await page.$(pageMatchSettings.saveMatchButton);
    await saveMatchButton.click();

    const rows = await database.query(select.all.matchs, { type: 'SELECT' });

    page.on('response', async (response) => {
      const { _request: { _initiator: { type } } } = await response;

      if (type === 'script' && response.url() === 'http://localhost:3001/matchs') {
        const result = await response.json();

        expect(await response.status()).toBe(200);
        expect(await response.request().method()).toBe('POST');
        await expect(lastInsert(rows)).toBe(result);
      }
    });

    expect(lastInsert(rows).home_team).toBe(clubs[3].id);
    expect(lastInsert(rows).away_team).toBe(clubs[8].id);

    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(500);

    const homeTeam = await page.$eval(pageMatchs.homeTeam(49), (el) => el.innerText);
    const awayTeam = await page.$eval(pageMatchs.awayTeam(49), (el) => el.innerText);

    await expect(homeTeam).toBe(clubs[3].club_name);
    await expect(awayTeam).toBe(clubs[8].club_name);
  });

  it('Será validado que ao finalizar uma partida é alterado no banco de dados e na página', async () => {
    await dbReset();
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const addNewMatchButton = await page.$(pageMatchs.addNewMatchButton);
    addNewMatchButton.click();

    await page.waitForTimeout(500);

    await page.select(pageMatchSettings.selectHomeTeam, clubs[3].club_name);

    await page.select(pageMatchSettings.selectAwayTeam, clubs[8].club_name);

    const selectQuantityGoalsHomeTeam = await page.$(
      pageMatchSettings.selectQuantityGoalsHomeTeam,
    );
    await selectQuantityGoalsHomeTeam.type(twoGoals);

    const selectQuantityGoalsAwayTeam = await page.$(
      pageMatchSettings.selectQuantityGoalsAwayTeam,
    );
    await selectQuantityGoalsAwayTeam.type(oneGoal);

    const saveMatchButton = await page.$(pageMatchSettings.saveMatchButton);
    await saveMatchButton.click();

    const finishMatchButton = await page.$(pageMatchSettings.finishMatchButton);
    await finishMatchButton.click();
    await page.waitForTimeout(500);

    const rows = await database.query(select.all.matchs, { type: 'SELECT' });

    expect(lastInsert(rows).home_team).toBe(clubs[3].id);
    expect(lastInsert(rows).away_team).toBe(clubs[8].id);
    expect(lastInsert(rows).in_progress).toBe(0);

    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(500);

    const homeTeam = await page.$eval(pageMatchs.homeTeam(49), (el) => el.innerText);
    const awayTeam = await page.$eval(pageMatchs.awayTeam(49), (el) => el.innerText);
    const matchStatus = await page.$eval(pageMatchs.matchStatus(49), (el) => el.innerText);

    await expect(homeTeam).toBe(clubs[3].club_name);
    await expect(awayTeam).toBe(clubs[8].club_name);
    await expect(matchStatus).toBe('Finalizado');
  });

  it('Será validado que não é possivel inserir uma partida com times iguais', async () => {
    await dbReset();
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const addNewMatchButton = await page.$(pageMatchs.addNewMatchButton);
    addNewMatchButton.click();

    await page.waitForTimeout(500);

    await page.select(pageMatchSettings.selectHomeTeam, clubs[3].club_name);

    await page.select(pageMatchSettings.selectAwayTeam, clubs[3].club_name);

    const selectQuantityGoalsHomeTeam = await page.$(
      pageMatchSettings.selectQuantityGoalsHomeTeam,
    );
    await selectQuantityGoalsHomeTeam.type(twoGoals);

    const selectQuantityGoalsAwayTeam = await page.$(
      pageMatchSettings.selectQuantityGoalsAwayTeam,
    );
    await selectQuantityGoalsAwayTeam.type(oneGoal);

    const saveMatchButton = await page.$(pageMatchSettings.saveMatchButton);
    await saveMatchButton.click();

    const message = 'It is not possible to create a match with two equal teams';
    const finalResponse = await page.waitForResponse((response) => response.url() === 'http://localhost:3001/matchs');

    await expect(finalResponse.status()).toBe(401);
    await expect(finalResponse.request().method()).toBe('POST');
    await expect(message).toBe(await finalResponse.json());
  });
  it('Será validado que não é possivel inserir uma partida com time que não existe na tabela clubs', async () => {
    await dbReset();
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const addNewMatchButton = await page.$(pageMatchs.addNewMatchButton);
    addNewMatchButton.click();

    await page.waitForTimeout(500);

    await page.select(pageMatchSettings.selectHomeTeam, 'Barcelona');

    await page.select(pageMatchSettings.selectAwayTeam, clubs[3].club_name);

    const selectQuantityGoalsHomeTeam = await page.$(
      pageMatchSettings.selectQuantityGoalsHomeTeam,
    );
    await selectQuantityGoalsHomeTeam.type(twoGoals);

    const selectQuantityGoalsAwayTeam = await page.$(
      pageMatchSettings.selectQuantityGoalsAwayTeam,
    );
    await selectQuantityGoalsAwayTeam.type(oneGoal);

    const saveMatchButton = await page.$(pageMatchSettings.saveMatchButton);
    await saveMatchButton.click();

    const message = 'There is no team with such id!';

    const finalResponse = await page.waitForResponse((response) => response.url() === 'http://localhost:3001/matchs');

    await expect(finalResponse.status()).toBe(401);
    await expect(finalResponse.request().method()).toBe('POST');
    await expect(message).toBe(await finalResponse.json());
  });
});
