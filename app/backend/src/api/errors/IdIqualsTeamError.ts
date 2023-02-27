export default class IdIqualsTeamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IdIqualsTeamError';
    this.stack = '422';
  }
}
