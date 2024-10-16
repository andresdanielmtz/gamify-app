import { Container, Typography, Box } from '@mui/material';
import useStore from '../../createStore';
import GameCardProfile from '../GameCard/ProfileCard';

const Profile = () => {
    const gamesPlayed = useStore((state) => state.gamesPlayed);

    return (
        <div id="main-page">
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', maxWidth: "100%" }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{
                        paddingBottom: 1,
                    }}>
                        User Profile
                    </Typography>

                    <Typography variant="h6" component="h2" gutterBottom sx={{
                        paddingBottom: 2,
                    }}>
                        Games Played
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                        {gamesPlayed.map((game) => (
                            <GameCardProfile
                                key={game.id}
                                title={game.name}
                                description={game.summary}
                                image={game.cover.url}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Profile;