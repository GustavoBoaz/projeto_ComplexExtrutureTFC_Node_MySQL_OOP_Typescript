import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateNewGame from '../components/CreateNewGame';
import EditGame from '../components/EditGame';
import Header from '../components/Header';
import MatchsBtn from '../components/MatchsBtn';
import Loading from '../components/Loading';
import '../styles/pages/matchSettings.css';

const MatchSettings = () => {
  const [clubs, setClubs] = useState([]);
  const [homeTeamScoreboard, setHomeTeamScoreboard] = useState('0');
  const [awayTeamScoreboard, setAwayTeamScoreboard] = useState('0');
  const [homeClub, setHomeClub] = useState('');
  const [awayClub, setAwayClub] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Faça a verificação se a pessoa usuaria está logada e é um administrador.
  }, [navigate]);

  useEffect(() => {
    // Faça uma requisição para o endpoint `/clubs`
  });

  const getClub = (club, homeOrAway) => {
    const { id } = clubs.find(({ clubName }) => clubName === club);
    if (homeOrAway === 'homeClub') { setHomeClub(id); } else { setAwayClub(id); }
  };

  const createMatch = async (inProgress) => {
    // Utilize as informações necessarias para inserir uma partida no endpoint `/matchs`
    return true
  };

  const updateMatch = async (idMatch, { homeTeamGoals, awayTeamGoals }) => {
    // Utilize as informações necessarias para atualizar uma partida no endpoint `/matchs/:id`
   return true
  };
  const finishMatch = async (inProgress) => {
    // Utilize as informações necessarias para finalizar uma partida no endpoint `/matchs/:id`
    // Essa função deve ser usada para finalizar uma partida que acabou ser criada ou que já esteja no banco de dados
    return true
  };

  if (!isAuthenticated) return <Loading />;

  if (location.state) {
    const { id,
      homeClub: homeClubState,
      homeTeamGoals,
      awayClub: awayClubState,
      awayTeamGoals,
    } = location.state;
    return (
      <>
        <Header
          page=""
          FirstNavigationLink={ MatchsBtn }
          logged={ isAuthenticated }
          setLogin={ setIsAuthenticated }
        />
        <EditGame
          homeTeam={ [homeClubState] }
          awayTeam={ [awayClubState] }
          homeTeamGoals={ homeTeamGoals }
          awayTeamGoals={ awayTeamGoals }
          idMatch={ id }
          updateMatch={ updateMatch }
          finishMatch={ finishMatch }
          getClub={ getClub }
        />
      </>
    );
  }

  return (
    <>
      <Header
        page=""
        FirstNavigationLink={ MatchsBtn }
        logged={ isAuthenticated }
        setLogin={ setIsAuthenticated }
      />
      <CreateNewGame
        setHomeTeamScoreboard={ setHomeTeamScoreboard }
        setAwayTeamScoreboard={ setAwayTeamScoreboard }
        clubs={ clubs }
        getClub={ getClub }
        createMatch={ createMatch }
        finishMatch={ finishMatch }
      />
    </>
  );
};

export default MatchSettings;
