import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";
import Playground from "./Playground.jsx";
import "./PlaygroundList.css";
import { fakeData } from "./fakedata.js";

import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "../localStorageUtil.js";

async function getData(zip) {
  const url = `https://data.cityofchicago.org/resource/ejsh-fztr.json?zip=${zip}`;
  try {
    const response = await fetch(url, { app_token: "", limit: 200 });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export default function PlaygroundList() {
  const [playground, setPlayground] = useState({});
  const [playgrounds, setPlaygrounds] = useState(fakeData);
  const [zip, setZip] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  // 	const searchParams = window.location.search
  // 	const filterZipcode = searchParams.substring(3)

  // 	getData(filterZipcode).then(json => {
  // 		setPlaygrounds(json)
  // 	})
  // }, [])

  const savePlayground = (result) => {
    setLocalStorageItem("playground", result)
    navigate(`/play/${result.objectid_1}`)
  }

  useEffect(() => {
    const savedIdea = getLocalStorageItem("suggestion");
    if (playgrounds && !savedIdea) {
      const playgroundLen = playgrounds.length;
      const index = Math.floor(Math.random() * playgroundLen);
      const playgroundIdea = playgrounds[index];
      setSuggestion(playgroundIdea);
      setLocalStorageItem("suggestion", playgroundIdea);
    } else {
      setSuggestion(savedIdea);
    }
  }, [playgrounds]);

  return (
    <div className="main playground-container">
      <div className="header-container">
        <h1>results ({playgrounds.length})</h1>
        <h2>suggestion of the day</h2>
        {suggestion && <div onClick={() => savePlayground(suggestion)}>{suggestion.label}</div>}
      </div>
      <div className="list">
        {playgrounds.map((result, index) => (
          <Playground
            key={`${result.objectid_1}`}
            result={result}
            onClick={() => savePlayground(result)}
          />
        ))}
      </div>
    </div>
  );
}
