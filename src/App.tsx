import "./App.css";
import axios from "axios";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import MenuAppBar from "./components/Navbar/Navbar";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Info from "./components/pages/Info";
import Main from "./components/pages/Main";
import { ThemeProvider } from "@emotion/react";
import theme from "./themes";
import GameDetails from "./components/GameCard/GameDetails";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_ENDPOINT;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return (
    <ThemeProvider theme={theme}>
      <div id="main-page">
        <div id="nav">
          <MenuAppBar />
        </div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path = "/info" element = {<Info />} />
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
