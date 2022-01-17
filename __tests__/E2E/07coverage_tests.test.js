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
    expect(frontEnd.pct).toBeGreaterThanOrEqual(20);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(40);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(20);
    expect(backEnd.covered).toBeGreaterThanOrEqual(40);
  });
});

describe('Crie testes que cubram no mínimo X por cento dos arquivos do front-end e back-end em src com um mínimo de X linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(40);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(80);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(40);
    expect(backEnd.covered).toBeGreaterThanOrEqual(80);
  });
});

describe('Crie testes que cubram no mínimo X por cento dos arquivos do front-end e back-end em src com um mínimo de X linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(60);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(120);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(60);
    expect(backEnd.covered).toBeGreaterThanOrEqual(120);
  });
});
