import { useState, useEffect } from 'react'
import './Playground.css'
import { getLocalStorageItem, setLocalStorageItem } from '../localStorageUtil.js'

function Feature({ children }) {
	return (<div className="pill">{children}</div>)
}

export default function Playground({ result }) {
	const [data, setData] = useState({ label: 'loading...', location: '...'})
	const [saved, setSaved] = useState(false)
	useEffect(() => {
		console.log("result", result, saved)
		if(!result) {
			console.log("getting here")
			const selection = getLocalStorageItem('playground')
			setData(selection)
		} else {
			setData(result)
		}
	}, [])

	useEffect(() => {
		const visitData = getLocalStorageItem('visits') || []
		setSaved(visitData.visits.indexOf(data.objectid_1) > -1)
	}, [data])


	const saveVisit = () => {
		const savedVisits = getLocalStorageItem('visits') || { visits: []}

		setLocalStorageItem('visits', { visits: [...savedVisits.visits, data.objectid_1]})
	}

	const hasFeature = (feature) => data[feature] == "1"

	return (
		<div className="playground-page">
			<div className="card-header">{saved && <span>❤️</span>}</div>
			<img className="img" />
			<div className="playground-text">
				<h1 className="">{data.label}</h1>
				<p>{data.park_class}</p>
				<p className="">{data.location}</p>
				<div className="features">
					{hasFeature("beach") && <Feature>&#127958;</Feature>}
					{hasFeature("playground") && <Feature>🛝</Feature>}
					{hasFeature("gymnasium") && <Feature>🏀</Feature>}
					{hasFeature("garden") && <Feature>🪴</Feature>}
					{hasFeature("water_play") && <Feature>⛲</Feature>}
					{hasFeature("pool_outdo") && <Feature>🏊</Feature>}
				</div>
				<p>size: {data.acres} acres </p>
				<p><button className="save" onClick={saveVisit}>Save</button></p>
			</div>
		</div>
	)
}