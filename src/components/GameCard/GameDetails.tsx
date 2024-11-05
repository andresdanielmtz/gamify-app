import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, IconButton, Paper, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useStore from '../../createStore';
import axios, { AxiosError } from 'axios';
import { GameAPIResponse, NormalizedGameDetails } from '../../types';

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gameDetails, setGameDetails] = useState<GameAPIResponse | null>(null);

  const gamesPlayed = useStore((state) => state.gamesPlayed);
  const addGame = useStore((state) => state.addGame);
  const removeGame = useStore((state) => state.removeGame);

  const isLiked = gamesPlayed.some((game) => game.id === id);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const playedGame = gamesPlayed.find(game => game.id === id);
        if (playedGame) {
          setGameDetails(playedGame);
        } else {
          const response = await axios.get<GameAPIResponse>(`api/games/${id}`);
          setGameDetails(response.data);
        }
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id, gamesPlayed]);

  const handleLikeClick = () => {
    if (!gameDetails || !id) return;

    if (isLiked) {
      removeGame(id);
    } else {
      const normalizedGame: NormalizedGameDetails = {
        id,
        name: gameDetails.name || gameDetails.title || '',
        summary: gameDetails.summary || gameDetails.desc || '',
        cover: {
          url: gameDetails.cover?.url || gameDetails.image || ''
        },
        first_release_date: gameDetails.first_release_date || gameDetails.date || 0,
        date: gameDetails.date || gameDetails.first_release_date || 0,
      };
      addGame(normalizedGame);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !gameDetails) {
    return (
      <Container>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" color="error">
              {error || "Game not found"}
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Normalize the data structure since it might come from different sources
  const {
    name = gameDetails.title || '',
    summary = gameDetails.desc || '',
    cover = { url: gameDetails.image || '' },
    first_release_date = gameDetails.date || 0,
  } = gameDetails;

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            {name}
          </Typography>
          <IconButton
            onClick={handleLikeClick}
            sx={{
              ml: 'auto',
              color: isLiked ? '#5fdca8' : 'inherit',
              transition: 'color 0.3s ease-in-out'
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>

        <Box
          component="img"
          src={cover?.url}
          alt={name}
          sx={{
            width: '100%',
            maxHeight: '500px',
            objectFit: 'cover',
            borderRadius: 2,
            mb: 3,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />

        <Typography variant="h6" gutterBottom color="primary">
          Released: {first_release_date ? new Date(first_release_date * 1000).getFullYear() : 'Unknown'}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {summary || "No description available."}
        </Typography>
      </Paper>
    </Container>
  );
};

export default GameDetails;

