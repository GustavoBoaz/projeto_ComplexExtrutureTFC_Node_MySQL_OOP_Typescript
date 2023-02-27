/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validaBody", "validaFormato", "validaCredenciais", "validaToken"] }] */

import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../../database/models/User';
import AContractJWT from '../contracts/AContractJWT';
import IAuth from '../interfaces/IAuth';
import IServiceAuth from '../interfaces/IServiceAuth';
import InvalidBodyError from '../errors/InvalidBodyError';
import UnauthorizedError from '../errors/UnauthorizedError';

const INVALID_BODY = 'All fields must be filled';
const INVALID_FORMAT = 'Invalid email or password';

export default class AuthService extends AContractJWT implements IServiceAuth {
  protected model: ModelStatic<User> = User;

  validaBody(dto: IAuth): void {
    if (!dto.email || !dto.password) {
      throw new InvalidBodyError(INVALID_BODY);
    }
  }

  validaFormato(dto: IAuth): void {
    if (
      dto.email.startsWith('@')
      || !dto.email.includes('.com')
      || dto.email.includes('@.')
      || !dto.email.includes('@')
    ) {
      throw new UnauthorizedError(INVALID_FORMAT);
    }

    if (
      dto.password.length < 6
      || dto.password.includes(' ')
    ) {
      throw new UnauthorizedError(INVALID_FORMAT);
    }
  }

  validaCredenciais(password: string, user: User | null): void {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedError(INVALID_FORMAT);
    }
  }

  async login(dto: IAuth): Promise<string> {
    this.validaBody(dto);
    this.validaFormato(dto);
    const user = await this.model.findOne({ where: { email: dto.email } });
    this.validaCredenciais(dto.password, user);
    const { id, username, role, email } = user as User;
    return AuthService.gerarToken({ id, username, role, email });
  }
}
