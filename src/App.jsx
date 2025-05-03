import { useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Title from './ui/Title.jsx'
import Loader from './ui/Loader.jsx'
import PlaygroundList from './ui/PlaygroundList.jsx'
import heroPic from './assets/slide.jpg'
import Playground from './ui/Playground'
import About from './ui/About'
import SavedPlaygroundList from './ui/SavedPlaygroundList.jsx';
import Nav from './ui/Nav.jsx'

function Home() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [data, setData] = useState([])
  let navigate = useNavigate()

  function handleInputChange(e) {
    setSearch(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loaded')

    navigate(`/play?q=${search}`)
  }

  return (
    <div className="main">
      <Nav />
      {!data.length && <div className="landing">
      <Title titleText="Playgrounder" />
      <form onSubmit={handleSubmit}>
      <input className="search-bar" onChange={handleInputChange} placeholder="search by zipcode" value={search}/>
      </form>
      </div>}
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
                <Route path="/favorite" element={<SavedPlaygroundList />} />
              </Routes>

            </div>
       </Router>
       
  )
}



export default App
