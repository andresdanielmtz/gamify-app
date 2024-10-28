import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import useStore from '../../createStore';
import { unixToYear } from '../../utils/unixToDate';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';
import { toast } from 'react-toastify';


interface GameCardProps {
    id: string;
    title: string;
    desc?: string;
    image: string;
    date: number;
}

const likeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const GameCard: React.FC<GameCardProps> = ({ id, title, desc, image, date }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const addGame = useStore((state) => state.addGame);
    const gamesPlayed = useStore((state) => state.gamesPlayed);
    const removeGame = useStore((state) => state.removeGame);
    const navigate = useNavigate();

    const isLiked = gamesPlayed.some((game) => game.id === id);
    const gameYear = unixToYear(date);

    const handleLikeClick = () => {
        if (isLiked) {
            removeGame(id);
            toast.info(`Removed ${title} from favorites`, {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            addGame({ id, name: title, summary: desc || "", cover: { url: image || "" }, first_release_date: date, date });
            toast.success(`Added ${title} to favorites`, {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleCardClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setClickCount((prev) => prev + 1);
        if (clickCount === 1) {
            handleLikeClick();
        }
        setTimeout(() => setClickCount(0), 300); // Reset click count after 300ms
    };

    const handleMoreInfoClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigate(`/game/${id}`);
    };

    return (
        <>
            <Card
                sx={{
                    maxWidth: 400,
                    width: 250,
                    height: 400,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                        transform: 'translateY(-3px)',
                    },
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
            >
                {image ? (
                    <CardMedia
                        component="img"
                        height="400"
                        image={image}
                        alt={title}
                        sx={{ userSelect: 'none' }}
                    />
                ) : (
                    <Box
                        sx={{
                            height: 400,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bgcolor: '#f0f0f0',
                            userSelect: 'none',
                        }}
                    >
                        <ImageNotSupportedIcon sx={{ fontSize: 100, color: '#ccc' }} />
                    </Box>
                )}

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        userSelect: 'none', // Prevent text selection
                    }}
                >
                    <Typography variant="h6" sx={{ userSelect: 'none' }}>{title}</Typography>
                    <Typography variant="body2" sx={{ userSelect: 'none' }}>{gameYear}</Typography>

                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        {/* Like Button */}
                        <IconButton
                            aria-label="add to favorites"
                            sx={{
                                color: isLiked ? '#5fdca8' : 'white',
                                transition: 'color 0.3s ease-in-out',
                                animation: isLiked ? `${likeAnimation} 0.3s ease` : undefined,
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleLikeClick();
                            }}
                        >
                            <FavoriteIcon />
                        </IconButton>

                        {/* More Info Button */}
                        <IconButton
                            aria-label="more info"
                            sx={{ color: 'white' }}
                            onClick={handleMoreInfoClick}
                        >
                            <InfoIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Card>
        </>
    );
};

export default GameCard;