import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container } from '@mui/material';
import MenuAppBar from './components/Navbar/Navbar';
import GameCard from './components/GameCard/CardMUI';
import { getGames } from './api/getGames';

function App() {
  const [gamesData, setGamesData] = useState([]);
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_ENDPOINT;

  useEffect(() => {
    getGames().then((data) => {
      setGamesData(data);
    });
  }, []);

  return (
    <div id="main-page">
      <div id="nav">
        <MenuAppBar />
      </div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={1}>
          {gamesData.map((game: { id: string | null | undefined; name: string; summary: string; cover: { url: string; }; }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={game.id ?? undefined}>
              <GameCard
                title={game.name}
                desc={game.summary}
                image={game.cover.url}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default App