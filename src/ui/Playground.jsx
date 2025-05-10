import { useState, useEffect } from 'react'
import './Playground.css'
import { getLocalStorageItem, setLocalStorageItem } from '../localStorageUtil.js'
import Nav from './Nav.jsx'
import { Link } from 'react-router-dom'
import Weather from './Weather.jsx'

function Feature({ children }) {
	return (<div className="pill">{children}</div>)
}

function getRandomBackground() {
	if(window.location.href.includes('/play/')) return
	const backgroundColor = ['brightred', 'skyblue', 'jeanblue', 'olivegreen', 'brownred', 'brightred', 'skyblue', 'jeanblue', 'olivegreen', 'brownred']
	const index =  Math.floor(Math.random() * 9)
	return backgroundColor[index]
}

function googleMapLink(address) {
	const str = address.replace(' ', '+')
	return `https://www.google.com/maps/place/${str}+Chicago+IL`
}

export default function Playground({ result, onClick }) {
	const [data, setData] = useState({ label: 'loading...', location: '...'})
	const [favorite, setFavorite] = useState(false)
	const [isParkPage, setIsParkPage] = useState(false)

	const playgroundRoute = window.location.href.includes('/play/')

	useEffect(() => {
		if(playgroundRoute) {
			setIsParkPage(true)
			const selection = getLocalStorageItem('playground')
			setData(selection)
		} else {
			// else use prop
			setData(result)
		}
	}, [])

	const hasId = (arr, id) => {
		return arr.some(play => play.playgroundId == id)
	}

	useEffect(() => {
		console.log('pl', window.location.href)
		const favoriteData = getLocalStorageItem('favorites') || []
		if(favoriteData.length) {
			const isFavorite = hasId(favoriteData, data.objectid_1)
			setFavorite(isFavorite)
		}
	}, [data])


	const saveFavorite = (e) => {
		e.stopPropagation()
		const { beach, playground, gymnasium, garden, water_play, pool_outdo, label, location } = data
		const playgroundId = data.objectid_1.toString()
		const favoriteData = getLocalStorageItem('favorites') || []
		let newData = [...favoriteData]
		if(!favorite) {
			newData.push({ label, location, playgroundId, beach, playground, gymnasium, garden, water_play, pool_outdo })
			setFavorite(true)
		} else {
			newData = favoriteData.filter((playground) => playground.playgroundId !== playgroundId)
			setFavorite(false)
		}
		setLocalStorageItem('favorites', newData)
	}

	const hasFeature = (feature) => data[feature] == "1"

	return (
		<div onClick={onClick}>
			<Nav active="play" />
			<div className={`playground-page ${getRandomBackground()}`}>
				{favorite && !isParkPage && <div className="card-header">❤️</div>}
				<img className="img" />
				<div className="playground-text">
					<h1 className="plaground-title">{data.label}</h1>
					{favorite && isParkPage && <Link to="/planner">+ to planner 📅</Link>}
					<p>{data.park_class}</p>
					<a className="address" target="_blank" href={googleMapLink(data.location)}>{data.location}</a>
					<div className="features">
						{hasFeature("beach") && <Feature>beach</Feature>}
						{hasFeature("playground") && <Feature>playground</Feature>}
						{hasFeature("gymnasium") && <Feature>gym</Feature>}
						{hasFeature("garden") && <Feature>garden</Feature>}
						{hasFeature("water_play") && <Feature>water play</Feature>}
						{hasFeature("pool_outdo") && <Feature>pool</Feature>}
					</div>
					<p>size: {data.acres} acres </p>
					<p><button className="save" onClick={saveFavorite}>{favorite ? 'Remove from favorites' : 'favorite'}</button></p>
				</div>
				{isParkPage && <div className="weather-container"><Weather /></div>}
			</div>
		</div>
	)
}