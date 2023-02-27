import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import IMatch from '../api/interfaces/IMatch';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import { payloadDecodeMock } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET, PATCH e POST /matches', () => {
  beforeEach(() => sinon.restore());

  it('Caso 1: GET /matchs Deve retornar lista de partidas no formato correto', async () => {
    // WHEN
    const response = await chai.request(app).get('/matches');

    // THEN
    expect(response.status).to.be.equal(200);
    response.body.map((match: IMatch) => {
      // Não deve ter as propriedades
      expect(match).to.not.have.property('home_team_id');
      expect(match).to.not.have.property('away_team_id');

      // Deve ter as propriedades
      expect(match).to.have.property('id');
      expect(match).to.have.property('homeTeamId');
      expect(match).to.have.property('homeTeamGoals');
      expect(match).to.have.property('awayTeamId');
      expect(match).to.have.property('awayTeamGoals');
      expect(match).to.have.property('inProgress');
      expect(match).to.have.property('homeTeam');
      expect(match).to.have.property('awayTeam');

      // Sua tipagen deve ser
      expect(match.id).to.be.a('number');
      expect(match.homeTeamId).to.be.a('number');
      expect(match.homeTeamGoals).to.be.a('number');
      expect(match.awayTeamId).to.be.a('number');
      expect(match.awayTeamGoals).to.be.a('number');
      expect(match.inProgress).to.be.a('boolean');
      expect(match.homeTeam).to.be.an('object');
      expect(match.awayTeam).to.be.an('object');
    });
  });

  it('Caso 2: GET /matches?inProgress=true Deve retornar lista com partidas inProgress = true', async () => {
    // WHEN
    const response = await chai.request(app).get('/matches?inProgress=true');

    // THEN
    expect(response.status).to.be.equal(200);
    response.body.map((match: IMatch) => {
      expect(match.inProgress).to.be.equal(true);
    });
  });

  it('Caso 3: GET /matches?inProgress=false Deve retornar lista com partidas inProgress = false', async () => {
    // WHEN
    const response = await chai.request(app).get('/matches?inProgress=false');

    // THEN
    expect(response.status).to.be.equal(200);
    response.body.map((match: IMatch) => {
      expect(match.inProgress).to.be.equal(false);
    });
  });

  it('Caso 4: PATCH /matches/:id/finish Deve ser possivel finalizar uma partida passando ID Valido e TOKEN no headers valido', async () => {
    // GIVEN
    sinon.stub(jwt, 'verify').resolves(payloadDecodeMock);

    // WHEN
    const response = await chai.request(app).patch('/matches/1/finish').set('authorization', 'VALID_TOKEN');

    // THEN
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({ "message": "Finished" });
  });

  it('Caso 5: PATCH /matches/:id/finish Deve retornar status 401 com mensagen "Token not found" na ausencia de token e ID valido', async () => {
    // WHEN
    const response = await chai.request(app).patch('/matches/1/finish');

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token not found" });
  });

  it('Caso 6: PATCH /matches/:id/finish Deve retornar status 401 com mensagen "Token must be a valid token" caso token invalido e ID valido', async () => {
    // WHEN
    const response = await chai.request(app).patch('/matches/1/finish').set('authorization', 'INVALID_TOKEN');

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token must be a valid token" });
  });

  it('Caso 7: PATCH /matches/:id Deve ser possivel atualizar uma partida em andamento ID Valido e TOKEN no headers valido', async () => {
    // GIVEN
    sinon.stub(jwt, 'verify').resolves(payloadDecodeMock);

    // WHEN
    const response = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'VALID_TOKEN')
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1,
      });

    // THEN
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({ "message": "Updated" });
  });

  it('Caso 8: PATCH /matches/:id Deve retornar status 401 com mensagen "Token not found" na ausencia de token e ID valido', async () => {
    // WHEN
    const response = await chai.request(app).patch('/matches/1');

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token not found" });
  });

  it('Caso 9: PATCH /matches/:id Deve retornar status 401 com mensagen "Token must be a valid token" caso token invalido e ID valido', async () => {
    // WHEN
    const response = await chai.request(app).patch('/matches/1').set('authorization', 'INVALID_TOKEN');

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token must be a valid token" });
  });

  it('Caso 10: POST /matches Deve ser possivel criar uma partida com TOKEN no headers valido', async () => {
    // GIVEN
    sinon.stub(jwt, 'verify').resolves(payloadDecodeMock);

    // WHEN
    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'VALID_TOKEN')
      .send({
        "homeTeamId": 16,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });

    // THEN
    expect(response.status).to.be.equal(201);

    // Não deve ter as propriedades
    expect(response.body).to.not.have.property('home_team_id');
    expect(response.body).to.not.have.property('away_team_id');

    // Deve ter as propriedades
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('homeTeamId');
    expect(response.body).to.have.property('homeTeamGoals');
    expect(response.body).to.have.property('awayTeamId');
    expect(response.body).to.have.property('awayTeamGoals');
    expect(response.body).to.have.property('inProgress');
  });

  it('Caso 11: POST /matches Deve retornar status 401 com mensagen "Token not found" na ausencia de token', async () => {
    // WHEN
    const response = await chai.request(app).post('/matches');

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token not found" });
  });

  it('Caso 12: POST /matches Deve retornar status 401 com mensagen "Token must be a valid token" caso token invalido', async () => {
    // WHEN
    const response = await chai.request(app).post('/matches').set('authorization', 'INVALID_TOKEN');

    // THEN
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ "message": "Token must be a valid token" });
  });

  it('Caso 13: POST /matches Não deve ser possivel criar uma partida com ID de times iguais e com TOKEN no headers valido', async () => {
    // GIVEN
    sinon.stub(jwt, 'verify').resolves(payloadDecodeMock);

    try {
      // WHEN
      await chai.request(app)
        .post('/matches')
        .set('authorization', 'VALID_TOKEN')
        .send({
          "homeTeamId": 8,
          "awayTeamId": 8,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2,
        });
    } catch (error) {
      // THEN
      expect((error as Error).stack).to.equal('422');
      expect((error as Error).message).to.be.equal('It is not possible to create a match with two equal teams');
    }
  });

  it('Caso 14: POST /matches Não deve ser possivel criar uma partida com ID de times que não existam e com TOKEN no headers valido', async () => {
    // GIVEN
    sinon.stub(jwt, 'verify').resolves(payloadDecodeMock);

    try {
      // WHEN
      await chai.request(app)
        .post('/matches')
        .set('authorization', 'VALID_TOKEN')
        .send({
          "homeTeamId": 9999,
          "awayTeamId": 8888,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2,
        });
    } catch (error) {
      // THEN
      expect((error as Error).stack).to.equal('404');
      expect((error as Error).message).to.be.equal('There is no team with such id!');
    }
  });
});