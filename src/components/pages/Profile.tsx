import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import useStore from '../../createStore';

const Profile = () => {
    const gamesPlayed = useStore((state) => state.gamesPlayed);

    return (
        <div id="main-page">
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', maxWidth: "100%" }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        User Profile
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Games Played
                    </Typography>
                    <List>
                        {gamesPlayed.map((game) => (
                            <ListItem key={game.id}>
                                <ListItemText primary={game.name} secondary={game.summary} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Container>
        </div>
    );
};

export default Profile;