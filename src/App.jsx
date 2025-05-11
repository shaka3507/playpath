import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PlaygroundList from "./ui/PlaygroundList.jsx";
import heroPic from "./assets/slide.jpg";
import Playground from "./ui/Playground";
import About from "./ui/About";
import Nav from "./ui/Nav.jsx";
import Planner from "./ui/Planner.jsx";

import "./App.css";

export function Search({
  handleSubmit,
  handleInputChange,
  search,
  placeholder = "Search by Chicago City Zipcode",
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

function Home() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [data, setData] = useState([])
  let navigate = useNavigate()

  function handleInputChange(e) {
    setSearch(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("loaded")
    navigate(`/play?q=${search}`)
  }

  return (
    <div className="main">
      <Nav active="home" />
      <div className="landing">
        <h1 className="title">Playgrounder</h1>
        <Search
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          search={search}
        />
        <p>Not from Chicago? <em>Try 60607 (the loop), 60619 (south side), or 60612 (north side)</em></p>
      </div>
    </div>
  )
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
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
