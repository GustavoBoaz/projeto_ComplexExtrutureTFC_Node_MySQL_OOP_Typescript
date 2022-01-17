const { sequelize } = require('../utils/sequelize');
const { users, clubs, matchs } = require('../expected_results/women_soccer');
const { select } = require('../utils/query');

let database;

beforeAll(async () => {
  database = sequelize;
});

afterAll(async () => {
  await database.close();
});

describe('Pré requisito - Crie uma migration e um model para a tabela de clubs', () => {
  it('O avaliador consultará os dados da tabela clubs, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.clubs, { type: 'SELECT' });

    expect(resultQuery).toEqual(clubs);
  });
});

describe('Pré requisito - Crie uma migration e um model para a tabela de matchs', () => {
  it('O avaliador consultará os dados da tabela matchs, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.matchs, { type: 'SELECT' });

    expect(resultQuery).toEqual(matchs);
  });
});

describe('Pré requisito - Crie uma migration e um model para a tabela de users', () => {
  it('O avaliador consultará os dados da tabela users, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.users, { type: 'SELECT' });

    expect(resultQuery).toEqual(users);
  });
});
