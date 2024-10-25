import GameCard from "../GameCard/Card";
import { CircularProgress, Button, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { getGamesFiltered } from "../../api/getGames";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";

interface Game {
  id: string;
  name: string;
  summary: string;
  first_release_date: number;
  cover?: { url: string };
}

const Main = () => {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const [platform, setPlatform] = useState<number>(48);
  const [sortBy, setSortBy] = useState<string>("rating desc");
  const navigate = useNavigate();

  const fetchGames = () => {
    setIsLoading(true);
    const platforms = platform === 0 ? undefined : platform;
    getGamesFiltered({ search, category, platforms, sort_by: sortBy })
      .then((data) => {
        setGamesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch games", error);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1, marginBottom: 2 }}>
        <Select
          value={category}
          onChange={(e) => setCategory(Number(e.target.value))}
          displayEmpty
          sx={{ marginRight: 2 }}
          color="secondary"
        >
          <MenuItem value={0}>All Categories</MenuItem>
          <MenuItem value={1}>Main Category</MenuItem>
          <MenuItem value={2}>Expansion</MenuItem>
          <MenuItem value={3}>Bundle</MenuItem>
          <MenuItem value={4}>Standalone Expansion</MenuItem>
          <MenuItem value={5}>Mod</MenuItem>
        </Select>
        <Select
          value={platform}
          onChange={(e) => setPlatform(Number(e.target.value))}
          displayEmpty
          sx={{ marginRight: 2, color: "white"}}
          color="secondary"
        >
          <MenuItem value={48}>PlayStation</MenuItem>
          <MenuItem value={49}>Xbox</MenuItem>
          <MenuItem value={130}>Nintendo Switch</MenuItem>
          <MenuItem value={6}>PC</MenuItem>
            <MenuItem value={0}>All Platforms</MenuItem>
        </Select>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
          sx={{ marginRight: 2 }}
          color="secondary"
        >
          <MenuItem value="rating desc">Rating (High to Low)</MenuItem>
          <MenuItem value="first_release_date desc">Newest</MenuItem>
          <MenuItem value="first_release_date asc">Oldest</MenuItem>
        </Select>
        <Button variant="contained" onClick={fetchGames} color="primary">Search</Button>
      </Grid>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {gamesData.map((game) => (
          <Grid key={game.id} item xs={12} sm={6} md={4}>
            <GameCard
              date={game.first_release_date}
              id={game.id}
              title={game.name}
              desc={game.summary}
              image={game.cover?.url}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Main;
