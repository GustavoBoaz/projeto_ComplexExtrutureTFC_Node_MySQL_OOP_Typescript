import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import IdNotFoundError from '../errors/IdNotFoundError';
import IService from '../interfaces/IServiceTeam';

const TEAM_NOT_FOUND = 'Team not found';

export default class TeamService implements IService<Team> {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async readOne(id: number): Promise<Team> {
    const team = await this.model.findByPk(id);
    if (!team) {
      throw new IdNotFoundError(TEAM_NOT_FOUND);
    }
    return team;
  }
}
