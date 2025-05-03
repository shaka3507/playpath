import { useState, useEffect } from 'react'
import './Playground.css'
import { getLocalStorageItem } from '../localStorageUtil.js'

export default function Playground({ result }) {
	const [data, setData] = useState({ label: 'loading...', location: '...'})
	useEffect(() => {
		console.log("result", result)
		if(!result) {
			console.log("getting here")
			const selection = getLocalStorageItem('playground')
			setData(selection)
		} else {
			setData(result)
		}
	}, [])

	return (
		<div className="playground-page">
			<img className="img" />
			<div className="playground-text">
				<h1 className="">{data.label}</h1>	
				<p className="">{data.location}</p>
				<p className>Favorite </p>
				<p className>Just visited</p>
			</div>
		</div>
	)
}