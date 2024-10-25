import GameCard from "../GameCard/Card";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { getGames } from "../../api/getGames";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";

interface Game {
  id: string;
  name: string;
  summary: string;
  first_release_date: number;
  cover: { url: string };
}

const Main = () => {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getGames()
      .then((data) => {
        setGamesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch games", error);
        navigate("/login");
      });
  }, [navigate]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {gamesData.map((game) => (
        <Grid key={game.id}>
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
};

export default Main;
