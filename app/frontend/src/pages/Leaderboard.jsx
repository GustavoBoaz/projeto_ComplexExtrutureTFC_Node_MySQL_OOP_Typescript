import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import LeaderboardTable from '../components/LeaderboardTable';
import LoginBtn from '../components/LoginBtn';
import MatchsBtn from '../components/MatchsBtn';

const Leaderboard = () => {
  const [logged, setLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) return setLogin(false);

    if (JSON.parse(user).token) return setLogin(true);
  }, [logged, setLogin]);

  return (
    <>
      <Header
        page=""
        FirstNavigationLink={ MatchsBtn }
        SecondNavegationLink={ LoginBtn }
        logged={ logged }
        setLogin={ setLogin }
      />
      <LeaderboardTable />
    </>
  );
};

export default Leaderboard;
