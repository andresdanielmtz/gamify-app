import GameCard from "../GameCard/Card";
import { CircularProgress, Button, MenuItem, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { getGamesFiltered } from "../../api/getGames";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
  const [platform, setPlatform] = useState<number>(130);
  const [sortBy, setSortBy] = useState<string>("rating desc");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  const fetchGames = (currentPage: number = 1) => {
    setIsLoading(true);
    getGamesFiltered({ search, category, platforms: platform, sort_by: sortBy, page: currentPage })
      .then((data) => {
        if (data) {
          setTotalPages(Math.ceil(data.length / 10));
          setGamesData(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch games", error);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchGames(page);
  }, [page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', px: { xs: 2, sm: 4 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        gap: 2, 
        mb: 4,
        justifyContent: 'center',
        alignItems: { xs: 'stretch', sm: 'flex-start' }
      }}>
        <Box sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <TextField
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            select
            fullWidth
            defaultValue={0}
            label="Category"
            color="primary"
          >
            <MenuItem value={-1}>All Categories</MenuItem>
            <MenuItem value={0}>Main Game</MenuItem>
            <MenuItem value={2}>Expansion</MenuItem>
            <MenuItem value={3}>Bundle</MenuItem>
            <MenuItem value={4}>Standalone Expansion</MenuItem>
            <MenuItem value={5}>Mod</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <TextField
            value={platform}
            onChange={(e) => setPlatform(Number(e.target.value))}
            select
            fullWidth
            defaultValue={0}
            label="Platform"
            color="primary"
          >
            <MenuItem value={-1}>All Categories</MenuItem>
            <MenuItem value={48}>PlayStation</MenuItem>
            <MenuItem value={49}>Xbox</MenuItem>
            <MenuItem value={130}>Nintendo Switch</MenuItem>
            <MenuItem value={6}>PC</MenuItem>
            <MenuItem value={0}>All Platforms</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <TextField
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            select
            fullWidth
            defaultValue=""
            label="Sort By"
            color="primary"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="release_date">Release Date</MenuItem>
            <MenuItem value="rating desc">Rating</MenuItem>
          </TextField>
        </Box>
        <Button 
          variant="contained" 
          onClick={() => fetchGames(page)} 
          color="primary"
          sx={{ height: { sm: '56px' } }}
        >
          Search
        </Button>
      </Box>

      <Grid 
        container 
        spacing={2} 
        sx={{ justifyContent: 'center', mb: 4 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      >
        {gamesData.map((game) => (
          <Grid key={game.id} columns={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <GameCard
                date={game.first_release_date}
                id={game.id}
                title={game.name}
                desc={game.summary}
                image={game.cover?.url}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Main;