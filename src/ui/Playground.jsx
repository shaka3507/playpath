import { useState, useEffect } from 'react'
import './Playground.css'
import { getLocalStorageItem, setLocalStorageItem } from '../localStorageUtil.js'
import Nav from './Nav.jsx'
import { Link } from 'react-router-dom'
import Weather from './Weather.jsx'
import Features from './Features.jsx'

const NO_IMG_PLACEHOLDER = 'https://playgrounder-images.s3.us-east-2.amazonaws.com/playground_illustration_color.png'

function googleMapLink(address) {
	const formattedAddress = address.replace(' ', '+')
	return `https://www.google.com/maps/place/${formattedAddress}+Chicago+IL`
}

export default function Playground({ result, onClick }) {
	const [data, setData] = useState({ label: 'loading...', location: '...'})
	const [favorite, setFavorite] = useState(false)
	const [isParkPage, setIsParkPage] = useState(false)

	useEffect(() => {
		const playgroundRoute = window.location.href.includes('/play/')
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

	const getSrc = (playgroundName) => {
		const formattedPlaygroundName = playgroundName.toLowerCase().replace(' ', '_')
		return `https://playgrounder-images.s3.us-east-2.amazonaws.com/${formattedPlaygroundName}.jpg`
	}

	const onImgError = (e) => {
		e.currentTarget.oneerror = null
		e.currentTarget.src = NO_IMG_PLACEHOLDER
	}

	return (
		<div className={`playground-page skyblue ${!isParkPage ? 'play-card' : ''}`} onClick={onClick}>
			{isParkPage && <Nav active="play" />}
			{favorite && !isParkPage && <div className="card-header">❤️</div>}
			{isParkPage && <img className="img" src={getSrc(data.label)} onError={onImgError}/>}
			<div className="playground-text">
				<h1 className="plaground-title">{data.label}</h1>
				{favorite && isParkPage && <Link to="/planner">+ to planner 📅</Link>}
				<p>{data.park_class}</p>
				<div id="googleIcon" /><a className="address" target="_blank" href={googleMapLink(data.location)}>{data.location} </a>
				<Features data={data} />
				<p>size: {data.acres} acres </p>
				<p><button className="save" onClick={saveFavorite}>{favorite ? 'Remove from favorites' : 'favorite'}</button></p>
			</div>
			{isParkPage && <div className="weather-container"><Weather /></div>}
		</div>
	)
}