import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Title from "./ui/Title.jsx";
import Loader from "./ui/Loader.jsx";
import PlaygroundList from "./ui/PlaygroundList.jsx";
import heroPic from "./assets/slide.jpg";
import Playground from "./ui/Playground";
import About from "./ui/About";
import Nav from "./ui/Nav.jsx";

const OPEN_MATEO_CHICAGO_WEATHER_API =
  "https://api.open-meteo.com/v1/forecast?latitude=41.85&longitude=-87.65&hourly=temperature_2m,rain,showers,snow_depth,snowfall&current=temperature_2m&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit";

export function Search({
  handleSubmit,
  handleInputChange,
  search,
  placeholder = "search by zipcode",
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search-bar"
        onChange={handleInputChange}
        placeholder={placeholder}
        value={search}
      />
    </form>
  );
}

async function getWeather() {
  try {
    const response = await fetch(OPEN_MATEO_CHICAGO_WEATHER_API);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

function Weather() {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    getWeather().then((resp) => {
      console.log("resp", resp);
      setTemp(resp.current.temperature_2m);
    });
  }, []);
  return (
    <div className="weather-widget">
      <h3>weather</h3>
      <p>{temp}°F</p>
    </div>
  );
}

function Home() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loaded");

    if (window.location.href.includes("/play")) {
      console.log("re fetch data");
    } else {
      navigate(`/play?q=${search}`);
    }
  }

  return (
    <div className="main">
      <Nav />
      <Weather />
      <div className="landing">
        <Title titleText="Playgrounder" />
        <Search
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          search={search}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<PlaygroundList />} />
          <Route path="/play/:playgroundId" element={<Playground />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
