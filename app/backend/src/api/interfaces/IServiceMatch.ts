import ICreateMatch from './ICreateMatch';
import IUpdateMatch from './IUpdateMatch';

/**
 * Interface responsavel por regras de serviços Team
 * @argument D modelo de saída
 */
export default interface IServiceMatch<D> {
  /**
   * Implemente o método para que ele retorne uma lista
   * customizada como exemplo abaixo, lembre que homeTeam
   * e awayTeam são alias que representam chaves estrangeiras
   * utilize os nomes para não dar erros. Vale resaltar que o
   * id de Team tanto home quanto away não deve existir, puchar
   * apenas o teamName
   * @param inProgress - string true ou false
   * @example
      [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        },
        ...
        {
          "id": 41,
          "homeTeamId": 16,
          "homeTeamGoals": 2,
          "awayTeamId": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Internacional"
          }
        }
      ]
   *  @returns Lista
   */
  readAll(inProgress?: string): Promise<D[]>;

  /**
   * Implemente esse método para finalizar uma
   * partida em andamento, para isso basta alterar o valor
   * da coluna de inProgress para false.
   * @param id - id da partida
   */
  finalizaPartida(id: number): Promise<void>;

  /**
   * Implemente esse método para atualizar uma
   * partida em andamento
   * @param id - Id da partida em andamento
   * @param dto - deve conter valores do jogo
   */
  atualizaPartida(id:number, dto: IUpdateMatch): Promise<void>;

  /**
   * Implemente esse método para criar uma nova
   * partida, seu retorno deve ser como exeplo abaixo
   * @param dto - deve conter dados de criação
   * @example
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": true,
      }
   *  @returns Nova partida criada
   */
  novaPartida(dto: ICreateMatch): Promise<D>;
}
