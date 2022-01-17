const {
  BASE_URL, URL_PAGE_LOGIN, URL_PAGE_LEADERBOARD, URL_PAGE_MATCHS, URL_PAGE_MATCHS_SETTINGS,
} = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/setupPuppeteer');
const { pageMatchs } = require('../utils/dataTestIds');
const { header } = require('../utils/dataTestIds');
const { logAdmin } = require('../utils/logInto');

const CLASSIFICATION = 'CLASSIFICAÇÃO';
const MATCHS = 'PARTIDAS';
const ADD_MATCH_SETTINGS = 'ADICIONAR PARTIDA';
const EDIT_MATCH_SETTINGS = 'EDITAR PARTIDA';
const LOGIN = 'LOGIN';

let page;

beforeEach(async () => {
  page = await initBrowser();
  await page.goto(BASE_URL);
});

afterEach(async () => {
  await termBrowser();
});
describe('2 - O header deve possuir um titulo indicando em qual página estamos', () => {
  it('Sera avaliado que na página de classificacao o header possui o titulo  "CLASSIFICACAO"', async () => {
    await page.waitForTimeout(500);

    const headerTitle = await page.$eval(header.title, (title) => title.innerText);

    expect(await page.url()).toBe(URL_PAGE_LEADERBOARD);
    expect(headerTitle).toBe(CLASSIFICATION);
  });
  it('Sera avaliado que na página de login o header possui o titulo  "login"', async () => {
    await page.waitForTimeout(500);

    const loginButton = await page.$(header.loginButton);
    await loginButton.click();

    await page.waitForTimeout(500);

    const headerTitle = await page.$eval(header.title, (title) => title.innerText);

    expect(await page.url()).toBe(URL_PAGE_LOGIN);
    expect(headerTitle).toBe(LOGIN);
  });
  it('Sera avaliado que na página de jogos o header possui o titulo  "JOGOS"', async () => {
    await page.waitForTimeout(500);

    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();

    await page.waitForTimeout(500);

    const headerTitle = await page.$eval(header.title, (title) => title.innerText);

    expect(await page.url()).toBe(URL_PAGE_MATCHS);
    expect(headerTitle).toBe(MATCHS);
  });
  it('Sera avaliado que na página de adicionar partida o header possui o titulo  "ADICIONAR PARTIDA"', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const addNewMatchButton = await page.$(pageMatchs.addNewMatchButton);
    await addNewMatchButton.click();
    await page.waitForTimeout(500);

    const headerTitle = await page.$eval(header.title, (title) => title.innerText);

    expect(await page.url()).toBe(URL_PAGE_MATCHS_SETTINGS);
    expect(headerTitle).toBe(ADD_MATCH_SETTINGS);
  });

  it('Sera avaliado que na página de editar partida o header possui o titulo  "EDITAR PARTIDA"', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    const editMatchButton = await page.$(pageMatchs.matchStatusBtn(47));
    await editMatchButton.click();

    await page.waitForTimeout(500);

    const headerTitle = await page.$eval(header.title, (title) => title.innerText);
    await page.waitForTimeout(500);

    expect(await page.url()).toBe(URL_PAGE_MATCHS_SETTINGS);
    expect(headerTitle).toBe(EDIT_MATCH_SETTINGS);
  });
});
describe('3 - Implemente os botões que redirecionam para as páginas de Login, Partidas, Classificação', () => {
  it('Sera avaliado que ao clicar no botão, será redirecionara para a rota `/login`', async () => {
    await page.waitForTimeout(500);

    const loginButton = await page.$(header.loginButton);
    await loginButton.click();
    await page.waitForTimeout(500);

    await expect(page.url()).toBe(URL_PAGE_LOGIN);
  });
  it('Sera avaliado que ao clicar no botão, será redirecionara para a rota `/matchs`', async () => {
    await page.waitForTimeout(500);
    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(500);

    await expect(page.url()).toBe(URL_PAGE_MATCHS);
  });
  it('Sera avaliado que ao clicar no botão, será redirecionara para a rota `/leaderboard`', async () => {
    await page.waitForTimeout(500);
    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(500);

    const showClassificationButton = await page.$(header.showClassificationButton);
    await showClassificationButton.click();
    await page.waitForTimeout(500);

    await expect(page.url()).toBe(URL_PAGE_LEADERBOARD);
  });
});


