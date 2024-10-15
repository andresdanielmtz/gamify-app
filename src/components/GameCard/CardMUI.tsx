import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/joy/Modal';
import { ModalDialog } from '@mui/joy';
import Fade from '@mui/material/Fade';

interface GameCardProps {
    title: string;
    desc?: string;
    image: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, desc, image }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    maxWidth: 400,
                    m: 2,
                    height: 400,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
            >
                <CardMedia
                    component="img"
                    height="400"
                    image={image}
                    alt={title}
                />
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
                    }}
                >
                    <Typography variant="h6">{title}</Typography>
                    <IconButton
                        aria-label="add to favorites"
                        sx={{ color: 'white', mt: 1 }}
                        onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking the favorite button
                    >
                        <FavoriteIcon />
                    </IconButton>
                </Box>
            </Card>

            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="game-modal-title"
                aria-describedby="game-modal-description"
            >
                <Fade in={isModalOpen}>
                    <ModalDialog>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            fontFamily: 'Inter, sans-serif',
                            borderRadius: '16px', 
                        }}>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseModal}
                                sx={{ position: 'absolute', top: 0, right: 0, color: 'black' }}
                            >
                                <CloseIcon />
                            </IconButton>

                            <Typography id="game-modal-title" variant="h4" gutterBottom component="h2" sx={{ color: "black", alignItems: "center"}}>
                                <b>{title}</b>
                            </Typography>

                            <Box sx={{ my: 2 }}>
                                <img src={image} alt={title} style={{ width: '100%', height: 'auto' }} />
                            </Box>
                            <Typography id="game-modal-description" sx={{ mt: 2, color: "black" }}>
                                {desc || "No description available."}
                            </Typography>
                        </Box>
                    </ModalDialog>
                </Fade>
            </Modal>
        </>
    );
}

export default GameCard;