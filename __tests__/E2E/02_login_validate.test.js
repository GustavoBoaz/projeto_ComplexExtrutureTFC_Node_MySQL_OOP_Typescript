const jwt = require('jsonwebtoken');
const fs = require('fs');
const { URL } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { pageLogin } = require('../utils/dataTestIds');
const { admin: { validAdmin, invalidAdmin }, user: { validUser } } = require('../utils/users');
const { dbReset, termSequelize, initSequelize } = require('../config/sequelize');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const waitForResponse = require('../utils/waitForResponse');
const { getRequirement } = require('../utils/util');

const jwtKey = fs
  .readFileSync('./app/backend/jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

let database, browser, page;

beforeAll(async () => {
  database = await initSequelize();
});

afterAll(async () => termSequelize(database));

beforeEach(async () => {
  await dbReset();
  [browser, page] = await initBrowser();
  await page.goto(URL(containerPorts.frontend).URL_PAGE_LOGIN);
});

afterEach(async () => {
  await termBrowser(browser);
});

describe(getRequirement(8), () => {
  it('O avaliador verificará se é possível fazer o login com dados corretos e que após o acesso será redirecionado para a tela de jogos', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(validAdmin.email);

    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(validAdmin.password);

    const buttonLogin = await page.$(pageLogin.buttonLogin);

    const { body: { user, token } } = await waitForResponse({
      page,
      trigger: () => buttonLogin.click(),
      expectedRequestType: 'script',
      expectedRequestMethod: 'POST',
      expectedResponseStatus: 200,
      expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/auth`
    });

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    expect(user?.id).toBe(validAdmin.id);
    expect(user?.username).toBe(validAdmin.username);
    expect(user?.role).toBe(validAdmin.role);
    expect(user?.email).toBe(validAdmin.email);
    expect(user?.password).toBeUndefined();
    expect(
      !!jwt.verify(token, jwtKey),
    ).toEqual(true);

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    expect(await page.url()).toEqual(URL(containerPorts.frontend).URL_PAGE_MATCHS);
  });
});

describe(getRequirement(10), () => {
  it('O avaliador verificará se fazer o login com um email incorreto retornará status não-autorizado', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(invalidAdmin.email);
    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(invalidAdmin.password);
    const buttonLogin = await page.$(pageLogin.buttonLogin);

    const { body: { message } } = await waitForResponse({
      page,
      trigger: () => buttonLogin.click(),
      expectedRequestType: 'script',
      expectedRequestMethod: 'POST',
      expectedResponseStatus: 401,
      expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/auth`
    });

    expect(message).toBe('Incorrect email or password');

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const alertLogin = await page.$eval(pageLogin.alertLogin, (el) => el.innerText);

    expect(alertLogin).toBe('O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.');
    expect(await page.url()).toEqual(URL(containerPorts.frontend).URL_PAGE_LOGIN);
  });
});

describe(getRequirement(12), () => {
  it('O avaliador verificará se fazer o login com uma senha incorreta retornará status não-autorizado', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(invalidAdmin.email);
    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(invalidAdmin.password);
    const buttonLogin = await page.$(pageLogin.buttonLogin);

    const { body: { message } } = await waitForResponse({
      page,
      trigger: () => buttonLogin.click(),
      expectedRequestType: 'script',
      expectedRequestMethod: 'POST',
      expectedResponseStatus: 401,
      expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/auth`
    });

    expect(message).toBe('Incorrect email or password');

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const alertLogin = await page.$eval(pageLogin.alertLogin, (el) => el.innerText);

    expect(alertLogin).toBe('O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.');
    expect(await page.url()).toEqual(URL(containerPorts.frontend).URL_PAGE_LOGIN);
  });
});

describe(getRequirement(14), () => {
  it('O avaliador verificará se tentar fazer o login sem e-mail retornará status não-autorizado', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(validAdmin.password);
    const buttonLogin = await page.$(pageLogin.buttonLogin);

    const { body: { message } } = await waitForResponse({
      page,
      trigger: () => buttonLogin.click(),
      expectedRequestType: 'script',
      expectedRequestMethod: 'POST',
      expectedResponseStatus: 401,
      expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/auth`
    });

    expect(message).toBe('All fields must be filled');

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const alertLogin = await page.$eval(pageLogin.alertLogin, (el) => el.innerText);

    expect(alertLogin).toBe('O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.');
    expect(await page.url()).toEqual(URL(containerPorts.frontend).URL_PAGE_LOGIN);
  });
});

describe(getRequirement(16), () => {
  it('O avaliador verificará se tentar fazer o login sem senha retornará status não-autorizado', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(validAdmin.email);
    const buttonLogin = await page.$(pageLogin.buttonLogin);

    const { body: { message } } = await waitForResponse({
      page,
      trigger: () => buttonLogin.click(),
      expectedRequestType: 'script',
      expectedRequestMethod: 'POST',
      expectedResponseStatus: 401,
      expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/auth`
    });

    expect(message).toBe('All fields must be filled');

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const alertLogin = await page.$eval(pageLogin.alertLogin, (el) => el.innerText);

    expect(alertLogin).toBe('O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.');
    expect(await page.url()).toEqual(URL(containerPorts.frontend).URL_PAGE_LOGIN);
  });
});
