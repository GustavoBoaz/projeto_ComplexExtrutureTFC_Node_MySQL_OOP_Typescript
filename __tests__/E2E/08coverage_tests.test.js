const testCoverage = require('../utils/testCoverage');

const frontEndCoverage = async () => testCoverage('frontend');
const backEndCoverage = async () => testCoverage('backend');

let frontEnd;
let backEnd;

beforeAll(async () => {
  const [frontendCoverage, backendCoverage] = await Promise.all([frontEndCoverage(), backEndCoverage()]);
  frontEnd = frontendCoverage;
  backEnd = backendCoverage;

  expect(frontEnd).toMatchObject({
    path: expect.any(String),
    skipped: expect.any(Number),
    pct: expect.any(Number),
    covered: expect.any(Number),
  });
  expect(backEnd).toMatchObject({
    path: expect.any(String),
    skipped: expect.any(Number),
    pct: expect.any(Number),
    covered: expect.any(Number),
  });
});

describe('Crie testes que cubram no mínimo X por cento dos arquivos do front-end e back-end em src com um mínimo de X linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(30);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(75);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(30);
    expect(backEnd.covered).toBeGreaterThanOrEqual(75);
  });
});

describe('Crie testes que cubram no mínimo X por cento dos arquivos do front-end e back-end em src com um mínimo de X linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(60);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(150);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(60);
    expect(backEnd.covered).toBeGreaterThanOrEqual(150);
  });
});

describe('Crie testes que cubram no mínimo X por cento dos arquivos do front-end e back-end em src com um mínimo de X linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(90);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(225);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(90);
    expect(backEnd.covered).toBeGreaterThanOrEqual(225);
  });
});
