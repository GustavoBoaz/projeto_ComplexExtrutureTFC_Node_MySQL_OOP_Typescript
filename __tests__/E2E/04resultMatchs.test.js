const { BASE_URL, URL_PAGE_MATCHS_SETTINGS } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/setupPuppeteer');
const { pageMatchs, header } = require('../utils/dataTestIds');
const { logAdmin, logUser } = require('../utils/logInto');
const { allMatchs, onlyInProgress, onlyFinished } = require('../entities/matchs');
const { validateMatchs } = require('../utils/validateMatchs');

let page;
const IN_PROGRESS = 'Em andamento';
const FINISH = 'Finalizado';
const ALL_MATCHS = 'Status do Jogo';

beforeEach(async () => {
  page = await initBrowser();
  await page.goto(BASE_URL);
});

afterEach(async () => {
  await termBrowser();
});

describe('Crie uma página com os jogos que finalizaram e que ainda estão em andamento', () => {
  it('Será validado que todos os componentes estão na tela quando acessado por uma pessoa usuária', async () => {
    await page.waitForTimeout(500);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(500);

    await validateMatchs(page, ALL_MATCHS, allMatchs, false);
  });

  it('Será validado que ao escolher a opção de partidas em andamento será filtrado todas as partidas em andamento', async () => {
    await page.waitForTimeout(500);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(500);

    await validateMatchs(page, IN_PROGRESS, onlyInProgress, false);
  });

  it('Será validado que ao escolher a opção de partidas finalizadas será filtrado todas as partidas finalizadas', async () => {
    await page.waitForTimeout(500);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(500);

    await validateMatchs(page, FINISH, onlyFinished, false);
  });

  it('Será validado que todos os componentes estão na tela quando acessado por uma pessoa administradora', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);

    await page.select(pageMatchs.optionShowFinishMatch, ALL_MATCHS);

    await page.waitForTimeout(500);

    await validateMatchs(page, ALL_MATCHS, allMatchs, true);
  });

  it('Será validado que o botão adicionar partida está visivel quando houver um usuário logado e o seu perfil for de administrador.', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);
    const buttonAddNewMatch = await page.$(pageMatchs.addNewMatchButton);
    await expect(buttonAddNewMatch).not.toBeNull();
  });

  it('Será validado que ao clicar no botão de adicionar partida, será redirecionado para tela de "matchs/settings"', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logAdmin(page);

    await page.waitForTimeout(500);
    const buttonAddNewMatch = await page.$(pageMatchs.addNewMatchButton);
    await buttonAddNewMatch.click();

    await page.waitForTimeout(500);

    await expect(page.url()).toBe(URL_PAGE_MATCHS_SETTINGS);
  });

  it('Será validado que o botão adicionar partida não está visivel quando não houver um usuário com a role "user" logado.', async () => {
    await page.waitForTimeout(500);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(500);

    await logUser(page);

    await page.waitForTimeout(500);
    const buttonAddNewMatch = await page.$(pageMatchs.addNewMatchButton);
    await expect(buttonAddNewMatch).toBeNull();
  });
});
