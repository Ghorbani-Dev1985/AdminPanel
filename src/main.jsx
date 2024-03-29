import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/Style/index.css";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";


const CustomTheme = createTheme({
  palette: {
    primary: {
      main: '#5b21b6'
    },
    secondary: {
      main: '#f97316'
    },
  },
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Dana',
      'Tahoma'
    ].join(','),
    letterSpacing: 'normal',
    fontSize : 16,
    htmlFontSize: 16,
  },
  shape: {
    borderRadius: 8,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={CustomTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StyledEngineProvider>
);
