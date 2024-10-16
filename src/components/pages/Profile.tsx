import { Container, Typography, Box } from '@mui/material';
import useStore from '../../createStore';
import GameCardProfile from '../GameCard/ProfileCard';
const Profile = () => {
    const gamesPlayed = useStore((state) => state.gamesPlayed);
    return (
        <div id="main-page">
            <Container maxWidth="lg" sx={{ mb: 4 }}>
                <Box sx={{ textAlign: 'center', maxWidth: "100%" }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{
                        fontWeight: 900,
                        paddingBottom: 1,
                    }}>
                        User
                    </Typography>
                    {gamesPlayed.length > 0 ? (
                        <>
                            <Typography variant="h6" gutterBottom sx={{
                                paddingBottom: 5,

                            }}>
                                These are the games you've played:
                            </Typography>
                            <Box sx={{ 
                                display: 'grid', 
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
                                gap: { xs: 3, sm: 2 } 
                            }}>
                                {gamesPlayed.map((game) => (
                                    <GameCardProfile
                                        key={game.id}
                                        id={game.id}
                                        title={game.name}
                                        description={game.summary}
                                        image={game.cover.url}
                                        date={game.first_release_date}
                                    />
                                ))}
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body1" sx={{ gridColumn: 'span 3' }}>
                            No games played yet.
                        </Typography>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default Profile;