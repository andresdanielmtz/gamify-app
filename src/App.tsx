import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container, CircularProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import MenuAppBar from './components/Navbar/Navbar';
import GameCard from './components/GameCard/Card';
import Profile from './components/pages/Profile';
import { getGames } from './api/getGames';

interface Game {
  id: string;
  name: string;
  summary: string;
  cover: {
    url: string;
  };
  first_release_date: number;
}

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_ENDPOINT;

  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGames().then((data) => {
      setGamesData(data);
      setLoading(false);
    });
  }, []);

  const IndexPage = () => (
    <Grid container spacing={2}>
      {gamesData.map((game) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
          <GameCard
            date={game.first_release_date}
            id={game.id}
            title={game.name}
            desc={game.summary}
            image={game.cover.url}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div id="main-page">
      <div id="nav">
        <MenuAppBar />
      </div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={loading ? <CircularProgress /> : <IndexPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;