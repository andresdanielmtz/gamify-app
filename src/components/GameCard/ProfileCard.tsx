// src/components/GameCard/ProfileCard.tsx
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import RatingGame from '../Rating/Rating';
import useStore from '../../createStore';
import { unixToYear } from '../../utils/unixToDate';
import { toast } from 'react-toastify';
import { ProfileGameCardProps } from '../../types';

export default function GameCardProfile({ id, title, image, rating, date }: ProfileGameCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const setRating = useStore((state) => state.setRating);
  const decreasePendingRatings = useStore((state) => state.decreasePendingRatings);
  const removeGame = useStore((state) => state.removeGame);

  const handleRatingChange = (_event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null) {
      setRating(id, newValue);
      decreasePendingRatings();
      toast.success(`Rating for ${title} set to ${newValue}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    removeGame(id);
    toast.info(`Removed ${title} from games played`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    handleMenuClose();
  };

  const gameYear = unixToYear(date);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {gameYear}
          </Typography>
          <RatingGame
            value={rating || 0}
            id={id}
            onChange={handleRatingChange}
          />

          <IconButton
            aria-label="settings"
            onClick={handleMenuOpen}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleDelete}>
              <DeleteIcon sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Popover>

        </CardContent>
      </CardActionArea>

    </Card>
  );
}