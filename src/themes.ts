import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
    palette: {
        mode: "dark", 
        primary: {
            main: "#5fdca8",
            contrastText: "#fff"
        },
        secondary: {
            contrastText: "#fff",
            main: "#fff"
        },
    }
  });

theme = responsiveFontSizes(theme);
export default theme; 

