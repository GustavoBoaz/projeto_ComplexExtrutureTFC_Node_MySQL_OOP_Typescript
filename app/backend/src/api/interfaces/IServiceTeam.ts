/**
 * Interface responsavel por regras de serviços Team
 * @argument D modelo de saída
 */
export default interface IServiceTeam<D> {
  readAll(): Promise<D[]>;
  readOne(id: number): Promise<D>;
}
