import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import RatingGame from '../Rating/Rating';
import useStore from '../../createStore';
import { unixToYear } from '../../utils/unixToDate';


interface ProfileGameCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  date: number;
}

export default function GameCardProfile({ id, title, image, rating, date }: ProfileGameCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const removeGame = useStore((state) => state.removeGame);
  const setRating = useStore((state) => state.setRating);
  const gameYear = unixToYear(date);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    console.log('Attempting to remove game with id:', id);
    removeGame(id);
    handleClose();
  };

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null) {
      event.stopPropagation();
      setRating(id, newValue);
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderRadius: "15px",
      color: "white"
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {title}
          </Typography>
          <Typography variant="body1" sx={{
            color: "white",
            opacity: 0.8,
          }} noWrap>
            ({gameYear})
          </Typography>
        </CardContent>
      </CardActionArea>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        paddingBottom: '0.5rem',
      }}>
        <RatingGame value={rating || 0} id={id} onChange={handleRatingChange} />
        <IconButton
          aria-describedby={popoverId}
          onClick={handleClick}
          sx={{
            color: 'white',
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Modify</MenuItem>
        <MenuItem onClick={handleRemove}>Delete</MenuItem>
      </Popover>
    </Card>
  );
}