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

interface ProfileGameCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
}

export default function GameCardProfile({ id, title, description, image, rating }: ProfileGameCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const removeGame = useStore((state) => state.removeGame);

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

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "rgba(30, 30, 30, 1)",
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
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', mb: 2 }}>
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </Typography>
          <RatingGame value={rating || 0} id={id} />
        </CardContent>
      </CardActionArea>
      <IconButton
        aria-describedby={popoverId}
        onClick={handleClick}
        sx={{ color: 'white', alignSelf: 'flex-end', padding: 1 }}
      >
        <MoreVertIcon />
      </IconButton>
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