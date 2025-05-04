import { useState, useEffect } from 'react'
import './Playground.css'
import { getLocalStorageItem, setLocalStorageItem } from '../localStorageUtil.js'
import Nav from './Nav.jsx'

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
	const [saved, setSaved] = useState(false)
	useEffect(() => {
		if(!result) {
			const selection = getLocalStorageItem('playground')
			setData(selection)
		} else {
			setData(result)
		}
	}, [])

	useEffect(() => {
		const visitData = getLocalStorageItem('visits')
		if(visitData) {
			setSaved(visitData.visits.indexOf(data.objectid_1) > -1)
		}
	}, [data])


	const saveVisit = () => {
		const savedVisits = getLocalStorageItem('visits') || { visits: []}
		if(!saved) {
			setLocalStorageItem('visits', { visits: [...savedVisits.visits, data.objectid_1]})
		} else {
			// fix toggle
			const newVisits = savedVisits.visits.filter((el) => el.objectid_1 !== data.objectid_1 )
			setLocalStorageItem('visits', { visits: newVisits })
		}
	}

	const hasFeature = (feature) => data[feature] == "1"

	return (
		<div onClick={onClick}>
		<Nav />
		<div className={`playground-page ${getRandomBackground()}`}>
			<div className="card-header">{saved && <span>❤️</span>}</div>
			<img className="img" />
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
					{hasFeature("pool_outdo") && <Feature>outdoor pool</Feature>}
				</div>
				<p>size: {data.acres} acres </p>
				<p><button className="save" onClick={saveVisit}>{saved ? 'Remove from list' : 'Save'}</button></p>
			</div>
		</div>
		</div>
	)
}