import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';
import { teams, team } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  beforeEach(() => sinon.restore());

  it('Caso 1: Deve retornar status 200', async () => {
    // GIVEN
    sinon.stub(Team, 'findAll').resolves(teams as Team[]);

    // WHEN
    const response = await chai.request(app).get('/teams');

    // THEN
    expect(response.status).to.be.equal(200);
  });

  it('Caso 2: Deve retornar um array com times', async () => {
    // GIVEN
    sinon.stub(Team, 'findAll').resolves(teams as Team[]);

    // WHEN
    const response = await chai.request(app).get('/teams');

    // THEN
    expect(response.body).to.deep.equal(teams);
  });
});

describe('GET /teams/:id', () => {
  beforeEach(() => sinon.restore());

  it('Caso 1: Deve retornar status 200 quando GET /teams/1 ', async () => {
    // GIVEN
    sinon.stub(Team, 'findByPk').resolves(team as Team);

    // WHEN
    const response = await chai.request(app).get(`/teams/${team.id}`);

    // THEN
    expect(response.status).to.be.equal(200);
  });

  it('Caso 2: Deve retornar um time quando GET /teams/1 ', async () => {
    // GIVEN
    sinon.stub(Team, 'findByPk').resolves(team as Team);

    // WHEN
    const response = await chai.request(app).get(`/teams/${team.id}`);

    // THEN
    expect(response.body).to.deep.equal(team);
  });

  it('Caso 3: Deve retornar "Team not found" caso ID não existir ', async () => {
    // GIVEN
    sinon.stub(Team, 'findByPk').resolves(null);

    try {
      // WHEN
      const response = await chai.request(app).get(`/teams/${team.id}`);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal('Team not found');
    }
  });
});
