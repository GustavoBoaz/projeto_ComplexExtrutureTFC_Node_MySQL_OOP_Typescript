module.exports = (leaderboard) => leaderboard.map(
  (team) => Object.fromEntries(
    Object.entries(team).map(
      (datas) => datas.map(
        (data) => data.toString(),
      ),
    ),
  ),
);
