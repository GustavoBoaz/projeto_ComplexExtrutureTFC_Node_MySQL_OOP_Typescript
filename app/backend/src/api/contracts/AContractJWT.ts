import { JsonWebTokenError, JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import TokenNotFoundError from '../errors/TokenNotFoundError';

const TOKEN_NOTFOUND = 'Token not found';

/**
 * Classe abstrata responsavel por contrato JWT de segurança
 * do requisito 8
 * @param secret
 * @param jwtConfig
 * @link https://www.npmjs.com/package/jsonwebtoken
 */
export default abstract class AContractJWT {
  private static secret: Secret;
  private static jwtConfig: SignOptions;

  constructor() {
    AContractJWT.secret = process.env.JWT_SECRET || 'jwt_secret';
    AContractJWT.jwtConfig = {
      expiresIn: '2d',
      algorithm: 'HS256',
    };
  }

  /**
   * Método responsavel por gerar token
   * @param payload - Dados do payload
   * @returns Token no formato String
   */
  static gerarToken(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  /**
   * Método responsavel por validar token
   * @param token
   * @returns JwtPayload de dados caso valido
   * @throws JsonWebTokenError caso token não seja valido
   * @throws TokenNotFoundError caso não seja passado token
   */
  static async verificarToken(token: string | undefined): Promise<JwtPayload> {
    if (!token) throw new TokenNotFoundError(TOKEN_NOTFOUND);
    try {
      const payload = verify(token, this.secret, this.jwtConfig);
      return payload as JwtPayload;
    } catch (error) {
      throw new JsonWebTokenError('Token must be a valid token');
    }
  }
}
