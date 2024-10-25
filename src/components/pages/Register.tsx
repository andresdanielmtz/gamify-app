import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerAuth } from "../../api/auth";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerAuth(username, password).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Box
          sx={{
            marginBottom: 1,
          }}
        >
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                color: "white",
              },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                color: "white",
              },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
}
