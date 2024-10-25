import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post<{
        message: string;
        user: {
          id: number;
          username: string;
        };
      }>(
        "/auth/login",
        { username, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </Button>
      </Box>
    </Container>
  );
}
