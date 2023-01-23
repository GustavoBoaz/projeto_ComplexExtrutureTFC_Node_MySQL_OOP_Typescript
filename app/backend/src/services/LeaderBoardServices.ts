import Model from '../database/models';
import leaderBoardHomeQuery from './queries/leaderBoardHome';
import leaderBoardAwayQuery from './queries/leaderBoardAway';

export interface ILeaderBoard {
  name: number
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: string
}

export default class LeaderBoardServices {
  constructor(
    private model = Model,
  ) {}

  static calculateEfficiency = (homeTeamId: ILeaderBoard, team: ILeaderBoard) => {
    const totalPoints = homeTeamId.totalPoints + team.totalPoints;
    const totalGames = homeTeamId.totalGames + team.totalGames;
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  };

  static createLeaderBoard = (homeTeamId: ILeaderBoard, team: ILeaderBoard) => ({
    ...homeTeamId,
    totalPoints: homeTeamId.totalPoints + team.totalPoints,
    totalGames: homeTeamId.totalGames + team.totalGames,
    totalVictories: homeTeamId.totalVictories + team.totalVictories,
    totalDraws: homeTeamId.totalDraws + team.totalDraws,
    totalLosses: homeTeamId.totalLosses + team.totalLosses,
    goalsFavor: homeTeamId.goalsFavor + team.goalsFavor,
    goalsOwn: homeTeamId.goalsOwn + team.goalsOwn,
    goalsBalance: homeTeamId.goalsBalance + team.goalsBalance,
    efficiency: LeaderBoardServices.calculateEfficiency(homeTeamId, team),
  });

  static sortLeaderBoard(board: ILeaderBoard[]) {
    return board.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
  }

  async get(url: string): Promise<ILeaderBoard[]> {
    if (url === '/home') {
      const [leaderBoardHome] = await this.model.query(leaderBoardHomeQuery);
      return leaderBoardHome as ILeaderBoard[];
    }
    const [leaderBoardAway] = await this.model.query(leaderBoardAwayQuery);
    return leaderBoardAway as ILeaderBoard[];
  }

  async getLeaderBoard(): Promise<ILeaderBoard[]> {
    const [leaderBoardHome] = await this.model.query(leaderBoardHomeQuery) as ILeaderBoard[][];
    const [leaderBoardAway] = await this.model.query(leaderBoardAwayQuery) as ILeaderBoard[][];
    const leaderBoard = leaderBoardHome.map((homeTeamId) => {
      const [team] = leaderBoardAway.filter((awayTeamId) => awayTeamId.name === homeTeamId.name);
      return LeaderBoardServices.createLeaderBoard(homeTeamId, team);
    });
    return LeaderBoardServices.sortLeaderBoard(leaderBoard);
  }
}
