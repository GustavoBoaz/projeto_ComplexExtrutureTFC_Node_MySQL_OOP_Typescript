import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IServiceMatch from '../interfaces/IServiceMatch';
import AContractJWT from '../contracts/AContractJWT';
import IdNotFoundError from '../errors/IdNotFoundError';
import IUpdateMatch from '../interfaces/IUpdateMatch';
import ICreateMatch from '../interfaces/ICreateMatch';
import IdIqualsTeamError from '../errors/IdIqualsTeamError';

const ID_NOT_FOUND = 'Match not found';
const ID_TEAM_NOT_EXIST = 'There is no team with such id!';
const IQUAL_HOME_AND_AWAY_TEAM = 'It is not possible to create a match with two equal teams';

export default class MarchService extends AContractJWT implements IServiceMatch<Match> {
  protected modelM: ModelStatic<Match> = Match;
  protected modelT: ModelStatic<Team> = Team;

  async readAll(inProgress?: string): Promise<Match[]> {
    if (inProgress) {
      return this.modelM.findAll({
        where: { inProgress: JSON.parse(inProgress) },
        attributes: { exclude: ['home_team_id', 'away_team_id'] },
        //raw: true,
        include: { all: true, attributes: { exclude: ['id'] } },
      });
    }
    return this.modelM.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      //raw: true,
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

  async finalizaPartida(id: number): Promise<void> {
    const jogo = await this.modelM.findByPk(id);
    if (!jogo) throw new IdNotFoundError(ID_NOT_FOUND);
    await this.modelM.update({
      inProgress: false,
    }, {
      where: { id },
    });
  }

  async atualizaPartida(id: number, dto: IUpdateMatch): Promise<void> {
    const jogo = await this.modelM.findByPk(id);
    if (!jogo) throw new IdNotFoundError(ID_NOT_FOUND);
    await this.modelM.update({
      homeTeamGoals: dto.homeTeamGoals,
      awayTeamGoals: dto.awayTeamGoals,
    }, {
      where: { id },
    });
  }

  async novaPartida(dto: ICreateMatch): Promise<Match> {
    if (dto.homeTeamId == dto.awayTeamId) throw new IdIqualsTeamError(IQUAL_HOME_AND_AWAY_TEAM);
    const home = await this.modelT.findByPk(dto.homeTeamId);
    const away = await this.modelT.findByPk(dto.awayTeamId);
    if (!home || !away) throw new IdNotFoundError(ID_TEAM_NOT_EXIST);
    const match = await this.modelM.create({ ...dto, inProgress: true });
    return match;
  }
}
