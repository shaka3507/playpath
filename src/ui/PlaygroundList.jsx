import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";
import Playground from "./Playground.jsx";
import "./PlaygroundList.css";
import { fakeData } from "./fakedata.js";
import { Search } from '../App.jsx'
import usePlayground from './usePlayground'

import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "../localStorageUtil.js";


export default function PlaygroundList() {
  const [zip, setZip] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const navigate = useNavigate();
  const { playgroundData, error, loading } = usePlayground()

  const savePlayground = (result) => {
    setLocalStorageItem("playground", result)
    navigate(`/play/${result.objectid_1}`)
  }

  function handleInputChange(e) {
    setZip(e.target.value)
  }

  useEffect(() => {
    const savedIdea = getLocalStorageItem("suggestion")
    if (playgroundData && !savedIdea) {
      const playgroundLen = playgroundData.length
      const index = Math.floor(Math.random() * playgroundLen)
      const playgroundIdea = playgroundData[index]
      setSuggestion(playgroundIdea);
      setLocalStorageItem("suggestion", playgroundIdea)
    } else {
      setSuggestion(savedIdea);
    }
  }, []);

  const playgroundContent = (
    <>
      <div className="header-container">
        <h1>results ({playgroundData?.length})</h1>
        <h2>suggestion of the day</h2>
        {suggestion && <div onClick={() => savePlayground(suggestion)}>{suggestion.label}</div>}
      </div>
      <div className="list">
        {playgroundData?.map((result, index) => (
          <Playground
            key={`${result.objectid_1}`}
            result={result}
            onClick={() => savePlayground(result)}
          />
        ))}
      </div>
    </>

  )

  const loadContainer = (
    <div> Loading ...</div>
  )

  return (
    <div className="main playground-container">
      {error && <div> error retrieving data :( </div>}
      {!loading ? playgroundContent : loadContainer}
    </div>
  );
}
