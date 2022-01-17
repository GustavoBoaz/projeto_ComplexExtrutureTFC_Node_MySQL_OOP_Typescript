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

describe('1 - Crie uma migration e um model para as tabelas de clubs, matchs e users', () => {
  it('O avaliador consultará os dados da tabela clubs, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.clubs, { type: 'SELECT' });

    expect(resultQuery).toEqual(clubs);
  });
  it('O avaliador consultará os dados da tabela matchs, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.matchs, { type: 'SELECT' });

    expect(resultQuery).toEqual(matchs);
  });
  it('O avaliador consultará os dados da tabela users, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.users, { type: 'SELECT' });

    expect(resultQuery).toEqual(users);
  });
});

