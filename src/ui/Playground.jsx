import { useState, useEffect } from 'react'
import './Playground.css'
import { getLocalStorageItem, setLocalStorageItem } from '../localStorageUtil.js'
import Nav from './Nav.jsx'
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
	useEffect(() => {
		if(!result) {
			const selection = getLocalStorageItem('playground')
			setData(selection)
		} else {
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

	useEffect(() => {
		if(window.location.href.includes('/play/')) {
			setIsParkPage(true)
		}
	}, [])


	const saveFavorite = (e) => {
		e.stopPropagation()
		const { beach, playground, gymnasium, garden, water_play, pool_outdo, label, location } = data
		const playgroundId = data.objectid_1.toString()
		const favoriteData = getLocalStorageItem('favorites') || []
		let newData = [...favoriteData]
		if(!favorite) {
			console.log("add")
			newData.push({ label, location, playgroundId, beach, playground, gymnasium, garden, water_play, pool_outdo })
			setFavorite(true)
		} else {
			console.log("remove")
			newData = favoriteData.filter((playground) => playground.playgroundId !== playgroundId)
			setFavorite(false)
		}
		setLocalStorageItem('favorites', newData)
	}

	const hasFeature = (feature) => data[feature] == "1"

	return (
		<div onClick={onClick}>
		<Nav />
		<div className={`playground-page ${getRandomBackground()}`}>
			<div className="card-header">{favorite && <span>❤️</span>}</div>
			<img className="img" />
			{isParkPage && <div className="weather-container"><Weather /></div>}
			<div className="playground-text">
				<h1 className="">{data.label}</h1>
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
		</div>
		</div>
	)
}