import './App.css'
import { Button } from "@mui/material";
import { getGames } from './api/getGames';
import { useEffect } from 'react';
import MenuAppBar from './components/Navbar/Navbar';

function App() {

  useEffect(() => {
    getGames().then((data) => {
      console.log(data);
    }
    )
  }, []);

  return (
    <>
      <MenuAppBar />

      <Button variant="contained" color="primary"> :D </Button>
    </>
  )
}

export default App
