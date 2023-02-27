/* eslint class-methods-use-this: ["error", { "exceptMethods": ["initService"] }] */

import { Request, Response, Router } from 'express';
import IServiceAuth from '../interfaces/IServiceAuth';
import AuthService from '../services/AuthService';
import AController from './AController';

export default class AuthController extends AController<IServiceAuth> {
  private async login(req: Request, res: Response): Promise<Response> {
    const result = await this.service.login(req.body);
    return res.status(200).json({ token: result });
  }

  private async valida(req: Request, res: Response): Promise<Response> {
    const { role } = await AuthService.verificarToken(req.headers.authorization);
    return res.status(200).json({ role });
  }

  initService(): IServiceAuth {
    return new AuthService();
  }

  initRoutes(): Router {
    this.router.post('/', (req, res) => this.login(req, res));
    this.router.get('/role', (req, res) => this.valida(req, res));
    return this.router;
  }
}
