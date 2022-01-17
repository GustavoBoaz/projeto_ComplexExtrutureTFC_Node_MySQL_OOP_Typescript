const { initBrowser, termBrowser } = require('../config/setupPuppeteer');
const { sequelize, dbReset } = require('../utils/sequelize');
const { validateLeaderboardBody, validateLeaderboardHeader } = require('../utils/validateLeaderboard');
const { insert } = require('../utils/query');
const { state01, state02, state03 } = require('../entities/leaderboard');
const { leaderboard } = require('../utils/dataTestIds');
const {
  URL_PAGE_LEADERBOARD,
  URL_PAGE_LOGIN,
  URL_PAGE_MATCHS,
} = require('../utils/urls');

let database;

/* O Docker deveria ser inicializado juntamente com o Sequelize para o teste rodar no container porem não estou fazendo isso aqui devido ao problema no Docker que não espera o Backend popular o Banco de Dados com o Sequelize */
beforeAll(async () => {
  database = sequelize;
});

afterAll(async () => {
  await database.close();
});

describe('Verifica a tabela de ScoreBoard', () => {
  let page;

  beforeEach(async () => {
    await dbReset();
    page = await initBrowser();
    await page.goto(URL_PAGE_LEADERBOARD);
  });

  afterEach(async () => {
    await termBrowser();
  });

  it('O Header da tabela possui os campos corretos', async () => {
    await validateLeaderboardHeader(leaderboard, page);
  });

  it('O Body da tabela possui os campos e valores corretos considerando os dados iniciais do banco de dados', async () => {
    await validateLeaderboardBody(state01, leaderboard, page);
  });

  it('O Body da tabela possui os campos e valores corretos após acrescentar a partida Avaí/Kindermann 3 X 0 Cruzeiro', async () => {
    await database.query(insert.leaderboard(1, 3, 5, 1, 0), { type: 'INSERT' });

    await validateLeaderboardBody(state02, leaderboard, page);
  });

  it('O Body da tabela possui os campos e valores corretos após acrescentar a partida Minas Brasília 1 X 0 Ferroviária', async () => {
    await database.query(insert.leaderboard(10, 1, 6, 0, 0), { type: 'INSERT' });

    await validateLeaderboardBody(state03, leaderboard, page);
  });
});

describe('Verifica se é possível a partir da página LEADERBOARD navegar para', () => {
  let page;

  beforeEach(async () => {
    page = await initBrowser();
    await page.goto(URL_PAGE_LEADERBOARD);
  });

  afterEach(async () => {
    await termBrowser();
  });

  it('A página de login', async () => {
    const loginBtn = await page.$(leaderboard.loginButton);

    await loginBtn.click();
    await page.waitForTimeout(500);

    expect(await page.url()).toEqual(URL_PAGE_LOGIN);
  });

  it('A página de Jogos', async () => {
    const matchsBtn = await page.$(leaderboard.matchsButton);

    await matchsBtn.click();
    await page.waitForTimeout(500);

    await expect(await page.url()).toEqual(URL_PAGE_MATCHS);
  });
});
