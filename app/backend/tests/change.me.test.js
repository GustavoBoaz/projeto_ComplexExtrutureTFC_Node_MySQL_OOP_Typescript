const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

// Essas importações dependem da `build` (script `pretest`)
// ter sido criada corretamente
const { app } = require('../build/app');
const { default: Example } = require('../build/database/models/ExampleModel');

chai.use(chaiHttp);

describe('Seu teste', () => {
  it('Seu sub-teste', () => {
  });
});
