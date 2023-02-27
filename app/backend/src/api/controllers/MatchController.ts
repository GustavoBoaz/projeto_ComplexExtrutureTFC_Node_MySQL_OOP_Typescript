/* eslint class-methods-use-this: ["error", { "exceptMethods": ["initService"] }] */

import { Request, Response, Router } from 'express';
import Match from '../../database/models/Match';
import IServiceMatch from '../interfaces/IServiceMatch';
import MarchService from '../services/MatchService';
import AController from './AController';

export default class MatchController extends AController<IServiceMatch<Match>> {
  private async all(req: Request, res: Response): Promise<Response> {
    const result = await this.service.readAll(req.query.inProgress as string);
    console.table(result);
    return res.status(200).json(result);
  }

  private async finalize(req: Request, res: Response): Promise<Response> {
    await MarchService.verificarToken(req.headers.authorization);
    await this.service.finalizaPartida(parseInt(req.params.id, 10));
    return res.status(200).json({ message: 'Finished' });
  }

  private async update(req: Request, res: Response): Promise<Response> {
    await MarchService.verificarToken(req.headers.authorization);
    await this.service.atualizaPartida(parseInt(req.params.id, 10), req.body);
    return res.status(200).json({ message: 'Updated' });
  }

  private async create(req: Request, res: Response): Promise<Response> {
    await MarchService.verificarToken(req.headers.authorization);
    const result = await this.service.novaPartida(req.body);
    return res.status(201).json(result);
  }

  initService(): IServiceMatch<Match> {
    return new MarchService();
  }

  initRoutes(): Router {
    this.router.get('/', (req, res) => this.all(req, res));
    this.router.patch('/:id/finish', (req, res) => this.finalize(req, res));
    this.router.patch('/:id', (req, res) => this.update(req, res));
    this.router.post('/', (req, res) => this.create(req, res));
    return this.router;
  }
}
