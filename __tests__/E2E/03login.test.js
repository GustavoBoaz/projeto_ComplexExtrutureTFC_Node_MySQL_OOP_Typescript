const jwt = require('jsonwebtoken');
const fs = require('fs');
const { URL_PAGE_LOGIN, URL_PAGE_MATCHS } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/setupPuppeteer');
const { pageLogin } = require('../utils/dataTestIds');
const { admin: { validAdmin, invalidAdmin }, user: { validUser } } = require('../utils/users');

const jwtKey = fs
  .readFileSync('./app/backend/jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

let page;

beforeEach(async () => {
  page = await initBrowser();
  await page.goto(URL_PAGE_LOGIN);
});

afterEach(async () => {
  await termBrowser();
});

describe('Crie uma página de login com a rota "/login"', () => {
  it('O avaliador verifica se é possível acessar com dados corretos de um usuário comum, e que após o acesso será redirecionado para a tela de jogos', async () => {
    await page.waitForTimeout(500);

    page.on('response', async (response) => {
      const { _request: { _initiator: { type } } } = await response;

      if (type === 'script' && response.url() === 'http://localhost:3001/auth') {
        const {
          user:
          {
            id, username, role, email, password,
          },
          token,
        } = await response.json();

        expect(await response.status()).toBe(200);
        expect(await response.request().method()).toBe('POST');
        expect(id).toBe(validUser.id);
        expect(username).toBe(validUser.username);
        expect(role).toBe(validUser.role);
        expect(email).toBe(validUser.email);
        expect(password).toBeUndefined();
        expect(
          !!jwt.verify(token, jwtKey),
        ).toEqual(true);
      }
    });

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(validUser.email);

    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(validUser.password);

    const buttonLogin = await page.$(pageLogin.buttonLogin);

    await buttonLogin.click();

    await page.waitForTimeout(500);

    expect(await page.url()).toEqual(URL_PAGE_MATCHS);
  });

  it('O avaliador verifica se é possível acessar com dados corretos de um usuário administrador, e que após o acesso será redirecionado para a tela de jogos', async () => {
    await page.waitForTimeout(500);

    page.on('response', async (response) => {
      const { _request: { _initiator: { type } } } = await response;

      if (type === 'script' && response.url() === 'http://localhost:3001/auth') {
        const {
          user:
          {
            id, username, role, email, password,
          },
          token,
        } = await response.json();

        expect(await response.status()).toBe(200);
        expect(await response.request().method()).toBe('POST');
        expect(id).toBe(validAdmin.id);
        expect(username).toBe(validAdmin.username);
        expect(role).toBe(validAdmin.role);
        expect(email).toBe(validAdmin.email);
        expect(password).toBeUndefined();
        expect(
          !!jwt.verify(token, jwtKey),
        ).toEqual(true);
      }
    });

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(validAdmin.email);

    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(validAdmin.password);

    const buttonLogin = await page.$(pageLogin.buttonLogin);

    await buttonLogin.click();

    await page.waitForTimeout(500);

    expect(await page.url()).toEqual(URL_PAGE_MATCHS);
  });

  it('O avaliador verifica que, não é possível acessar com um email inválido', async () => {
    await page.waitForTimeout(500);

    page.on('response', async (response) => {
      const { _request: { _initiator: { type } } } = await response;

      if (type === 'script' && response.url() === 'http://localhost:3001/auth') {
        expect(await response.status()).toBe(401);
        expect(await response.request().method()).toBe('POST');
        expect(await response.json()).toEqual({ message: 'Incorrect email or password' });
      }
    });

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(invalidAdmin.email);
    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(invalidAdmin.password);
    const buttonLogin = await page.$(pageLogin.buttonLogin);

    await buttonLogin.click();
    await page.waitForTimeout(500);

    const alertLogin = await page.$eval(pageLogin.alertLogin, (el) => el.innerText);

    expect(alertLogin).toBe('O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.');
    expect(await page.url()).toEqual(URL_PAGE_LOGIN);
  });

  it('O avaliador verifica que, não é possível acessar com uma senha inválida', async () => {
    await page.waitForTimeout(500);

    page.on('response', async (response) => {
      const { _request: { _initiator: { type } } } = await response;

      if (type === 'script' && response.url() === 'http://localhost:3001/auth') {
        expect(await response.status()).toBe(401);
        expect(await response.request().method()).toBe('POST');
        expect(await response.json()).toEqual({ message: 'Incorrect email or password' });
      }
    });

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(invalidAdmin.email);
    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(invalidAdmin.password);
    const buttonLogin = await page.$(pageLogin.buttonLogin);

    await buttonLogin.click();
    await page.waitForTimeout(500);

    const alertLogin = await page.$eval(pageLogin.alertLogin, (el) => el.innerText);

    expect(alertLogin).toBe('O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.');
    expect(await page.url()).toEqual(URL_PAGE_LOGIN);
  });

  it('O avaliador verifica que, não é possível acessar sem informar um email', async () => {
    await page.waitForTimeout(500);

    page.on('response', async (response) => {
      const { _request: { _initiator: { type } } } = await response;

      if (type === 'script' && response.url() === 'http://localhost:3001/auth') {
        expect(await response.status()).toBe(401);
        expect(await response.request().method()).toBe('POST');
        expect(await response.json()).toEqual({ message: 'All fields must be filled' });
      }
    });

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(validAdmin.password);
    const buttonLogin = await page.$(pageLogin.buttonLogin);

    await buttonLogin.click();
    await page.waitForTimeout(500);

    const alertLogin = await page.$eval(pageLogin.alertLogin, (el) => el.innerText);

    expect(alertLogin).toBe('O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.');
    expect(await page.url()).toEqual(URL_PAGE_LOGIN);
  });

  it('O avaliador verifica que, não é possível acessar sem informar uma senha', async () => {
    await page.waitForTimeout(500);

    page.on('response', async (response) => {
      const { _request: { _initiator: { type } } } = await response;

      if (type === 'script' && response.url() === 'http://localhost:3001/auth') {
        expect(await response.status()).toBe(401);
        expect(await response.request().method()).toBe('POST');
        expect(await response.json()).toEqual({ message: 'All fields must be filled' });
      }
    });

    expect(await page.$(pageLogin.alertLogin)).toBeNull();

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(validAdmin.email);
    const buttonLogin = await page.$(pageLogin.buttonLogin);

    await buttonLogin.click();
    await page.waitForTimeout(500);

    const alertLogin = await page.$eval(pageLogin.alertLogin, (el) => el.innerText);

    expect(alertLogin).toBe('O endereço de e-mail ou a senha não estão corretos. Por favor, tente novamente.');
    expect(await page.url()).toEqual(URL_PAGE_LOGIN);
  });
});

describe('Ao fazer login, será armazenado os dados do usuario no localstorage, na chave "user"', () => {
  it('Será verificado que existe as chaves username, role e token no localstorage', async () => {
    await page.waitForTimeout(500);

    const inputLogin = await page.$(pageLogin.inputEmail);
    await inputLogin.type(validAdmin.email);

    const inputPassword = await page.$(pageLogin.inputPassword);
    await inputPassword.type(validAdmin.password);

    const buttonLogin = await page.$(pageLogin.buttonLogin);

    await buttonLogin.click();

    await page.waitForTimeout(500);

    const storage = await page.evaluate(() => JSON.parse(localStorage.getItem('user')));

    expect(await page.url()).toEqual(URL_PAGE_MATCHS);
    expect(storage).toHaveProperty('token');
    expect(storage).toHaveProperty('role');
  });
});
