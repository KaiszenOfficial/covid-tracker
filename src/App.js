import './App.css';
import {
  createTheme,
  Typography,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { Cards, Chart, InputSelector } from './components';
import { useEffect, useState } from 'react';
import { fetchData } from './api';
import covidImage from './images/covid19_logo.png';

const baseTheme = createTheme({
  typography: {
    fontFamily: 'Montserrat'
  }
})

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'dark',
  },
});

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'light',
  },
});

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)')
    ) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, []);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const apiData = await fetchData();
      setData(apiData);
    };

    fetchDataFromApi();
  }, []);

  const handleCountryChange = async (country) => {
    const apiData = await fetchData(country);
    setCountry(country);
    setData(apiData);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <img className="image" src={covidImage} alt="Covid-19" />
          </IconButton>
          <Typography variant="h5">Covid 19 Tracker</Typography>
        </Toolbar>
      </AppBar>
      <div className="container">
        {/* <Typography variant="h5" style={{ marginBottom: '1.5rem' }}>
          Covid 19 Tracker
        </Typography> */}
        <InputSelector
          country={country}
          handleCountryChange={handleCountryChange}
        />
        <Cards data={data} />
        <Chart data={data} country={country} />
      </div>
    </ThemeProvider>
  );
}

export default App;
