import { Router } from 'express';

/**
 * Classe abstrata responsavel por regras de controllador
 * @argument S representa uma interface de serviços
 */
export default abstract class AController<S> {
  protected router: Router;
  protected service: S;

  constructor() {
    this.router = Router();
    this.service = this.initService();
  }

  /**
   * Inicialize o serviço do controllador
   * @example
   *    initService(): S {
   *      return new TodoService();
   *    }
   * @returns S: Retorna os serviços de Todo
   */
  abstract initService(): S;

  /**
   * Inicialize as rotas necessarias para sua aplicação
   * @example
   *    initRoutes(): Router {
   *      this.router.post('/todo', (req, res) => this.create(req, res));
   *      this.router.get('/todo', (req, res) => this.read(req, res));
   *      this.router.put('/todo', (req, res) => this.update(req, res));
   *      this.router.delete('/todo', (req, res) => this.create(req, res));
   *      return this.router;
   *    }
   * @returns Router: Retorna um objeto router para a aplicação
   */
  abstract initRoutes(): Router;
}
