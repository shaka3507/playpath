import { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import Nav from './Nav.jsx'
import Playground from './Playground.jsx'
import './PlaygroundList.css'
import { fakeData } from './fakedata.js'

import { setLocalStorageItem, getLocalStorageItem } from '../localStorageUtil.js'


async function getData(zip) {
  const url = `https://data.cityofchicago.org/resource/ejsh-fztr.json?zip=${zip}`
  try {
    const response = await fetch(url, { app_token: "", limit: 200 })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
  } catch (error) {
    console.error(error.message)
  }
}




export default function PlaygroundList() {
	const [playground, setPlayground] = useState({})
	const [playgrounds, setPlaygrounds] = useState(fakeData)
	const [filterPlaygrounds, setFilterPlaygrounds] = useState([])
	const [filterResponse, setFilterResponse] = useState(false)
	const [visits, setVisits] = useState([])
	const [zip, setZip] = useState('')
	const navigate = useNavigate()

	// useEffect(() => {
	// 	const searchParams = window.location.search
	// 	const filterZipcode = searchParams.substring(3)

	// 	getData(filterZipcode).then(json => {
	// 		setPlaygrounds(json)
	// 	})
	// }, [])

	const savePlayground = (result) => {
		setLocalStorageItem('playground', result)
		navigate(`/play/${result.objectid_1}`)
	}

	return (
		<div className="list">
		    {playgrounds.map((result, index) => <Playground key={`${result.objectid_1}`} result={result} onClick={() =>  savePlayground(result)} />)}
		</div>
	)

}