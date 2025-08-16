

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import WeatherContainer from "./containers/WeatherContainer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
    background: { default: "#181c24", paper: "#23283a" },
    text: { primary: "#f3f6fa", secondary: "#b0b8c1" },
  },
  typography: {
    fontFamily: ["Roboto", "Segoe UI", "Arial", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <WeatherContainer />
    </ThemeProvider>
  );
}

export default App;
