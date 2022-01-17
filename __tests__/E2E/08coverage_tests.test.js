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

describe('11 - Crie testes que cubram no mínimo 40 por cento dos arquivos do front-end e back-end em src com um mínimo de 60 linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(40);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(60);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(40);
    expect(backEnd.covered).toBeGreaterThanOrEqual(60);
  });
});

describe('12 - Crie testes que cubram no mínimo 50 por cento dos arquivos do front-end e back-end em src com um mínimo de 70 linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(50);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(70);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(50);
    expect(backEnd.covered).toBeGreaterThanOrEqual(70);
  });
});

describe('13 - Crie testes que cubram no mínimo 60 por cento dos arquivos do front-end e back-end em src com um mínimo de 80 linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(60);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(80);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(60);
    expect(backEnd.covered).toBeGreaterThanOrEqual(80);
  });
});

describe('14 - Crie testes que cubram no mínimo 70 por cento dos arquivos do front-end e back-end em src com um mínimo de 100 linhas cobertas em cada', () => {
  test('No front-end e no back-end', () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(70);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(100);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(70);
    expect(backEnd.covered).toBeGreaterThanOrEqual(100);
  });
});
