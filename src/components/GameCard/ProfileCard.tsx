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

interface ProfileGameCardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
}
export default function GameCardProfile({ title, description, image }: ProfileGameCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  return (
    <Card sx={{
      maxWidth: 345, backgroundColor: "#1e1e1e",
      color: "white"
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
          {description.length > 50 ? `${description.substring(0, 100)}...` : description}
          </Typography>
        </CardContent>
        
      </CardActionArea>
      <IconButton
        aria-describedby={popoverId}
        onClick={handleClick}
        sx={{ color: 'white' }}
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
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleClose}>Modify</MenuItem>
        <MenuItem onClick={handleClose}>Eliminate</MenuItem>
      </Popover>
    </Card>
  );
}
