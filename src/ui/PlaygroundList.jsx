import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Nav from "./Nav.jsx"
import Playground from "./Playground.jsx"
import { Search } from '../App.jsx'
import usePlayground from './usePlayground'

// import { fakeData } from "./fakedata.js" for debugging purposes

import {
  setLocalStorageItem,
  getLocalStorageItem,
  deleteLocalStorageItem,
} from "../localStorageUtil.js"


export default function PlaygroundList() {
  const [suggestion, setSuggestion] = useState(null)
  const [newZip, setNewZip] = useState('')
  const { playgroundData, error, loading, zip } = usePlayground()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const savePlayground = (result) => {
    setLocalStorageItem("playground", result)
    navigate(`/play/${result.objectid_1}`)
  }

  useEffect(() => {
    const savedIdea = getLocalStorageItem("suggestion") || false
    if (!loading && !savedIdea) {
      const playgroundLen = playgroundData.length
      const index = Math.floor(Math.random() * playgroundLen)
      const playgroundIdea = playgroundData[index]
      setSuggestion(playgroundIdea)
      setLocalStorageItem("suggestion", playgroundIdea)
    } else {
      setSuggestion(savedIdea)
    }
  }, [zip, loading])

  const handleInputChange = (e) => {
    setNewZip(e.target.value)
  }

  const handleSubmit = (e) => {
    // if user hits enter - submit new request
    if(e.key === 'Enter') {
      setSearchParams({ q: newZip })
      // clear out suggestion
      deleteLocalStorageItem('suggestion')
    }
  }

  const playgroundContent = (
    <>
      <div className="header-container">
        <h1>results ({playgroundData?.length}) for {zip}</h1>
        <h2>suggestion of the day</h2>
        {suggestion && <div onClick={() => savePlayground(suggestion)}>{suggestion.label}</div>}
      </div>
      <div className="input-container">
          <h3>New Search?</h3>
          <input onChange={handleInputChange} onKeyDown={handleSubmit} placeholder="Try 60619" />
      </div>
      <div className="list">
        {playgroundData?.map((playground, index) => (
          <Playground
            key={`${playground.objectid_1}`}
            result={playground}
            onClick={() => savePlayground(playground)}
          />
        ))}
        {(!playgroundData?.length && !loading) && 
          <div className="empty-results-container">
            <h3>No results for zipcode "{zip}"</h3> 
          </div>
        }
      </div>
    </>

  )

  const loadContainer = (
    <div> Loading ...</div>
  )

  return (
    <>
      <Nav active="play" />
      <div className="main playground-container">
        {error && <div> error retrieving data :( </div>}
        {!loading ? playgroundContent : loadContainer}
      </div>
    </>
  )
}
