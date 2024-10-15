import './App.css'
import { Button } from "@mui/material";
import { getGames } from './api/getGames';
import { useEffect, useState } from 'react';
import MenuAppBar from './components/Navbar/Navbar';
import GameCard from './components/GameCard/Card';
import axios from 'axios';

function App() {
  const [gamesData, setGamesData] = useState([]);
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_ENDPOINT;

  useEffect(() => {
    getGames().then((data) => {
      setGamesData(data);
    });
  }, []);

  return (
    <>
      <MenuAppBar />
      {gamesData.map((game: { id: string | null | undefined; name: string; summary: string; cover: { url: string; }; }) => (
        <GameCard
          key={game.id ?? undefined}
          title={game.name}
          description={game.summary}
          image={game.cover.url}
        />
      ))}

      <Button variant="contained" color="primary"> :D </Button>
    </>
  )
}

export default App
