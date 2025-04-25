import { useState } from 'react'
import './App.css'
import Title from './ui/Title.jsx'
import Header from './ui/Header.jsx'
import heroPic from './assets/slide.jpg'


function App() {
  const [search, setSearch] = useState('')

  return (
    <>
      <Header />
      <div>
        <img src={heroPic} className="hero" />
      </div>
      <Title titleText="PlayPath" />
      <input className="search-bar" placeholder="search by zipcode" value={search}/>
      <p className="read-the-docs">
        Find, review and plan your next playground adventure.
      </p>
    </>
  )
}

export default App
