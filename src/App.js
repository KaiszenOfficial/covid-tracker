import "./App.css";
import { Typography } from "@material-ui/core";
import { Cards, Chart, InputSelector } from "./components";
import { useEffect, useState } from "react";
import { fetchData } from "./api";
import covidImage from "./images/covid19_logo.png";

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const apiData = await fetchData();
      setData(apiData)
    }

    fetchDataFromApi();
  }, []);

  const handleCountryChange = async (country) => {
    const apiData = await fetchData(country);
    setCountry(country);
    setData(apiData);
  }

  return (
    <div className="container">
      <img className="image" src={covidImage} alt="Covid-19" />
      <Typography variant="h5" style={{ marginBottom: "1.5rem" }}>Covid 19 Tracker</Typography>
      <InputSelector country={country} handleCountryChange={handleCountryChange} />
      <Cards data={data} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
