import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { payloadDecodeMock } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /login/role', () => {
  beforeEach(() => sinon.restore());

  it('Caso 1: GET /login/role Deve retornar status 200 com role do usuario', async () => {
    // GIVEN
    sinon.stub(jwt, 'verify').resolves(payloadDecodeMock);

    // WHEN
    const response = await chai.request(app).get('/login/role').set('authorization', 'VALID_TOKEN');

    // THEN
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ "role": "admin" });
  });

  it('Caso 2: GET /login/role Deve retornar status 401 com mensagen "Token not found" na ausencia de token', async () => {
    // WHEN
    const response = await chai.request(app).get('/login/role');

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token not found" });
  });

  it('Caso 3: GET /login/role Deve retornar status 401 com mensagen "Token must be a valid token" caso token invalido', async () => {
    // WHEN
    const response = await chai.request(app).get('/login/role').set('authorization', 'INVALID_TOKEN');

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token must be a valid token" });
  });
});