import React, { useState, useEffect } from "react";
import { CircularProgress, MenuItem, Pagination, TextField, Box } from "@mui/material";
import { getGamesFiltered } from "../../api/getGames";
import { useNavigate } from "react-router-dom";
import GameCard from "../GameCard/Card";
import useStore from "../../createStore";
import { Game } from "../../types";

const Main = () => {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const searchTerm = useStore((state) => state.searchTerm);
  const category = useStore((state) => state.category);
  const platform = useStore((state) => state.platform);
  const sortBy = useStore((state) => state.sortBy);
  const page = useStore((state) => state.page);
  const setCategory = useStore((state) => state.setCategory);
  const setPlatform = useStore((state) => state.setPlatform);
  const setSortBy = useStore((state) => state.setSortBy);
  const setPage = useStore((state) => state.setPage);

  const limit = 30;

  const fetchGames = (currentPage: number = 1) => {
    setIsLoading(true);

    getGamesFiltered({ category, platforms: platform, sort_by: sortBy, page: currentPage })
      .then((data) => {
        if (data) {
          setGamesData(data);
          const totalPages = Math.ceil(data.length / limit);
          console.log("Total pages", totalPages);

          setTotalPages(totalPages);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch games", error);
        navigate("/login");
      });
  };

  const filteredGamesData = gamesData.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchGames(page);
  }, [page, category, platform, sortBy]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredGamesData.length / 10));
  }, [filteredGamesData]);

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
            <MenuItem value={1}>Main Game</MenuItem>
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
            <MenuItem value={-1}>All Platforms</MenuItem>
            <MenuItem value={48}>PlayStation 4</MenuItem>
            <MenuItem value={167}>PlayStation 5</MenuItem>
            <MenuItem value={49}>Xbox One</MenuItem>
            <MenuItem value={169}>Xbox Series S/X</MenuItem>
            <MenuItem value={130}>Nintendo Switch</MenuItem>
            <MenuItem value={6}>PC</MenuItem>
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
            <MenuItem value="first_release_date desc">Release Date (Descending)</MenuItem>
            <MenuItem value="first_release_date asc">Release Date (Ascending)</MenuItem>
            <MenuItem value="rating desc">Rating</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        mb: 4,
      }}>
        {filteredGamesData.map((game) => (
          <Box key={game.id} sx={{ display: 'flex', justifyContent: 'center', width: { xs: '100%', sm: '48%', md: '23%' } }}>
            <GameCard
              date={game.first_release_date}
              id={game.id}
              title={game.name}
              desc={game.summary}
              image={game.cover?.url || ''}
            />
          </Box>
        ))}
      </Box>

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