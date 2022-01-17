import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { check, editIcon } from '../images';

const GamesTable = ({ currentFilter, isAdm }) => {
  const [games, setGames] = useState([]);
  const [gamesFiltered, setGamesFiltered] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    switch (currentFilter) {
    case 'Em andamento':
      setGamesFiltered(games.filter(({ inProgress }) => inProgress));
      break;
    case 'Finalizado':
      setGamesFiltered(games.filter(({ inProgress }) => !inProgress));
      break;
    default:
      setGamesFiltered(games);
      break;
    }
  }, [currentFilter, games]);

  useEffect(() => {
    //Faça a requisição para o endpoint `/matchs`
  }, [games]);

  if (!games.length) {
    return (<Loading />);
  }

  return (
    <table className="games-table">
      <thead>
        <tr>
          <th className="games-table-thead-home-team">Time Mandante</th>
          <th className="games-table-thead-goals">Gols</th>
          <th className="games-table-thead-versus">{ ' ' }</th>
          <th className="games-table-thead-goals">Gols</th>
          <th className="games-table-thead-away-team">Time Visitante</th>
          <th className="games-table-thead-empty-space">{ ' ' }</th>
          <th className="games-table-thead-status">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          gamesFiltered
            .sort((a, b) => b.inProgress - a.inProgress)
            .map(({
              id,
              homeClub,
              homeTeamGoals,
              awayClub,
              awayTeamGoals,
              inProgress,
            }) => (
              <tr key={ id }>
                <td
                  className="games-table-tbody-home-team"
                  data-testid={ `matchs__home_team_${id}` }
                >
                  { homeClub.clubName }
                </td>
                <td
                  className="games-table-tbody-home-team-goals"
                  data-testid={ `matchs__home_team_goals_${id}` }
                >
                  { homeTeamGoals }
                </td>
                <td className="games-table-tbody-versus">X</td>
                <td
                  className="games-table-tbody-away-team-goals"
                  data-testid={ `matchs__away_team_goals_${id}` }
                >
                  { awayTeamGoals }
                </td>
                <td
                  className="games-table-tbody-away-team"
                  data-testid={ `matchs__away_team_${id}` }
                >
                  { awayClub.clubName }
                </td>
                <td className="games-table-tbody-empty-space">{ ' ' }</td>
                <td className="games-table-tbody-status">
                  <div>
                    {
                      (inProgress)
                        ? (
                          <p
                            className="game-status in-progress"
                            data-testid={ `matchs__match_status_${id}` }
                          >
                            Em andamento
                          </p>
                        )
                        : (
                          <p
                            className="game-status finished-game"
                            data-testid={ `matchs__match_status_${id}` }
                          >
                            Finalizado
                          </p>
                        )
                    }
                  </div>
                  {
                    (isAdm)
                      ? (
                        <button
                          type="button"
                          data-testid={ `matchs__match_status_btn_${id}` }
                          disabled={ !inProgress }
                          onClick={ () => {
                            navigate(
                              '/matchs/settings',
                              { state: {
                                id,
                                homeClub,
                                homeTeamGoals,
                                awayClub,
                                awayTeamGoals,
                                inProgress,
                              } },
                            );
                          } }
                        >
                          {
                            (inProgress)
                              ? <img src={ editIcon } alt="Jogo em andamento" />
                              : <img src={ check } alt="Jogo finalizado" />
                          }
                        </button>
                      )
                      : null
                  }
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};

GamesTable.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  isAdm: PropTypes.bool.isRequired,
};

export default GamesTable;
