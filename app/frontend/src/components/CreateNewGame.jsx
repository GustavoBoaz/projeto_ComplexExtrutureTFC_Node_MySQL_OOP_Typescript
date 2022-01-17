import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ClubOption from './ClubOption';
import Scoreboard from './Scoreboard';

const CreateNewGame = ({
  clubs,
  setClubs,
  getClub,
  homeTeamScoreboard,
  setHomeTeamScoreboard,
  awayTeamScoreboard,
  setAwayTeamScoreboard,
  createMatch,
  finishMatch,
}) => {
  const notCreated = 'not-created';
  const [inProgress, setInProgress] = useState(notCreated);

  return (
    <section className="match-settings-section">
      <form className="match-settings-form">
        <div className="match-settings-form-options">
          <ClubOption
            testId="insertion_matchs__select_home_team"
            teams={ clubs }
            setTeams={ setClubs }
            homeTeam
            getClub={ getClub }
          />
          <Scoreboard
            testId="insertion_matchs__select_quantity_goals_home_team"
            homeTeam
            score={ homeTeamScoreboard }
            setScore={ setHomeTeamScoreboard }
          />
          <div className="match-settings-form-versus">
            <span />
            <span>X</span>
          </div>
          <Scoreboard
            testId="insertion_matchs__select_quantity_goals_away_team"
            homeTeam={ false }
            score={ awayTeamScoreboard }
            setScore={ setAwayTeamScoreboard }
          />
          <ClubOption
            testId="insertion_matchs__select_away_team"
            teams={ clubs }
            setTeams={ setClubs }
            homeTeam={ false }
            getClub={ getClub }
          />
        </div>
        <div className="match-settings-form-buttons">
          <button
            data-testid="insertion_matchs__save_match_btn"
            onClick={ () => {
              createMatch(true);
              setInProgress('In-Progress');
            } }
            type="button"
            disabled={ (inProgress !== notCreated) }
          >
            Salvar

          </button>
          <button
            data-testid="insertion_matchs__finish_match_btn"
            onClick={ () => { finishMatch(false); } }
            type="button"
            disabled={ (inProgress === notCreated) }
          >
            Finalizar

          </button>
        </div>
      </form>
    </section>
  );
};

CreateNewGame.propTypes = ({
  clubs: PropTypes.arrayOf(PropTypes.object),
  setClubs: PropTypes.func,
  getClub: PropTypes.func,
  homeTeamScoreboard: PropTypes.string,
  setHomeTeamScoreboard: PropTypes.func,
  awayTeamScoreboard: PropTypes.string,
  setAwayTeamScoreboard: PropTypes.func,
}).isRequired;

export default CreateNewGame;
