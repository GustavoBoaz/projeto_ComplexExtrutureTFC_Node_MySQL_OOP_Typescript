import User from '../../database/models/User';
import IAuth from './IAuth';

export default interface IServiceAuth {
  /**
   * Valide a existencia de um body com email e senha
   * @param dto - dados de entrada do body
   * @throws InvalidBodyError com mensage 'All fields must be filled' e status 400
   * @see InvalidBodyError
   */
  validaBody(dto: IAuth): void;

  /**
   * Utilize para validar formatação dos dados de entrada
   * @param dto - dados de entrada do body
   * @throws UnauthorizedError com mensagen 'Invalid email or password' e status 401
   */
  validaFormato(dto: IAuth): void;

  /**
   * Valide a existencia do user e se a senha passada no body, é a mesma que se encontra no banco
   * @param password - senha recebida pela dto
   * @param user - retorno da pesquisa do banco
   * @throws UnauthorizedError com mensagen 'Invalid email or password' e status 401
   */
  validaCredenciais(password: string, user: User | null): void;

  /**
   * Receba uma DTO valide e depois gere Token string
   * @param dto
   * @returns string token
   */
  login(dto: IAuth): Promise<string>;
}
