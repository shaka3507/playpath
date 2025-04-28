import { useState } from 'react'
import './App.css'
import Title from './ui/Title.jsx'
import Loader from './ui/Loader.jsx'
import PlaygroundList from './ui/PlaygroundList.jsx'
import heroPic from './assets/slide.jpg'

const fakeData = [
        {
          'name': 'Arthur Ashe Park',
          'address': '2701 E. 74th St. Chicago, IL 60649',
          'img_url': 'https://assets.chicagoparkdistrict.com/s3fs-public/styles/558x314/public/images/locations/0ea5ecd5bd0c459c810486b8d0cad24e1.JPG?itok=SaaAP3oQ',
          'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view']

        },
        {
          'name': 'Bartelme Park',
          'address': '115 S. Sangamon St Chicago, IL 60602',
          'img_url': 'https://chicagoplaygrounds.com/files/original/466f0a6feb3080f099f2c4d59cf4ffa613be1ef1.jpg',
          'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view', 'dog-friendly']

        },
        {
          'name': 'Arthur Ashe Park',
          'address': '2701 E. 74th St. Chicago, IL 60649',
          'img_url': 'https://assets.chicagoparkdistrict.com/s3fs-public/styles/558x314/public/images/locations/0ea5ecd5bd0c459c810486b8d0cad24e1.JPG?itok=SaaAP3oQ',
          'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view']

        },
        {
          'name': 'Bartelme Park',
          'address': '115 S. Sangamon St Chicago, IL 60602',
          'img_url': 'https://chicagoplaygrounds.com/files/original/466f0a6feb3080f099f2c4d59cf4ffa613be1ef1.jpg',
          'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view', 'dog-friendly']

        },
        {
          'name': 'Arthur Ashe Park',
          'address': '2701 E. 74th St. Chicago, IL 60649',
          'img_url': 'https://assets.chicagoparkdistrict.com/s3fs-public/styles/558x314/public/images/locations/0ea5ecd5bd0c459c810486b8d0cad24e1.JPG?itok=SaaAP3oQ',
          'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view']

        },
        {
          'name': 'Bartelme Park',
          'address': '115 S. Sangamon St Chicago, IL 60602',
          'img_url': 'https://chicagoplaygrounds.com/files/original/466f0a6feb3080f099f2c4d59cf4ffa613be1ef1.jpg',
          'tags': ['toddler-friendly', 'ada accessible', 'cta accessible', 'lake-view', 'dog-friendly']

        }
]


function App() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [data, setData] = useState([])

  function handleInputChange(e) {
    setSearch(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loaded')

    try {
      console.log('searching...', search)
      setData(fakeData)
    } catch (e) {
      setStatus('try again..')
    }
  }

  return (
    <>
      <div className="header">
        PlayPath       {!!data.length && <button className="reset" onClick={() => setData([])}> Reset Search </button>}
      </div>
      {!data.length && <div className="main">
      <div>
        <img src={heroPic} className="hero" />
      </div>
      <Title titleText="PlayPath" />
      <form onSubmit={handleSubmit}>
      <input className="search-bar" onChange={handleInputChange} placeholder="search by zipcode" value={search}/>
      </form>
      </div>}
      {status === 'loading' ? <Loader /> : <PlaygroundList results={data} />}
    </>
  )
}

export default App
