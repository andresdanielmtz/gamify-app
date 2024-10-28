import GameCard from "../GameCard/Card";
import { CircularProgress, Button, MenuItem, Pagination, Container } from "@mui/material";
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
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        textAlign: 'center',
        maxWidth: "100%",
        py: 3
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2, 
          marginBottom: 4,
          justifyContent: 'center'
        }}>
          <Box sx={{ minWidth: { xs: '100%', sm: 200 }, mb: { xs: 2, sm: 0 } }}>
            <TextField
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              select
              fullWidth
              label="Category"
              color="primary"
              sx={{ bgcolor: 'background.paper' }}
            >
              <MenuItem value={-1}>All Categories</MenuItem>
              <MenuItem value={0}>Main Game</MenuItem>
              <MenuItem value={2}>Expansion</MenuItem>
              <MenuItem value={3}>Bundle</MenuItem>
              <MenuItem value={4}>Standalone Expansion</MenuItem>
              <MenuItem value={5}>Mod</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ minWidth: { xs: '100%', sm: 200 }, mb: { xs: 2, sm: 0 } }}>
            <TextField
              value={platform}
              onChange={(e) => setPlatform(Number(e.target.value))}
              select
              fullWidth
              label="Platform"
              color="primary"
              sx={{ bgcolor: 'background.paper' }}
            >
              <MenuItem value={-1}>All Platforms</MenuItem>
              <MenuItem value={48}>PlayStation</MenuItem>
              <MenuItem value={49}>Xbox</MenuItem>
              <MenuItem value={130}>Nintendo Switch</MenuItem>
              <MenuItem value={6}>PC</MenuItem>
              <MenuItem value={0}>All Platforms</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ minWidth: { xs: '100%', sm: 200 }, mb: { xs: 2, sm: 0 } }}>
            <TextField
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              select
              fullWidth
              label="Sort By"
              color="primary"
              sx={{ bgcolor: 'background.paper' }}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="release_date">Release Date</MenuItem>
              <MenuItem value="rating desc">Rating</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', alignItems: { sm: 'flex-start' }, width: { xs: '100%', sm: 'auto' } }}>
            <Button 
              variant="contained" 
              onClick={() => fetchGames(page)} 
              color="primary"
              fullWidth
              sx={{ 
                height: { sm: '56px' },
                whiteSpace: 'nowrap'
              }}
            >
              Search Games
            </Button>
          </Box>
        </Box>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: { xs: 3, sm: 2 },
          width: '100%'
        }}>
          {gamesData.map((game) => (
            <GameCard
              key={game.id}
              date={game.first_release_date}
              id={game.id}
              title={game.name}
              desc={game.summary}
              image={game.cover?.url}
            />
          ))}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4,
          width: '100%'
        }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPagination-ul': {
                justifyContent: 'center'
              }
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Main;