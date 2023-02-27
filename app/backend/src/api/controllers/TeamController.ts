/* eslint class-methods-use-this: ["error", { "exceptMethods": ["initService"] }] */

import { Request, Response, Router } from 'express';
import Team from '../../database/models/Team';
import IServiceTeam from '../interfaces/IServiceTeam';
import TeamService from '../services/TeamService';
import AController from './AController';

export default class TeamController extends AController<IServiceTeam<Team>> {
  private async all(req: Request, res: Response): Promise<Response> {
    const result = await this.service.readAll();
    return res.status(200).json(result);
  }

  private async one(req: Request, res: Response): Promise<Response> {
    const result = await this.service.readOne(parseInt(req.params.id, 10));
    return res.status(200).json(result);
  }

  initService(): IServiceTeam<Team> {
    return new TeamService();
  }

  initRoutes(): Router {
    this.router.get('/', (req, res) => this.all(req, res));
    this.router.get('/:id', (req, res) => this.one(req, res));
    return this.router;
  }
}
