import { Container, Typography, Box } from "@mui/material";

const Settings = () => {
    return (
        <div id="main-page">
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', maxWidth: "100%" }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Settings
                    </Typography>
                    {/* Add more profile details here */}
                </Box>
            </Container>
        </div>
    )
}

export default Settings; 