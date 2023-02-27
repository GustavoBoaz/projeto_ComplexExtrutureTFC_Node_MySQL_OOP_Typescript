import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { 
  invalidEmailsMock,
  invalidPasswordsMock,
  notEmailLoginMock,
  notFoundEmailLoginMock,
  notFoundPasswordLoginMock,
  notPasswordLoginMock,
  userMock,
  validLoginMock
} from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  beforeEach(() => sinon.restore());

  it('Caso 1: POST /login Deve retornar status 200', async () => {
    // GIVEN
    sinon.stub(User, 'findOne').resolves(userMock as User);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    // WHEN
    const response = await chai.request(app).post('/login').send(validLoginMock);

    // THEN
    expect(response.status).to.equal(200);
  });

  it('Caso 2: POST /login Deve retornar chave token', async () => {
    // GIVEN
    sinon.stub(User, 'findOne').resolves(userMock as User);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    // WHEN
    const response = await chai.request(app).post('/login').send(validLoginMock);

    // THEN
    expect(response.body).to.have.key('token');
  });

  it('Caso 3: POST /login Deve retornar status 400 e messagem "All fields must be filled", na ausencia do campo email', async () => {
    // WHEN
    const response = await chai.request(app).post('/login').send(notEmailLoginMock);

    // THEN
    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Caso 4: POST /login Deve retornar status 400 e messagem "All fields must be filled", na ausencia do campo password', async () => {
    // WHEN
    const response = await chai.request(app).post('/login').send(notPasswordLoginMock);

    // THEN
    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Caso 5: POST /login Deve retornar status 401 e messagem "Invalid email or password", quando email inesistente no banco', async () => {
    // WHEN
    const response = await chai.request(app).post('/login').send(notFoundEmailLoginMock);

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Caso 6: POST /login Deve retornar status 401 e messagem "Invalid email or password", quando senha não bater com a do banco', async () => {
    // WHEN
    const response = await chai.request(app).post('/login').send(notFoundPasswordLoginMock);

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Caso 7: POST /login Deve retornar status 401 e messagem "Invalid email or password", quando email mal formatado', async () => {
    invalidEmailsMock.map(async (mock) => {
      // WHEN
      const response = await chai.request(app).post('/login').send(mock);

      // THEN
      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  });

  it('Caso 8: POST /login Deve retornar status 401 e messagem "Invalid email or password", quando password mal formatado', async () => {
    invalidPasswordsMock.map(async (mock) => {
      // WHEN
      const response = await chai.request(app).post('/login').send(mock);

      // THEN
      expect(response.status).to.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  });
});